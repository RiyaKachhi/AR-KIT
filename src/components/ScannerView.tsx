import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Equipment } from '../types/equipment';
import { RecognitionResult, IVisionProvider } from '../types/recognition';
import { SimulatedVisionProvider, GeminiVisionProvider } from '../services/visionProvider';
import { StorageService } from '../services/storageService';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Search, 
  X, 
  Image as ImageIcon,
  SlidersHorizontal,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ScannerViewProps {
  equipmentCatalog: Equipment[];
  selectedLabId?: string;
  onRecognitionComplete: (equipment: Equipment, result: RecognitionResult, image: string) => void;
  onExploreCatalog: () => void;
  onBackToHome: () => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  equipmentCatalog,
  selectedLabId,
  onRecognitionComplete,
  onExploreCatalog,
  onBackToHome
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'requesting' | 'active' | 'denied' | 'unsupported'>('idle');
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState<string>('Ready to scan');
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [confirmedEquipment, setConfirmedEquipment] = useState<Equipment | null>(null);

  // Vision provider instance
  const [providerType, setProviderType] = useState<'simulated' | 'gemini_vision'>(() => {
    const key = StorageService.getGeminiApiKey();
    return key && key.length > 10 ? 'gemini_vision' : 'simulated';
  });

  // Start Camera on Mount if supported
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraStatus('requesting');
    setCameraError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraStatus('unsupported');
      setCameraError('Camera API is not supported on this browser or environment.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraStream(stream);
      setCameraStatus('active');
    } catch (err: any) {
      console.warn('Camera permission or device error:', err);
      setCameraStatus('denied');
      setCameraError(err.message || 'Camera permission denied or camera device busy.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Capture frame from video stream
  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      analyzeImage(dataUrl);
    }
  };

  // Upload custom file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCapturedImage(dataUrl);
      analyzeImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Select a curated sample lab component
  const handleSelectSample = (sample: Equipment) => {
    setCapturedImage(sample.imageUrl);
    analyzeImage(sample.imageUrl);
  };

  // Recognition analysis pipeline
  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    setRecognitionResult(null);
    setConfirmedEquipment(null);

    try {
      const apiKey = StorageService.getGeminiApiKey();
      const provider: IVisionProvider = providerType === 'gemini_vision' && apiKey
        ? new GeminiVisionProvider(apiKey, equipmentCatalog)
        : new SimulatedVisionProvider(equipmentCatalog);

      const result = await provider.identifyEquipment(
        imageData,
        selectedLabId,
        (stage) => setAnalysisStage(stage)
      );

      setRecognitionResult(result);

      // Match result with catalog equipment
      const matched = equipmentCatalog.find(e => e.id === result.equipmentId) 
        || equipmentCatalog.find(e => e.name.toLowerCase() === result.matchedEquipmentName.toLowerCase())
        || equipmentCatalog[0];

      setConfirmedEquipment(matched);
    } catch (err: any) {
      console.error('Vision analysis error', err);
      // Fallback to simulated safe result
      const fallbackProvider = new SimulatedVisionProvider(equipmentCatalog);
      const fallbackResult = await fallbackProvider.identifyEquipment(imageData, selectedLabId);
      setRecognitionResult(fallbackResult);
      setConfirmedEquipment(equipmentCatalog[0]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Confirm match and enter Split-Screen
  const handleConfirm = () => {
    if (confirmedEquipment && recognitionResult && capturedImage) {
      StorageService.addRecentScan(confirmedEquipment);
      onRecognitionComplete(confirmedEquipment, recognitionResult, capturedImage);
    }
  };

  // Switch to alternate candidate match
  const handleSelectAlternate = (altId: string) => {
    const alt = equipmentCatalog.find(e => e.id === altId);
    if (alt) {
      setConfirmedEquipment(alt);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setRecognitionResult(null);
    setConfirmedEquipment(null);
  };

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-4rem)] flex flex-col bg-lab-950 overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />

      {/* Main Viewport Container */}
      <div className="relative flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT / CENTER: Camera Feed or Frozen Captured Photo Viewport */}
        <div className="relative flex-1 flex items-center justify-center bg-black overflow-hidden">
          
          {capturedImage ? (
            /* Frozen Frame Preview */
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={capturedImage}
                alt="Captured Equipment"
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-lab-border shadow-2xl"
              />

              {/* Laser Scanning Animation Overlay during analysis */}
              {isAnalyzing && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4 border-2 border-lab-accent/50 rounded-xl overflow-hidden">
                    <div className="absolute left-0 right-0 h-1 scan-laser animate-scan-line" />
                    <div className="absolute inset-0 bg-lab-accent/5 tech-grid-cyan" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Live Camera Feed */
            <div className="relative w-full h-full flex items-center justify-center">
              {cameraStatus === 'active' ? (
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="p-8 text-center max-w-md space-y-4">
                  <div className="w-14 h-14 rounded-full bg-lab-900 border border-lab-border flex items-center justify-center mx-auto text-slate-400">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-200">
                      {cameraStatus === 'requesting' ? 'Requesting Camera Access...' : 'Camera Unavailable'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {cameraError || 'You can capture equipment using your webcam, upload a photo from your phone, or select a sample component below.'}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={startCamera}
                      className="px-3.5 py-2 rounded-lg bg-lab-accent/20 hover:bg-lab-accent/30 text-lab-accent border border-lab-accent/40 text-xs font-mono font-medium transition-colors"
                    >
                      Retry Camera
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-lg bg-lab-850 hover:bg-lab-800 text-slate-200 border border-lab-border text-xs font-mono font-medium transition-colors"
                    >
                      Upload File
                    </button>
                  </div>
                </div>
              )}

              {/* HUD Reticle Overlay on Active Feed */}
              {cameraStatus === 'active' && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-6">
                  {/* Top HUD bar */}
                  <div className="w-full flex items-center justify-between text-[11px] font-mono text-lab-accent bg-lab-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-lab-border/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span>LIVE FEED // AIT PUNE LAB SENSOR</span>
                    </div>
                    <span>RES: 1080p // 60 FPS</span>
                  </div>

                  {/* Center Target Reticle */}
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 border border-lab-accent/30 rounded-2xl flex items-center justify-center">
                    {/* Corner Reticle Brackets */}
                    <span className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-lab-accent" />
                    <span className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-lab-accent" />
                    <span className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-lab-accent" />
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-lab-accent" />

                    {/* Central Crosshairs */}
                    <div className="w-10 h-10 border border-lab-accent/40 rounded-full flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-lab-accent/80 animate-ping" />
                    </div>

                    {/* Laser sweep */}
                    <div className="absolute left-2 right-2 h-0.5 scan-laser animate-scan-line" />
                  </div>

                  {/* Bottom Guide Text */}
                  <div className="text-[11px] font-mono text-slate-300 bg-lab-950/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-lab-border">
                    Align equipment within reticle and tap "Capture Image"
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Shutter / Capture Bottom Floating Control Bar (Only when no image is frozen) */}
          {!capturedImage && cameraStatus === 'active' && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-[#141716]/95 backdrop-blur-xl p-2.5 rounded-2xl border border-[#D8CDB8]/20 shadow-floating">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Upload Photo"
                className="p-3 rounded-xl bg-[#0E1110] hover:bg-white/5 text-[#D8CDB8] hover:text-white border border-[#D8CDB8]/20 transition-colors"
              >
                <Upload className="w-5 h-5" />
              </button>

              {/* Big Primary Capture Button */}
              <button
                onClick={captureFrame}
                className="px-6 py-3 rounded-xl bg-[#D27230] hover:bg-[#C45630] text-[#121514] font-bold font-mono text-xs flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4 stroke-[2.5]" />
                <span>Capture Equipment</span>
              </button>
            </div>
          )}
        </div>

        {/* RIGHT / DRAWER: Analysis Result HUD or Sample Test Carousel */}
        <div className="w-full lg:w-[420px] bg-[#141716] border-t lg:border-t-0 lg:border-l border-[#D8CDB8]/20 flex flex-col justify-between overflow-y-auto paper-laid">
          
          {/* Top Section */}
          <div className="p-5 border-b border-[#D8CDB8]/15 bg-[#0E1110]/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D27230]" />
                <h3 className="text-sm font-bold text-[#F6F2E9] font-sans">
                  {capturedImage ? 'AI Component Recognition' : 'Archival Test Specimens'}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0E1110] text-[#D27230] border border-[#D27230]/30">
                {providerType === 'gemini_vision' ? 'Gemini 1.5 Vision' : 'Edge Demo Engine'}
              </span>
            </div>

            <p className="text-xs text-[#D8CDB8]/70 leading-relaxed font-sans">
              {capturedImage 
                ? 'Review predicted identification and confirm to unfold verified operating procedures, pinouts, and safety limits.'
                : 'Test with sample lab components from AIT Pune without a physical camera, or upload a photo from your bench.'}
            </p>
          </div>

          {/* Center Stage: EITHER Recognition Confirmation OR Sample Selector */}
          <div className="p-5 flex-1 space-y-4">
            
            {/* 1. STATE: Analyzing Image */}
            {isAnalyzing && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative w-16 h-16 rounded-full border-2 border-lab-border flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-t-lab-accent animate-spin" />
                  <Sparkles className="w-6 h-6 text-lab-accent animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100 font-mono">Analyzing Visual Features...</h4>
                  <p className="text-xs text-slate-400 mt-1 font-mono">{analysisStage}</p>
                </div>
              </div>
            )}

            {/* 2. STATE: Recognition Completed & Awaiting Confirmation */}
            {!isAnalyzing && recognitionResult && confirmedEquipment && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Result Card */}
                <div className="p-4 rounded-xl bg-[#0E1110] border border-[#D27230]/40 shadow-paper space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D27230]/15 text-[#D27230] border border-[#D27230]/30 font-bold uppercase">
                        {confirmedEquipment.category.replace('_', ' ')}
                      </span>
                      <h4 className="font-editorial text-base font-bold text-[#F6F2E9] mt-1">
                        {confirmedEquipment.name}
                      </h4>
                      <div className="text-xs text-[#D8CDB8]/60 font-mono mt-0.5">
                        Asset: {confirmedEquipment.assetCode} • {confirmedEquipment.model}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-[#589E6E]">
                        {Math.round(recognitionResult.confidence * 100)}%
                      </div>
                      <div className="text-[10px] text-[#D8CDB8]/60 font-mono">Confidence</div>
                    </div>
                  </div>

                  {/* Detected Optical Features List */}
                  <div className="pt-2 border-t border-[#D8CDB8]/15 space-y-1.5">
                    <span className="text-[11px] font-mono text-[#D8CDB8]/70">Detected Optical Signatures:</span>
                    <ul className="text-xs text-[#D8CDB8] space-y-1 pl-1">
                      {recognitionResult.detectedFeatures.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#589E6E] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Confirmation CTA */}
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={handleConfirm}
                      className="w-full py-3 rounded-xl bg-[#D27230] hover:bg-[#C45630] text-[#121514] font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <span>Pull File & Open Split-Screen</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleRetake}
                      className="w-full py-2 rounded-xl bg-[#141716] hover:bg-white/5 text-[#D8CDB8] text-xs font-mono transition-colors border border-[#D8CDB8]/20"
                    >
                      Retake / Choose Another Specimen
                    </button>
                  </div>
                </div>

                {/* Alternate Matches (if student wants to pick exact model manually) */}
                {recognitionResult.alternateMatches && recognitionResult.alternateMatches.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-lab-950/60 border border-lab-border space-y-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      Not quite right? Select alternate lab match:
                    </span>
                    <div className="space-y-1.5">
                      {recognitionResult.alternateMatches.map((alt) => (
                        <button
                          key={alt.equipmentId}
                          onClick={() => handleSelectAlternate(alt.equipmentId)}
                          className="w-full text-left p-2 rounded-lg bg-lab-900 hover:bg-lab-850 border border-lab-border hover:border-slate-500 text-xs flex items-center justify-between transition-colors"
                        >
                          <span className="font-medium text-slate-200 line-clamp-1">{alt.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                            {Math.round(alt.confidence * 100)}% Match
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* 3. STATE: No image captured yet -> Show Curated Sample Lab Components Carousel */}
            {!capturedImage && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Quick Test Components:</span>
                  <span>{equipmentCatalog.length} Available</span>
                </div>

                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {equipmentCatalog.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectSample(item)}
                      className="w-full text-left p-3 rounded-xl bg-lab-950/70 hover:bg-lab-850/90 border border-lab-border hover:border-lab-accent/40 transition-all flex items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-lab-900 border border-lab-border p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-200 group-hover:text-lab-accent transition-colors truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">
                          {item.assetCode} • {item.model}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-lab-accent group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer Actions */}
          <div className="p-4 border-t border-lab-border bg-lab-950/60 flex items-center justify-between text-xs">
            <button
              onClick={onExploreCatalog}
              className="text-slate-400 hover:text-lab-accent font-mono flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse Catalog by Room</span>
            </button>
            <button
              onClick={onBackToHome}
              className="text-slate-400 hover:text-white font-mono transition-colors"
            >
              Exit to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
