import React from 'react';
import { motion } from 'framer-motion';
import { Equipment } from '../types/equipment';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export interface SpineTheme {
  bg: string;
  accent: string;
  text: string;
  tabBg: string;
  tabText: string;
  border: string;
  categoryTag: string;
}

export const SPINE_THEMES: Record<string, SpineTheme> = {
  'eq-dso-tek': {
    bg: 'bg-[#182A1E]', // Forest green book cloth
    accent: '#D27230',
    text: 'text-[#F6F2E9]',
    tabBg: 'bg-[#243C2C]',
    tabText: 'text-[#E8DFC8]',
    border: 'border-[#2D4A36]',
    categoryTag: 'MEASUREMENT INSTRUMENTS'
  },
  'eq-fg-keysight': {
    bg: 'bg-[#8E3A20]', // Rich terracotta / rust
    accent: '#F6F2E9',
    text: 'text-[#FFFDF9]',
    tabBg: 'bg-[#AA4628]',
    tabText: 'text-[#F6F2E9]',
    border: 'border-[#BD5B38]',
    categoryTag: 'SIGNAL GENERATORS'
  },
  'eq-rps-scientific': {
    bg: 'bg-[#384334]', // Muted olive
    accent: '#E8DFC8',
    text: 'text-[#F6F2E9]',
    tabBg: 'bg-[#4B5945]',
    tabText: 'text-[#E8DFC8]',
    border: 'border-[#586952]',
    categoryTag: 'POWER SUPPLIES'
  },
  'eq-dmm-fluke': {
    bg: 'bg-[#986E3C]', // Aged ochre leather
    accent: '#121514',
    text: 'text-[#141715]',
    tabBg: 'bg-[#B08249]',
    tabText: 'text-[#121514]',
    border: 'border-[#C29255]',
    categoryTag: 'PRECISION METROLOGY'
  },
  'eq-ic-ne555': {
    bg: 'bg-[#1D2834]', // Prussian navy
    accent: '#D27230',
    text: 'text-[#F6F2E9]',
    tabBg: 'bg-[#293A4B]',
    tabText: 'text-[#E4DAC7]',
    border: 'border-[#374C60]',
    categoryTag: 'TIMING & OSCILLATORS'
  },
  'eq-esp32-devkit': {
    bg: 'bg-[#1F2321]', // Charcoal obsidian
    accent: '#D27230',
    text: 'text-[#F6F2E9]',
    tabBg: 'bg-[#2E3532]',
    tabText: 'text-[#D27230]',
    border: 'border-[#3E4743]',
    categoryTag: 'MICROCONTROLLERS & IOT'
  },
  'eq-ic-7408': {
    bg: 'bg-[#73221E]', // Deep burgundy leather
    accent: '#E8DFC8',
    text: 'text-[#F6F2E9]',
    tabBg: 'bg-[#8F2D28]',
    tabText: 'text-[#F6F2E9]',
    border: 'border-[#A63832]',
    categoryTag: 'DIGITAL LOGIC'
  },
  'eq-sensor-lvdt': {
    bg: 'bg-[#2A3E42]', // Faded blue-grey slate
    accent: '#D8CDB8',
    text: 'text-[#F6F2E9]',
    tabBg: 'bg-[#3B545A]',
    tabText: 'text-[#E4DAC7]',
    border: 'border-[#4A676E]',
    categoryTag: 'SENSORS & TRANSDUCERS'
  }
};

const DEFAULT_THEME: SpineTheme = {
  bg: 'bg-[#242A27]',
  accent: '#D27230',
  text: 'text-[#F6F2E9]',
  tabBg: 'bg-[#333C37]',
  tabText: 'text-[#E8DFC8]',
  border: 'border-[#424E48]',
  categoryTag: 'ARCHIVE SPECIMEN'
};

