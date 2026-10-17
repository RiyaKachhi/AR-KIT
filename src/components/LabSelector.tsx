import React from 'react';
import { Institution, Department, Laboratory } from '../types/college';
import { Building2, Compass, ShieldCheck, MapPin } from 'lucide-react';

interface LabSelectorProps {
  institution: Institution;
  departments: Department[];
  laboratories: Laboratory[];
  selectedDepartment: Department;
  selectedLab: Laboratory;
  equipmentCount: number;
  onSelectDepartment: (deptId: string) => void;
  onSelectLab: (labId: string) => void;
}

export const LabSelector: React.FC<LabSelectorProps> = ({
  institution,
  departments,
  laboratories,
  selectedDepartment,
  selectedLab,
  equipmentCount,
  onSelectDepartment,
  onSelectLab
}) => {
  return (
    <div className="w-full bg-[#141716]/80 backdrop-blur-md border-b border-[#D8CDB8]/15 px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        
        {/* Institutional Archival Stamp */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1110] border border-[#D8CDB8]/20 text-[#D8CDB8] font-mono">
            <Building2 className="w-3.5 h-3.5 text-[#D27230]" />
            <span className="font-bold text-[#F6F2E9] tracking-wider">{institution.shortName}</span>
            <span className="text-[#D8CDB8]/40">•</span>
            <span className="text-[#D8CDB8]/70 text-[11px]">{institution.campusLocation.split(',')[0]}</span>
          </div>

          <span className="archive-stamp px-2 py-0.5 rounded text-[10px] hidden sm:inline">
            ARCHIVE NO. 2026-AIT
          </span>
        </div>

        {/* Department & Lab Switcher Drawers */}
        <div className="flex items-center gap-2.5 flex-wrap font-mono">
          {/* Department Selector */}
          <div className="flex items-center gap-1.5 bg-[#0E1110] border border-[#D8CDB8]/20 rounded-lg px-2.5 py-1">
            <span className="text-[10px] uppercase text-[#D8CDB8]/60">Dept:</span>
            <select
              value={selectedDepartment.id}
              onChange={(e) => onSelectDepartment(e.target.value)}
              className="bg-transparent text-[#F6F2E9] focus:outline-none text-xs cursor-pointer font-bold"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id} className="bg-[#141716] text-[#F6F2E9]">
                  {dept.name} ({dept.code})
                </option>
              ))}
            </select>
          </div>

          {/* Laboratory Selector */}
          <div className="flex items-center gap-1.5 bg-[#0E1110] border border-[#D8CDB8]/20 rounded-lg px-2.5 py-1">
            <span className="text-[10px] uppercase text-[#D8CDB8]/60">Lab:</span>
            <select
              value={selectedLab.id}
              onChange={(e) => onSelectLab(e.target.value)}
              className="bg-transparent text-[#F6F2E9] focus:outline-none text-xs cursor-pointer font-bold max-w-[240px] truncate"
            >
              {laboratories.map((lab) => (
                <option key={lab.id} value={lab.id} className="bg-[#141716] text-[#F6F2E9]">
                  {lab.shortCode} — {lab.roomNumber.split(',')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Equipment Count Pill */}
          <span className="text-[#D27230] text-[11px] px-2.5 py-1 rounded bg-[#D27230]/10 border border-[#D27230]/30 font-bold">
            {equipmentCount} DOSSIERS CATALOGED
          </span>
        </div>
      </div>
    </div>
  );
};
