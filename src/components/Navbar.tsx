import React from 'react';
import { UserRole } from '../types/college';
import { 
  Camera, 
  Layers, 
  HelpCircle, 
  Building2,
  FolderArchive,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'scanner' | 'library' | 'splitscreen' | 'admin';
  onChangeView: (view: 'home' | 'scanner' | 'library' | 'admin') => void;
  selectedLabCode: string;
  userRole: UserRole;
  onOpenSetupGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onChangeView,
  selectedLabCode,
  userRole,
  onOpenSetupGuide
}) => {
  return (
    <header className="h-16 border-b border-[#D8CDB8]/15 bg-[#0E1110]/95 backdrop-blur-xl sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Brand Identity */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => onChangeView('home')}
          className="flex items-center gap-3 text-left group"
        >
          {/* Logo Archival Seal Badge */}
          <div className="relative w-9 h-9 rounded-xl bg-[#141716] border border-[#D27230]/40 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden">
            <div className="w-5 h-5 rounded-full border border-[#D27230] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D27230]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial text-lg font-bold tracking-wider text-[#F6F2E9] group-hover:text-[#D27230] transition-colors">
                LABLENS
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#D27230]/15 text-[#D27230] border border-[#D27230]/30">
                ARCHIVE
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#D8CDB8]/60 -mt-0.5 tracking-tight">
              AIT Pune Laboratory Repository
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => onChangeView('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentView === 'home'
                ? 'bg-[#141716] text-[#D27230] font-bold border border-[#D8CDB8]/20'
                : 'text-[#D8CDB8]/70 hover:text-white'
            }`}
          >
            Archive Index
          </button>
          <button
            onClick={() => onChangeView('scanner')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'scanner'
                ? 'bg-[#141716] text-[#D27230] font-bold border border-[#D8CDB8]/20'
                : 'text-[#D8CDB8]/70 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Optical Scanner</span>
          </button>
          <button
            onClick={() => onChangeView('library')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'library'
                ? 'bg-[#141716] text-[#D27230] font-bold border border-[#D8CDB8]/20'
                : 'text-[#D8CDB8]/70 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Catalog Ledger</span>
          </button>
          <button
            onClick={() => onChangeView('admin')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'admin'
                ? 'bg-[#141716] text-[#589E6E] font-bold border border-[#D8CDB8]/20'
                : 'text-[#D8CDB8]/70 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Faculty Admin</span>
          </button>
        </nav>
      </div>

      {/* Right Controls: Room Tag + Role + Setup */}
      <div className="flex items-center gap-3">
        {/* Active Lab Drawer Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#141716] border border-[#D8CDB8]/20 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#589E6E]" />
          <span className="text-[#D8CDB8]/60">Lab:</span>
          <span className="text-[#F6F2E9] font-bold">{selectedLabCode}</span>
        </div>

        {/* Role Stamp */}
        <span className={`text-[11px] font-mono px-2 py-0.5 rounded border capitalize ${
          userRole === 'student'
            ? 'bg-[#141716] text-[#D8CDB8] border-[#D8CDB8]/20'
            : userRole === 'lab_assistant'
            ? 'bg-[#589E6E]/15 text-[#589E6E] border-[#589E6E]/30'
            : 'bg-[#9E4224]/15 text-[#D27230] border-[#D27230]/30'
        }`}>
          {userRole.replace('_', ' ')}
        </span>

        {/* Setup Guide Button */}
        <button
          onClick={onOpenSetupGuide}
          title="System Architecture & Database Schema"
          className="p-2 rounded-lg bg-[#141716] hover:bg-white/5 text-[#D8CDB8] hover:text-[#D27230] border border-[#D8CDB8]/20 transition-colors flex items-center gap-1 text-xs font-mono"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden lg:inline">Schema & Setup</span>
        </button>
      </div>
    </header>
  );
};
