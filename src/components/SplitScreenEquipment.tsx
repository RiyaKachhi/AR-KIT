import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Equipment, InfoPanelSection, InspectionHotspot } from '../types/equipment';
import { RecognitionResult } from '../types/recognition';
import { ParabolicInfoPanel } from './ParabolicInfoPanel';
import { StorageService } from '../services/storageService';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Bookmark, 
  BookmarkCheck, 
  ShieldCheck, 
  AlertCircle, 
  ArrowLeft, 
  Crosshair, 
  Eye, 
  Layers, 
  Share2, 
  Check, 
  Flag,
  Sparkles,
  Info
} from 'lucide-react';

interface SplitScreenEquipmentProps {
  equipment: Equipment;
  recognitionResult?: RecognitionResult | null;
  capturedImage?: string | null;
  onBack: () => void;
  onSelectRelatedEquipment?: (equipmentId: string) => void;
  onReportIssue?: (equipment: Equipment) => void;
}

export const SplitScreenEquipment: React.FC<SplitScreenEquipmentProps> = ({
  equipment,
  recognitionResult,
  capturedImage,
  onBack,
  onSelectRelatedEquipment,
  onReportIssue
}) => {
  const [activeSection, setActiveSection] = useState<InfoPanelSection | 'ai_assistant' | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showBoundingBox, setShowBoundingBox] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<InspectionHotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const profile = StorageService.getUserProfile();
    return profile.bookmarkedIds.includes(equipment.id);
  });
  const [copiedLink, setCopiedLink] = useState(false);

  // Use captured photo if provided; otherwise use crisp high-res SVG reference image
  const displayImage = capturedImage || equipment.imageUrl;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const toggleBookmark = () => {
    const nextState = StorageService.toggleBookmark(equipment.id);
    setIsBookmarked(nextState);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const boundingBox = recognitionResult?.boundingBox || {
    x: 10,
    y: 12,
    width: 80,
    height: 76
  };

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-4rem)] flex flex-col bg-lab-950 overflow-hidden">
      {/* Top Breadcrumb Bar */}
      <div className="h-12 px-6 border-b border-lab-border bg-lab-900/60 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-lab-accent transition-colors px-2 py-1 rounded bg-lab-850 border border-lab-border"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Scanner</span>
          </button>
          <div className="h-4 w-px bg-lab-border" />
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">AIT Pune / E&TC</span>
            <span className="text-slate-600">/</span>
            <span className="font-semibold text-slate-200 font-mono">{equipment.assetCode}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Recognition Confidence Pill */}
          {recognitionResult && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lab-accent/10 border border-lab-accent/30 text-[11px] font-mono text-lab-accent">
              <Sparkles className="w-3 h-3" />
              <span>Match: {Math.round(recognitionResult.confidence * 100)}% ({recognitionResult.provider === 'simulated' ? 'Edge Demo' : 'Live Vision'})</span>
            </div>
          )}

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Equipment'}
            className={`p-1.5 rounded-lg border transition-all text-xs flex items-center gap-1 ${
              isBookmarked
                ? 'bg-lab-lime/10 border-lab-lime/40 text-lab-lime font-mono'
                : 'bg-lab-850 border-lab-border text-slate-400 hover:text-slate-200'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            title="Share equipment link"
            className="p-1.5 rounded-lg bg-lab-850 border border-lab-border text-slate-400 hover:text-slate-200 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          {/* Report discrepancy */}
          {onReportIssue && (
            <button
              onClick={() => onReportIssue(equipment)}
              title="Report incorrect specs or broken hardware"
              className="px-2 py-1 rounded-lg bg-lab-850 hover:bg-red-950/40 border border-lab-border hover:border-red-500/40 text-slate-400 hover:text-red-300 text-xs font-mono flex items-center gap-1 transition-colors"
            >
              <Flag className="w-3 h-3" />
              <span className="hidden md:inline">Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split Layout Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        
        {/* ======================================================== */}
        {/* LEFT HALF: Large, Crisp, Centered Equipment Canvas View */}
        {/* ======================================================== */}
        <div className="relative flex flex-col justify-center items-center bg-lab-950 p-4 sm:p-8 border-b lg:border-b-0 lg:border-r border-lab-border overflow-hidden tech-grid-pattern">
          
          {/* Overlays: Top Left Asset & Verification Stamp */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-lab-900/90 backdrop-blur-md border border-lab-border text-xs font-mono font-bold text-lab-accent shadow-panel">
                {equipment.assetCode}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-1 shadow-panel">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 bg-lab-900/80 px-2 py-0.5 rounded backdrop-blur-md border border-lab-border/60 self-start">
              Loc: {equipment.benchLocation}
            </div>
          </div>

          {/* Overlays: Top Right Controls (Zoom, Reset, Bounding Box, Hotspots) */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-lab-900/90 backdrop-blur-md p-1.5 rounded-xl border border-lab-border shadow-panel">
            <button
              onClick={() => setShowBoundingBox(!showBoundingBox)}
              title="Toggle Neural Bounding Box"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                showBoundingBox ? 'bg-lab-accent/20 text-lab-accent border border-lab-accent/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Crosshair className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowHotspots(!showHotspots)}
              title="Toggle Inspection Hotspots"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                showHotspots ? 'bg-lab-lime/20 text-lab-lime border border-lab-lime/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-lab-border my-auto" />
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-lab-800 transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-lab-800 transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-lab-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Center Stage: The Crisp Image Box */}
          <div className="relative w-full max-w-xl aspect-[4/3] flex items-center justify-center rounded-2xl overflow-hidden bg-lab-900/50 border border-lab-border/80 shadow-floating">
            <motion.div
              className="relative w-full h-full flex items-center justify-center select-none"
              animate={{ scale: zoomLevel }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <img
                src={displayImage}
                alt={equipment.name}
                className="w-full h-full object-contain p-2 transition-all drop-shadow-2xl"
              />

              {/* Bounding Box Overlay with Glowing Corner Reticles */}
              {showBoundingBox && (
                <div
                  className="absolute pointer-events-none border-2 border-lab-accent/70 rounded-lg transition-all duration-300"
                  style={{
                    left: `${boundingBox.x}%`,
                    top: `${boundingBox.y}%`,
                    width: `${boundingBox.width}%`,
                    height: `${boundingBox.height}%`
                  }}
                >
                  {/* Subtle Glowing Pulse Corner Markers */}
                  <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-lab-accent" />
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-lab-accent" />
                  <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-lab-accent" />
                  <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-lab-accent" />

                  {/* Recognition Tag */}
                  <div className="absolute -top-6 left-1 bg-lab-accent text-lab-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm">
                    {equipment.category.toUpperCase()} IDENTIFIED
                  </div>
                </div>
              )}

              {/* Interactive Inspection Hotspots on Image */}
              {showHotspots && equipment.hotspots && equipment.hotspots.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => {
                    setActiveHotspot(hs);
                    if (hs.categoryTag === 'terminal') setActiveSection('connections');
                    else if (hs.categoryTag === 'control') setActiveSection('how_to_use');
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                >
                  {/* Pulsing ring */}
                  <span className="absolute -inset-1 rounded-full bg-lab-accent/40 animate-ping" />
                  {/* Pin core */}
                  <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-lab-900 border-2 border-lab-accent text-[9px] font-mono font-bold text-lab-accent group-hover:scale-125 transition-transform shadow-glow-cyan">
                    +
                  </span>
                  {/* Hover tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded bg-lab-900/95 border border-lab-accent/40 text-[10px] font-mono text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-panel">
                    {hs.title}
                  </span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Active Hotspot Explainer Drawer (When a user clicks an on-image hotspot pin) */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute bottom-4 left-4 right-4 z-10 p-3.5 rounded-xl bg-lab-900/95 backdrop-blur-md border border-lab-accent/40 shadow-floating flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-lab-accent/20 border border-lab-accent/40 flex items-center justify-center text-lab-accent">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100 font-mono">{activeHotspot.title}</div>
                    <div className="text-[11px] text-slate-300 leading-snug">{activeHotspot.description}</div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-lab-800 border border-lab-border"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Title Bar on Left Half */}
          <div className="mt-4 text-center">
            <h1 className="text-lg font-bold text-slate-100 font-sans">{equipment.name}</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {equipment.manufacturer} • {equipment.model}
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT HALF: Signature Parabolic Trajectory Info Panel    */}
        {/* ======================================================== */}
        <div className="relative flex flex-col bg-lab-900/30 overflow-hidden">
          <ParabolicInfoPanel
            equipment={equipment}
            activeSection={activeSection}
            onSelectSection={setActiveSection}
            onSelectRelatedEquipment={onSelectRelatedEquipment}
          />
        </div>
      </div>
    </div>
  );
};
