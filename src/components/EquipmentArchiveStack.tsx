import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Equipment } from '../types/equipment';
import { EquipmentSpine } from './EquipmentSpine';
import { 
  ArrowRight, 
  FolderArchive, 
  Compass, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface EquipmentArchiveStackProps {
  equipmentList: Equipment[];
  onSelectEquipment: (equipment: Equipment) => void;
  highlightedEquipmentId?: string | null;
}

export const EquipmentArchiveStack: React.FC<EquipmentArchiveStackProps> = ({
  equipmentList,
  onSelectEquipment,
  highlightedEquipmentId
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // If a highlightedEquipmentId is passed (e.g. from search), default to hovering it
  useEffect(() => {
    if (highlightedEquipmentId) {
      const idx = equipmentList.findIndex(e => e.id === highlightedEquipmentId);
      if (idx !== -1) {
        setHoveredIndex(idx);
      }
    }
  }, [highlightedEquipmentId, equipmentList]);

  // Keyboard navigation across the book spines
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hoveredIndex === null) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setHoveredIndex(0);
      }
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setHoveredIndex((hoveredIndex + 1) % equipmentList.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setHoveredIndex((hoveredIndex - 1 + equipmentList.length) % equipmentList.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onSelectEquipment(equipmentList[hoveredIndex]);
    }
  };

  const activeItem = hoveredIndex !== null ? equipmentList[hoveredIndex] : equipmentList[0];

  return (
    <div 
      className="relative w-full flex flex-col items-center py-6 select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Interactive Archival Folder Stack. Use left and right arrow keys to navigate."
    >
      {/* Stack Header Ledger Note */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8 px-4 text-xs font-mono text-[#D8CDB8]/70 border-b border-[#D8CDB8]/15 pb-3">
        <div className="flex items-center gap-2">
          <FolderArchive className="w-4 h-4 text-[#D27230]" />
          <span className="uppercase tracking-widest text-[#F6F2E9] font-bold">
            ARCHIVAL SPECIMEN STACK
          </span>
          <span className="text-white/20">/</span>
          <span>{equipmentList.length} BOUND DOSSIERS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-[#589E6E]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AIT Pune Verified</span>
          </span>
          <span className="text-white/20">•</span>
          <span>Hover to inspect spine // Click to unfold file</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* THE TACTILE OVERLAPPING BOOK-SPINE / FOLDER STACK        */}
      {/* ======================================================== */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl overflow-x-auto no-scrollbar py-12 px-6 flex justify-start lg:justify-center items-end"
      >
        <div className="flex items-end -space-x-4 sm:-space-x-6 md:-space-x-7 pt-12 pb-4">
          {equipmentList.map((equipment, index) => {
            const isHovered = hoveredIndex === index;
            const isNeighborHovered = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;

            return (
              <EquipmentSpine
                key={equipment.id}
                equipment={equipment}
                index={index}
                total={equipmentList.length}
                isHovered={isHovered}
                isSelected={highlightedEquipmentId === equipment.id}
                isNeighborHovered={isNeighborHovered}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => {}}
                onClick={() => onSelectEquipment(equipment)}
              />
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* ACTIVE DOSSIER DOSSIER LEDGER PREVIEW BAR                 */}
      {/* ======================================================== */}
      <div className="w-full max-w-4xl mt-6 px-4">
        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-5 sm:p-6 rounded-2xl bg-[#141716]/90 border border-[#D8CDB8]/20 shadow-floating paper-laid flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/15 p-1.5 shrink-0 flex items-center justify-center halftone-specimen">
                  <img
                    src={activeItem.thumbnailUrl}
                    alt={activeItem.name}
                    className="w-full h-full object-contain filter contrast-125"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#D27230]/15 text-[#D27230] border border-[#D27230]/30 font-bold">
                      {activeItem.assetCode}
                    </span>
                    <span className="text-xs font-mono text-[#D8CDB8]/70">
                      Loc: {activeItem.benchLocation}
                    </span>
                  </div>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#F6F2E9] tracking-wide">
                    {activeItem.name}
                  </h3>
                  <p className="text-xs text-[#D8CDB8]/80 line-clamp-2 mt-1 font-sans max-w-xl leading-relaxed">
                    {activeItem.overview}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectEquipment(activeItem)}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#D27230] hover:bg-[#C45630] text-[#121514] font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>Pull Archival Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
