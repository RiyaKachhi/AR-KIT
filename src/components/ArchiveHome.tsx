import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Equipment, EquipmentCategory } from '../types/equipment';
import { Institution, Department, Laboratory } from '../types/college';
import { LabSelector } from './LabSelector';
import { EquipmentArchiveStack } from './EquipmentArchiveStack';
import { 
  Camera, 
  Search, 
  FolderArchive, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Filter,
  Check,
  X
} from 'lucide-react';

interface ArchiveHomeProps {
  institution: Institution;
  selectedDepartment: Department;
  selectedLab: Laboratory;
  departments: Department[];
  laboratories: Laboratory[];
  equipmentCatalog: Equipment[];
  onSelectDepartment: (deptId: string) => void;
  onSelectLab: (labId: string) => void;
  onStartScan: () => void;
  onExploreEquipment: () => void;
  onSelectEquipment: (equipment: Equipment) => void;
  onOpenSettings: () => void;
}

export const ArchiveHome: React.FC<ArchiveHomeProps> = ({
  institution,
  selectedDepartment,
  selectedLab,
  departments,
  laboratories,
  equipmentCatalog,
  onSelectDepartment,
  onSelectLab,
  onStartScan,
  onExploreEquipment,
  onSelectEquipment,
  onOpenSettings
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | 'all'>('all');
  const [highlightedEquipmentId, setHighlightedEquipmentId] = useState<string | null>(null);

  // Filter catalog for the current selected laboratory
  const labEquipment = equipmentCatalog.filter(e => e.labId === selectedLab.id);
  const baseList = labEquipment.length > 0 ? labEquipment : equipmentCatalog;

  // Filter by category
  const categorizedList = selectedCategory === 'all'
    ? baseList
    : baseList.filter(e => e.category === selectedCategory);

  // Search filter
  const displayedList = searchQuery.trim() === ''
    ? categorizedList
    : categorizedList.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.assetCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const categories: { id: EquipmentCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Dossiers' },
    { id: 'instrument', label: 'Instruments & Scopes' },
    { id: 'ic_component', label: 'Logic ICs & Timers' },
    { id: 'power_supply', label: 'Power Supplies' },
    { id: 'trainer_kit', label: 'MCU Development Kits' },
    { id: 'sensor', label: 'Sensors & Transducers' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-[#0E1110] text-[#F6F2E9] overflow-hidden paper-laid">
      
      {/* 1. Compact Laboratory Context Selector */}
      <LabSelector
        institution={institution}
        departments={departments}
        laboratories={laboratories}
        selectedDepartment={selectedDepartment}
        selectedLab={selectedLab}
        equipmentCount={baseList.length}
        onSelectDepartment={onSelectDepartment}
        onSelectLab={onSelectLab}
      />

      {/* 2. Main Editorial Stage & Headline */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-4 w-full flex-1 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Subtle Archival Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141716] border border-[#D8CDB8]/20 text-xs font-mono text-[#D8CDB8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D27230]" />
            <span className="tracking-widest uppercase font-semibold text-[10px]">
              LABLENS ARCHIVAL INDEX
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[#D27230]">Point. Identify. Understand.</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F6F2E9] leading-[1.05]">
            Your lab <span className="italic font-serif text-[#D27230]">has answers.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-[#D8CDB8]/80 max-w-2xl mx-auto font-sans leading-relaxed">
            An interactive engineering knowledge archive. Scan any laboratory equipment or integrated circuit to pull its verified operating dossier, terminal wiring, and college safety protocols.
          </p>

          {/* Primary Call to Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={onStartScan}
              className="px-7 py-3.5 rounded-xl bg-[#D27230] hover:bg-[#C45630] text-[#121514] font-bold font-mono text-xs flex items-center justify-center gap-2.5 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Camera className="w-4 h-4 stroke-[2.5]" />
              <span>SCAN BENCH EQUIPMENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Quick Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#D8CDB8]/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive..."
                className="w-full bg-[#141716] border border-[#D8CDB8]/20 rounded-xl pl-9 pr-8 py-3 text-xs text-[#F6F2E9] placeholder-[#D8CDB8]/40 focus:outline-none focus:border-[#D27230] font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[11px] font-mono px-3 py-1 rounded-full transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#F6F2E9] text-[#121514] font-bold'
                    : 'bg-[#141716] text-[#D8CDB8]/60 hover:text-[#F6F2E9] border border-[#D8CDB8]/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. THE DEFINING VISUAL: Interactive Book-Spine Archive   */}
        {/* ======================================================== */}
        <div className="w-full mt-4">
          {displayedList.length > 0 ? (
            <EquipmentArchiveStack
              equipmentList={displayedList}
              onSelectEquipment={onSelectEquipment}
              highlightedEquipmentId={highlightedEquipmentId}
            />
          ) : (
            <div className="py-16 text-center max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#141716] border border-[#D8CDB8]/20 flex items-center justify-center mx-auto text-[#D27230]">
                <FolderArchive className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg text-[#F6F2E9]">
                No matching archival dossier found
              </h3>
              <p className="text-xs text-[#D8CDB8]/70 font-sans">
                No equipment matching "{searchQuery}" in {selectedLab.shortCode}. Try clearing the search or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-mono text-[#D27230] hover:underline"
              >
                Reset Archive View
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Archival Colophon */}
      <footer className="border-t border-[#D8CDB8]/10 bg-[#0E1110] px-6 py-4 text-xs font-mono text-[#D8CDB8]/50 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <div>
          LABLENS ARCHIVE // CURATED FOR ARMY INSTITUTE OF TECHNOLOGY, PUNE
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[#589E6E]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FACULTY VERIFIED REPOSITORIES</span>
          </span>
          <button
            onClick={onExploreEquipment}
            className="text-[#D8CDB8] hover:text-[#D27230] transition-colors"
          >
            INDEX DIRECTORY →
          </button>
        </div>
      </footer>
    </div>
  );
};
