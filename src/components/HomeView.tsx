import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Equipment } from '../types/equipment';
import { Institution, Department, Laboratory } from '../types/college';
import { 
  Camera, 
  Search, 
  Compass, 
  ChevronRight, 
  Building2, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  Bookmark,
  Clock,
  BookOpen,
  Cpu,
  Sliders,
  Zap,
  Info
} from 'lucide-react';

interface HomeViewProps {
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
  bookmarkedIds: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
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
  onOpenSettings,
  bookmarkedIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter equipment for the selected lab
  const labEquipment = equipmentCatalog.filter(e => e.labId === selectedLab.id);
  const displayItems = labEquipment.length > 0 ? labEquipment : equipmentCatalog;

  // Search filter
  const filteredSearch = searchQuery.trim() === '' 
    ? [] 
    : equipmentCatalog.filter(e => 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.assetCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden tech-grid-pattern pb-12">
      
      {/* Background Radial Glow Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-lab-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[300px] bg-lab-lime/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Banner: Campus & Laboratory Active Context Bar */}
      <div className="relative z-10 border-b border-lab-border/70 bg-lab-900/60 backdrop-blur-md px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          
          {/* Institutional Stamp */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-lab-950 border border-lab-border text-slate-300 font-mono">
              <Building2 className="w-3.5 h-3.5 text-lab-accent" />
              <span className="font-semibold text-slate-100">{institution.shortName}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{institution.campusLocation.split(',')[0]}</span>
            </div>
            <span className="hidden sm:inline text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Configured Profile
            </span>
          </div>

          {/* Department & Lab Switchers */}
          <div className="flex items-center gap-2 flex-wrap font-mono">
            {/* Department Dropdown */}
            <select
              value={selectedDepartment.id}
              onChange={(e) => onSelectDepartment(e.target.value)}
              className="bg-lab-950 border border-lab-border rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-lab-accent text-xs cursor-pointer"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  Dept: {dept.code}
                </option>
              ))}
            </select>

            {/* Lab Dropdown */}
            <select
              value={selectedLab.id}
              onChange={(e) => onSelectLab(e.target.value)}
              className="bg-lab-950 border border-lab-border rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-lab-accent text-xs cursor-pointer max-w-[220px] truncate"
            >
              {laboratories.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.shortCode} — {lab.roomNumber.split(',')[0]}
                </option>
              ))}
            </select>

            <span className="text-slate-400 text-xs px-2 py-0.5 rounded bg-lab-800/80 border border-lab-border">
              {labEquipment.length} Registered Units
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-6 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lab-900 border border-lab-border text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-lab-accent animate-pulse" />
              <span className="tracking-wider uppercase">LABLENS Campus System</span>
              <span className="text-slate-600">/</span>
              <span className="text-lab-accent">Identify. Understand. Operate Safely.</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 font-sans tracking-tight leading-[1.08]">
              Your lab <br />
              <span className="bg-gradient-to-r from-lab-accent via-cyan-300 to-lab-lime bg-clip-text text-transparent">
                has answers.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-sans leading-relaxed">
              Point. Identify. Understand. Point your camera at any laboratory component or instrument to instantly access verified operating procedures, pinouts, and college-specific safety limits.
            </p>

            {/* Search Input Bar with Autocomplete Dropdown */}
            <div className="relative max-w-lg">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder={`Search ${selectedLab.shortCode} components (e.g. DSO, 555 Timer, Power Supply)...`}
                  className="w-full bg-lab-900/90 backdrop-blur-md border border-lab-border rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-lab-accent transition-all shadow-panel"
                />
              </div>

              {/* Autocomplete Results Overlay */}
              {isSearchFocused && filteredSearch.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-lab-900/95 backdrop-blur-xl border border-lab-border rounded-xl shadow-floating z-30 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Matching College Equipment ({filteredSearch.length})
                  </div>
                  {filteredSearch.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectEquipment(item);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-lab-800/80 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-lab-accent">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {item.assetCode} • {item.benchLocation}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lab-950 text-slate-400 border border-lab-border">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary & Secondary Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onStartScan}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-lab-accent to-cyan-400 text-lab-950 font-bold font-mono text-sm flex items-center justify-center gap-2.5 shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Scan Equipment</span>
              </button>

              <button
                onClick={onExploreEquipment}
                className="px-6 py-3.5 rounded-xl bg-lab-900/80 hover:bg-lab-850 text-slate-200 hover:text-white border border-lab-border hover:border-slate-500 font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-panel"
              >
                <Compass className="w-4 h-4 text-lab-accent" />
                <span>Explore Lab Equipment</span>
              </button>
            </div>

            {/* Academic Verification Notice */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Verified against {institution.shortName} syllabus standards. Seed catalog pre-loaded for immediate evaluation.
              </span>
            </div>
          </div>

          {/* Right Column: Central Interactive Scanning Element / Radar Visual */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
              
              {/* Outer Concentric Animated Orbit Rings */}
              <div className="absolute inset-0 rounded-full border border-lab-border animate-pulse-subtle" />
              <div className="absolute inset-4 rounded-full border border-lab-accent/20" />
              <div className="absolute inset-10 rounded-full border border-lab-border/40" />
              
              {/* Conic Radar Sweep Beam */}
              <div className="absolute inset-8 rounded-full radar-sweep animate-radar pointer-events-none opacity-40" />

              {/* Central Core Interactive Reticle */}
              <motion.button
                onClick={onStartScan}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-44 h-44 rounded-full bg-lab-900/90 border-2 border-lab-accent/60 shadow-glow-cyan flex flex-col items-center justify-center gap-2 group cursor-pointer backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-full bg-lab-accent/15 border border-lab-accent/30 flex items-center justify-center text-lab-accent group-hover:rotate-12 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider group-hover:text-lab-accent transition-colors">
                  Tap to Scan
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedLab.shortCode}
                </span>

                {/* Laser scan line inside button */}
                <span className="absolute inset-x-4 h-0.5 scan-laser animate-scan-line pointer-events-none" />
              </motion.button>

              {/* Orbital Telemetry Nodes */}
              <div className="absolute top-2 left-6 px-2.5 py-1 rounded bg-lab-950/80 border border-lab-border text-[10px] font-mono text-slate-300 shadow-panel">
                CAM: READY
              </div>
              <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded bg-lab-950/80 border border-lab-border text-[10px] font-mono text-lab-accent shadow-panel">
                ROOM: {selectedLab.roomNumber.split(',')[0]}
              </div>
              <div className="absolute bottom-6 left-2 px-2.5 py-1 rounded bg-lab-950/80 border border-lab-border text-[10px] font-mono text-emerald-400 shadow-panel">
                VERIFIED: YES
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Active Equipment Spotlight Carousel in Selected Lab */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-lab-accent" />
            <h3 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider">
              {selectedLab.name} — Bench Inventory ({displayItems.length})
            </h3>
          </div>
          <button
            onClick={onExploreEquipment}
            className="text-xs font-mono text-slate-400 hover:text-lab-accent transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Scrolling Component Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {displayItems.slice(0, 4).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="p-3.5 rounded-xl bg-lab-900/70 hover:bg-lab-850/90 border border-lab-border hover:border-lab-accent/40 transition-all shadow-panel flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectEquipment(item)}
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-lg bg-lab-950 border border-lab-border p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-lab-accent uppercase">
                    {item.assetCode}
                  </span>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-lab-accent transition-colors truncate">
                    {item.shortName}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-sans">
                    {item.overview}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-lab-border/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{item.benchLocation.split(',')[0]}</span>
                <span className="text-lab-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Inspect <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
