import React from 'react';
import { motion } from 'framer-motion';
import { Equipment, InfoPanelSection } from '../types/equipment';
import { 
  FolderArchive, 
  HelpCircle, 
  Target, 
  ListOrdered, 
  Cpu, 
  Activity, 
  Sliders, 
  ShieldAlert, 
  AlertTriangle, 
  Wrench, 
  BookMarked, 
  Bot, 
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface EquipmentSectionIndexProps {
  equipment: Equipment;
  onSelectSection: (section: InfoPanelSection | 'ai_assistant') => void;
}

interface IndexCardConfig {
  id: InfoPanelSection | 'ai_assistant';
  number: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
  relevantOnlyIf?: boolean;
}

export const EquipmentSectionIndex: React.FC<EquipmentSectionIndexProps> = ({
  equipment,
  onSelectSection
}) => {
  const rawIndexCards: IndexCardConfig[] = [
    {
      id: 'overview',
      number: 'DOC. 01',
      title: 'OVERVIEW',
      subtitle: 'Executive summary & bench classification',
      icon: FolderArchive
    },
    {
      id: 'what_is_it',
      number: 'DOC. 02',
      title: 'WHAT IT DOES',
      subtitle: 'Applications & operational background',
      icon: HelpCircle
    },
    {
      id: 'how_to_use',
      number: 'DOC. 03',
      title: 'HOW TO USE',
      subtitle: 'Step-by-step standardized checklist',
      icon: ListOrdered,
      tag: `${equipment.operatingProcedure.length} Steps`
    },
    {
      id: 'connections',
      number: 'DOC. 04',
      title: 'CONNECTIONS / PINOUT',
      subtitle: 'Terminal wiring and electrical ratings',
      icon: Cpu,
      relevantOnlyIf: Boolean(equipment.pinoutAndConnections),
      tag: equipment.pinoutAndConnections ? `${equipment.pinoutAndConnections.pins.length} Pins` : undefined
    },
    {
      id: 'how_it_works',
      number: 'DOC. 05',
      title: 'HOW IT WORKS',
      subtitle: 'Physical principles & circuit theory',
      icon: Activity
    },
    {
      id: 'specifications',
      number: 'DOC. 06',
      title: 'SPECIFICATIONS',
      subtitle: 'Calibrated tolerances & metric units',
      icon: Sliders,
      tag: `${equipment.technicalSpecs.length} Specs`
    },
    {
      id: 'precautions',
      number: 'DOC. 07',
      title: 'SAFETY / PRECAUTIONS',
      subtitle: 'Critical electrical limits & hazard alerts',
      icon: ShieldAlert,
      tag: 'Mandatory'
    },
    {
      id: 'mistakes',
      number: 'DOC. 08',
      title: 'COMMON MISTAKES',
      subtitle: 'Student errors and immediate fixes',
      icon: AlertTriangle
    },
    {
      id: 'troubleshooting',
      number: 'DOC. 09',
      title: 'TROUBLESHOOTING',
      subtitle: 'Diagnostic symptoms & remedies',
      icon: Wrench
    },
    {
      id: 'manual',
      number: 'DOC. 10',
      title: 'REFERENCES & MANUAL',
      subtitle: 'AIT course syllabus & experiment guide',
      icon: BookMarked,
      tag: 'Verified'
    },
    {
      id: 'ai_assistant',
      number: 'DOC. 11',
      title: 'AI LAB ASSISTANT',
      subtitle: 'Manual-grounded interactive inquiry',
      icon: Bot,
      tag: 'Grounded'
    }
  ];

  const indexCards = rawIndexCards.filter(c => c.relevantOnlyIf !== false);

  return (
    <div className="relative flex-1 flex flex-col justify-between overflow-y-auto bg-[#141716] paper-laid">
      {/* Header Index Dossier Stamp */}
      <div className="p-6 sm:p-8 border-b border-[#D8CDB8]/15 bg-[#0E1110]/60">
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
          <FolderArchive className="w-3.5 h-3.5" />
          <span>EQUIPMENT ARCHIVE INDEX // {equipment.assetCode}</span>
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F6F2E9] mt-1">
          Archival Dossier Sections
        </h2>
        <p className="text-xs text-[#D8CDB8]/70 mt-1 max-w-md font-sans leading-relaxed">
          Select a file divider below to pull out its verified technical documentation, wiring schematics, and safety protocols.
        </p>
      </div>

      {/* Grid of Archival File Index Dividers */}
      <div className="flex-1 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 overflow-y-auto">
        {indexCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <motion.button
              key={card.id}
              onClick={() => onSelectSection(card.id)}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="group text-left p-4 rounded-xl bg-[#0E1110] hover:bg-[#1A1E1C] border border-[#D8CDB8]/15 hover:border-[#D27230]/40 transition-all flex flex-col justify-between shadow-paper overflow-hidden relative"
            >
              {/* Subtle Folded Folder Tab Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 group-hover:bg-[#D27230] transition-colors" />

              <div className="flex items-center justify-between mb-3 pt-1">
                <span className="text-[10px] font-mono text-[#D8CDB8]/50 group-hover:text-[#D27230] font-bold">
                  {card.number}
                </span>
                {card.tag && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#D8CDB8]/70">
                    {card.tag}
                  </span>
                )}
              </div>

              <div>
                <div className="font-editorial text-base sm:text-lg font-bold text-[#F6F2E9] group-hover:text-[#D27230] transition-colors flex items-center justify-between">
                  <span>{card.title}</span>
                  <ChevronRight className="w-4 h-4 text-[#D8CDB8]/40 group-hover:text-[#D27230] group-hover:translate-x-1 transition-all" />
                </div>
                <div className="text-[11px] text-[#D8CDB8]/60 mt-1 line-clamp-1 font-sans">
                  {card.subtitle}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
