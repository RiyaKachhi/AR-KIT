import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Equipment, InspectionHotspot } from '../types/equipment';
import { RecognitionResult } from '../types/recognition';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Crosshair, 
  Eye, 
  ShieldCheck, 
  Info,
  Maximize2
} from 'lucide-react';

interface SpecimenImagePanelProps {
  equipment: Equipment;
  capturedImage?: string | null;
  recognitionResult?: RecognitionResult | null;
  onSelectHotspotCategory?: (category: string) => void;
}

export const SpecimenImagePanel: React.FC<SpecimenImagePanelProps> = ({
  equipment,
  capturedImage,
  recognitionResult,
  onSelectHotspotCategory
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showBoundingBox, setShowBoundingBox] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<InspectionHotspot | null>(null);

  const displayImage = capturedImage || equipment.imageUrl;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const boundingBox = recognitionResult?.boundingBox || {
    x: 10,
    y: 12,
    width: 80,
    height: 76
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center bg-[#0E1110] p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#D8CDB8]/15 overflow-hidden paper-laid">
      
      {/* Top Left: Archival Specimen Classification Stamp & Tag */}
      <div className="absolute top-5 left-5 z-20 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-md bg-[#141716]/95 border border-[#D8CDB8]/25 text-xs font-mono font-bold text-[#D27230] shadow-md">
            SPECIMEN // {equipment.assetCode}
          </span>
          <span className="archive-stamp px-2 py-0.5 rounded text-[10px] bg-[#141716]/90 shadow-sm">
            VERIFIED RECORD
          </span>
        </div>
        <div className="text-[11px] font-mono text-[#D8CDB8]/80 bg-[#141716]/90 px-2.5 py-0.5 rounded border border-[#D8CDB8]/15 self-start">
          Bench: {equipment.benchLocation}
        </div>
      </div>

      {/* Top Right: Physical Inspection Controls (Zoom, Reticle, Pins) */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 bg-[#141716]/95 p-1.5 rounded-xl border border-[#D8CDB8]/20 shadow-panel">
        <button
          onClick={() => setShowBoundingBox(!showBoundingBox)}
          title="Toggle Bounding Frame"
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            showBoundingBox ? 'bg-[#D27230]/20 text-[#D27230] border border-[#D27230]/40' : 'text-[#D8CDB8]/60 hover:text-white'
          }`}
        >
          <Crosshair className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowHotspots(!showHotspots)}
          title="Toggle Component Pins"
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            showHotspots ? 'bg-[#589E6E]/20 text-[#589E6E] border border-[#589E6E]/40' : 'text-[#D8CDB8]/60 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-[#D8CDB8]/20 my-auto" />
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-1.5 rounded-lg text-[#D8CDB8]/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-1.5 rounded-lg text-[#D8CDB8]/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          title="Reset View"
          className="p-1.5 rounded-lg text-[#D8CDB8]/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Center Specimen Stage: Tactile Framing */}
      <div className="relative w-full max-w-lg aspect-[4/3] my-auto flex items-center justify-center rounded-2xl overflow-hidden bg-[#141716] border-2 border-[#D8CDB8]/20 shadow-2xl p-4 halftone-specimen">
        <motion.div
          className="relative w-full h-full flex items-center justify-center select-none"
          animate={{ scale: zoomLevel }}
          transition={{ type: 'spring', stiffness: 220, damping: 25 }}
        >
          <img
            src={displayImage}
            alt={equipment.name}
            className="w-full h-full object-contain filter contrast-[1.12] drop-shadow-xl"
          />

          {/* Archival Bounding Box Overlay with Corner Ticks */}
          {showBoundingBox && (
            <div
              className="absolute pointer-events-none border-2 border-[#D27230]/80 rounded-lg transition-all duration-300"
              style={{
                left: `${boundingBox.x}%`,
                top: `${boundingBox.y}%`,
                width: `${boundingBox.width}%`,
                height: `${boundingBox.height}%`
              }}
            >
              <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#D27230]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#D27230]" />
              <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#D27230]" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#D27230]" />

              <div className="absolute -top-5 left-1 bg-[#D27230] text-[#121514] text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                IDENTIFIED SPECIMEN
              </div>
            </div>
          )}

          {/* Interactive Inspection Hotspots */}
          {showHotspots && equipment.hotspots && equipment.hotspots.map((hs) => (
            <button
              key={hs.id}
              onClick={() => {
                setActiveHotspot(hs);
                if (onSelectHotspotCategory) {
                  onSelectHotspotCategory(hs.categoryTag === 'terminal' ? 'connections' : 'how_to_use');
                }
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
            >
              <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#141716] border-2 border-[#D27230] text-[9px] font-mono font-bold text-[#D27230] group-hover:scale-125 transition-transform shadow-lg">
                +
              </span>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded bg-[#141716] border border-[#D8CDB8]/30 text-[10px] font-mono text-[#F6F2E9] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {hs.title}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Active Hotspot Callout Card */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute bottom-16 left-6 right-6 z-20 p-3.5 rounded-xl bg-[#141716]/95 border border-[#D27230]/50 shadow-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D27230]/20 border border-[#D27230]/40 flex items-center justify-center text-[#D27230]">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#F6F2E9] font-mono">{activeHotspot.title}</div>
                <div className="text-[11px] text-[#D8CDB8]/80 leading-snug">{activeHotspot.description}</div>
              </div>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-xs font-mono text-[#D8CDB8]/70 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Technical Caption */}
      <div className="text-center mt-3 z-10">
        <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#F6F2E9] tracking-wide">
          {equipment.name}
        </h2>
        <p className="text-xs text-[#D8CDB8]/60 font-mono mt-0.5">
          {equipment.manufacturer} • Model: {equipment.model}
        </p>
      </div>
    </div>
  );
};