interface EquipmentSpineProps {
  equipment: Equipment;
  index: number;
  total: number;
  isHovered: boolean;
  isSelected: boolean;
  isNeighborHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

export const EquipmentSpine: React.FC<EquipmentSpineProps> = ({
  equipment,
  index,
  total,
  isHovered,
  isSelected,
  isNeighborHovered,
  onHoverStart,
  onHoverEnd,
  onClick
}) => {
  const theme = SPINE_THEMES[equipment.id] || DEFAULT_THEME;

  // Staggered perspective & lifting calculation for tactile archive stack
  const zIndex = isHovered ? 40 : isNeighborHovered ? 20 : total - index;
  
  return (
    <motion.div
      layoutId={`archive-spine-${equipment.id}`}
      tabIndex={0}
      role="button"
      aria-label={`Open archival file for ${equipment.name}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      animate={{
        y: isHovered ? -26 : isNeighborHovered ? -8 : 0,
        x: isHovered ? 6 : 0,
        rotate: isHovered ? -2 : 0,
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 340,
        damping: 24,
        mass: 0.8
      }}
      style={{ zIndex }}
      className={`relative cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#D27230] rounded-t-xl overflow-visible transition-shadow duration-300 ${
        isHovered ? 'shadow-spine-lift' : 'shadow-spine'
      }`}
    >
      {/* ======================================================== */}
      {/* Top File Folder Index Tab */}
      {/* ======================================================== */}
      <div
        className={`absolute -top-7 left-2 right-2 h-7 rounded-t-md px-2.5 flex items-center justify-between border-t border-x ${theme.tabBg} ${theme.border} text-[10px] font-mono tracking-wider`}
      >
        <span className={`${theme.tabText} font-bold opacity-90`}>
          VOL. {String(index + 1).padStart(2, '0')}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D27230] opacity-80" />
      </div>

      {/* ======================================================== */}
      {/* Main Archival Book Spine Body */}
      {/* ======================================================== */}
      <div
        className={`relative w-16 sm:w-20 md:w-24 h-[440px] sm:h-[480px] md:h-[520px] rounded-t-xl border-x border-t ${theme.bg} ${theme.border} book-cloth spine-groove flex flex-col justify-between py-5 px-2.5 overflow-hidden`}
      >
        {/* Subtle Vertical Gold Embossed Filigree Line */}
        <div className="absolute top-2 bottom-2 left-1.5 w-px bg-white/10 pointer-events-none" />
        <div className="absolute top-2 bottom-2 right-1.5 w-px bg-black/20 pointer-events-none" />

        {/* Top: Archive Classification Number & Seal */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <span className="text-[10px] font-mono tracking-widest text-[#E8DFC8]/70 border-b border-white/10 pb-1 w-full text-center">
            {equipment.assetCode.split('-').slice(-2).join('-')}
          </span>
          <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[9px] font-mono text-[#D27230]">
            ★
          </div>
        </div>

        {/* Center: Rotated Editorial Typography Book Spine Title */}
        <div className="flex-1 flex items-center justify-center py-4 overflow-hidden">
          <div className="writing-mode-vertical transform rotate-180 flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#E8DFC8]/60 uppercase whitespace-nowrap">
              {theme.categoryTag}
            </span>
            <span
              className={`font-editorial text-base sm:text-lg md:text-xl font-bold tracking-wide whitespace-nowrap ${theme.text}`}
            >
              {equipment.shortName}
            </span>
          </div>
        </div>

        {/* Bottom: Specimen Window & Verification Badge */}
        <div className="flex flex-col items-center gap-2 pt-2 border-t border-white/10">
          {/* Specimen Photograph Thumbnail */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-black/40 border border-white/15 p-1 flex items-center justify-center overflow-hidden halftone-specimen group-hover:border-[#D27230]/50 transition-colors">
            <img
              src={equipment.thumbnailUrl}
              alt={equipment.shortName}
              className="w-full h-full object-contain filter contrast-125"
            />
          </div>

          {/* Verified Small Tag */}
          <div className="flex items-center gap-1 text-[9px] font-mono text-[#E8DFC8]/80">
            <ShieldCheck className="w-3 h-3 text-[#589E6E]" />
            <span className="hidden sm:inline">AIT</span>
          </div>
        </div>

        {/* Reveal Hover Hint Indicator */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D27230] text-[#121514] flex items-center justify-center shadow-lg pointer-events-none"
          >
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
