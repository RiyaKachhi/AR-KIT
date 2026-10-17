import React, { useState } from 'react';
import { Equipment, EquipmentCategory } from '../types/equipment';
import { UserProfile } from '../types/college';
import { 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Layers, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  Eye,
  FolderArchive
} from 'lucide-react';

interface EquipmentLibraryProps {
  catalog: Equipment[];
  userProfile: UserProfile;
  selectedLabId?: string;
  onSelectEquipment: (equipment: Equipment) => void;
  onToggleBookmark: (equipmentId: string) => void;
  onBackToHome: () => void;
  onStartScan: () => void;
}

export const EquipmentLibrary: React.FC<EquipmentLibraryProps> = ({
  catalog,
  userProfile,
  selectedLabId,
  onSelectEquipment,
  onToggleBookmark,
  onBackToHome,
  onStartScan
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarked' | 'recent'>('all');
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByLab, setFilterByLab] = useState<boolean>(false);

  const categories: { id: EquipmentCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Catalog' },
    { id: 'instrument', label: 'Instruments & Scopes' },
    { id: 'ic_component', label: 'Logic ICs & Timers' },
    { id: 'power_supply', label: 'Power Supplies' },
    { id: 'trainer_kit', label: 'Microcontrollers & Kits' },
    { id: 'sensor', label: 'Sensors & Transducers' }
  ];

  // Filter pipeline
  const filteredEquipment = catalog.filter((item) => {
    if (activeTab === 'bookmarked') {
      if (!userProfile.bookmarkedIds.includes(item.id)) return false;
    } else if (activeTab === 'recent') {
      const isRecent = userProfile.recentScans.some(s => s.equipmentId === item.id);
      if (!isRecent) return false;
    }

    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    if (filterByLab && selectedLabId && item.labId !== selectedLabId) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = item.name.toLowerCase().includes(q);
      const matchesCode = item.assetCode.toLowerCase().includes(q);
      const matchesModel = item.model.toLowerCase().includes(q);
      const matchesAlias = item.aliases.some(a => a.toLowerCase().includes(q));
      if (!matchesName && !matchesCode && !matchesModel && !matchesAlias) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0E1110] text-[#F6F2E9] p-6 max-w-7xl mx-auto space-y-6 paper-laid">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D8CDB8]/15 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D27230] uppercase tracking-widest mb-1 font-bold">
            <FolderArchive className="w-4 h-4" />
            <span>CAMPUS EQUIPMENT REPOSITORY</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight">
            Laboratory Dossier Ledger
          </h1>
          <p className="text-xs sm:text-sm text-[#D8CDB8]/70 mt-1 max-w-xl font-sans leading-relaxed">
            Browse verified bench instruments, integrated circuit pinouts, sensors, and operating manuals archived for undergraduate engineering practicals.
          </p>
        </div>

        {/* Scan Quick Action */}
        <button
          onClick={onStartScan}
          className="px-6 py-3 rounded-xl bg-[#D27230] hover:bg-[#C45630] text-[#121514] font-bold font-mono text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 self-start md:self-auto"
        >
          <Eye className="w-4 h-4" />
          <span>Launch Optical Scanner</span>
        </button>
      </div>

      {/* Tabs Row (All vs Bookmarked vs Recent Scans) */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-1.5 bg-[#141716] p-1 rounded-xl border border-[#D8CDB8]/20">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all uppercase tracking-wider ${
              activeTab === 'all'
                ? 'bg-[#D27230] text-[#121514] font-bold shadow-md'
                : 'text-[#D8CDB8]/60 hover:text-white'
            }`}
          >
            All Files ({catalog.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarked')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 uppercase tracking-wider ${
              activeTab === 'bookmarked'
                ? 'bg-[#D27230] text-[#121514] font-bold shadow-md'
                : 'text-[#D8CDB8]/60 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarked ({userProfile.bookmarkedIds.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 uppercase tracking-wider ${
              activeTab === 'recent'
                ? 'bg-[#D27230] text-[#121514] font-bold shadow-md'
                : 'text-[#D8CDB8]/60 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Recent ({userProfile.recentScans.length})</span>
          </button>
        </div>

        {/* Filter by Selected Room Toggle */}
        <label className="flex items-center gap-2 text-xs font-mono text-[#D8CDB8] cursor-pointer bg-[#141716] px-3 py-1.5 rounded-lg border border-[#D8CDB8]/20">
          <input
            type="checkbox"
            checked={filterByLab}
            onChange={(e) => setFilterByLab(e.target.checked)}
            className="rounded border-[#D8CDB8]/30 text-[#D27230] focus:ring-0 bg-[#0E1110]"
          />
          <span>Filter to current lab room</span>
        </label>
      </div>

      {/* Search Input & Category Pills */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8CDB8]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by equipment name, ID, or alias..."
            className="w-full bg-[#141716] border border-[#D8CDB8]/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F6F2E9] placeholder-[#D8CDB8]/40 focus:outline-none focus:border-[#D27230] font-mono"
          />
        </div>

        <div className="md:col-span-7 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap transition-colors font-mono ${
                selectedCategory === cat.id
                  ? 'bg-[#F6F2E9] text-[#121514] font-bold shadow-sm'
                  : 'bg-[#141716] text-[#D8CDB8]/60 hover:text-white border border-[#D8CDB8]/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Archival Equipment Dossier Cards */}
      {filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEquipment.map((equipment) => {
            const isBookmarked = userProfile.bookmarkedIds.includes(equipment.id);
            return (
              <div
                key={equipment.id}
                onClick={() => onSelectEquipment(equipment)}
                className="group relative rounded-2xl bg-[#141716] hover:bg-[#1A1E1C] border border-[#D8CDB8]/20 hover:border-[#D27230]/50 p-5 flex flex-col justify-between transition-all duration-300 shadow-paper cursor-pointer"
              >
                <div>
                  {/* Top file stamp header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0E1110] border border-[#D8CDB8]/20 text-[#D27230] uppercase">
                      {equipment.assetCode}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(equipment.id);
                      }}
                      className="text-[#D8CDB8]/60 hover:text-[#D27230] transition-colors p-1"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-[#D27230]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Specimen Photograph Window */}
                  <div className="relative w-full aspect-[16/10] rounded-xl bg-[#0E1110] border border-[#D8CDB8]/15 p-3 mb-4 overflow-hidden flex items-center justify-center halftone-specimen">
                    <img
                      src={equipment.thumbnailUrl}
                      alt={equipment.name}
                      className="w-full h-full object-contain filter contrast-125 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1110]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-xs font-mono font-bold text-[#D27230] flex items-center gap-1.5">
                        Open Archival File <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Title & Classification */}
                  <h3 className="font-editorial text-lg font-bold text-[#F6F2E9] group-hover:text-[#D27230] transition-colors tracking-wide">
                    {equipment.name}
                  </h3>
                  <div className="text-xs text-[#D8CDB8]/60 font-mono mt-0.5">
                    {equipment.manufacturer} • {equipment.model}
                  </div>

                  <p className="text-xs text-[#D8CDB8]/80 line-clamp-2 mt-2 leading-relaxed font-sans">
                    {equipment.overview}
                  </p>
                </div>

                {/* Footer specs & verification */}
                <div className="mt-4 pt-3 border-t border-[#D8CDB8]/10 flex items-center justify-between text-xs font-mono text-[#D8CDB8]/60">
                  <div className="flex items-center gap-1.5 text-[#589E6E] text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                  <span className="text-xs font-mono text-[#D8CDB8] group-hover:text-[#D27230] font-semibold flex items-center gap-1">
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D27230]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#141716] border border-[#D8CDB8]/20 flex items-center justify-center mx-auto text-[#D8CDB8]/60">
            <Search className="w-5 h-5" />
          </div>
          <h4 className="font-editorial text-lg font-bold text-[#F6F2E9]">No matching dossiers found</h4>
          <p className="text-xs text-[#D8CDB8]/70 font-sans">
            Try adjusting your search query or clearing the room filter.
          </p>
        </div>
      )}
    </div>
  );
};
