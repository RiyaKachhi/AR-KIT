import React from 'react';
import { motion } from 'framer-motion';
import { Equipment, InfoPanelSection } from '../types/equipment';
import { PinoutDiagram } from './PinoutDiagram';
import { OperatingProcedure } from './OperatingProcedure';
import { AiLabAssistant } from './AiLabAssistant';
import { 
  ArrowLeft, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Check, 
  FileText, 
  BookOpen, 
  Wrench, 
  Activity, 
  MapPin, 
  Sliders, 
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

interface CurvedInfoSheetProps {
  equipment: Equipment;
  activeSection: InfoPanelSection | 'ai_assistant';
  onClose: () => void;
  onSelectSection: (section: InfoPanelSection | 'ai_assistant') => void;
  onSelectRelatedEquipment?: (equipmentId: string) => void;
}

export const CurvedInfoSheet: React.FC<CurvedInfoSheetProps> = ({
  equipment,
  activeSection,
  onClose,
  onSelectSection,
  onSelectRelatedEquipment
}) => {
  // Parabolic trajectory animation variant simulating extracting an archival sheet from a folder
  const sheetVariants = {
    initial: {
      opacity: 0,
      x: 45,
      y: 60,
      scale: 0.9,
      rotate: 1.5,
      filter: 'blur(4px)'
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 24,
        mass: 0.85
      }
    },
    exit: {
      opacity: 0,
      x: 35,
      y: 40,
      scale: 0.93,
      rotate: 1,
      filter: 'blur(4px)',
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const rawSectionsList: { id: InfoPanelSection | 'ai_assistant'; label: string; condition?: boolean }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'what_is_it', label: 'What It Does' },
    { id: 'how_to_use', label: 'How to Use' },
    { id: 'connections', label: 'Pinout & Wiring', condition: Boolean(equipment.pinoutAndConnections) },
    { id: 'how_it_works', label: 'How It Works' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'precautions', label: 'Safety Precautions' },
    { id: 'mistakes', label: 'Common Mistakes' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
    { id: 'manual', label: 'Lab Manual' },
    { id: 'ai_assistant', label: 'AI Assistant' }
  ];

  const sectionsList = rawSectionsList.filter(s => s.condition !== false);

  return (
    <motion.div
      variants={sheetVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative flex-1 flex flex-col bg-[#141716] border-l border-[#D8CDB8]/20 shadow-2xl overflow-hidden paper-laid"
    >
      {/* Top Archival Sheet Navigation Bar */}
      <div className="p-4 sm:p-5 border-b border-[#D8CDB8]/15 bg-[#0E1110]/90 backdrop-blur-md flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-mono font-bold text-[#D8CDB8] hover:text-[#D27230] transition-colors px-3 py-1.5 rounded-lg bg-[#141716] border border-[#D8CDB8]/20 hover:border-[#D27230]/40"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#D27230]" />
            <span>Return to File Index</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#D8CDB8]/70">
            <span>Dossier // {equipment.assetCode}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#589E6E]" />
          </div>
        </div>

        {/* Horizontal Index Divider Quick Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {sectionsList.map((sec) => {
            const isCurrent = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`text-[11px] font-mono px-3 py-1 rounded-md whitespace-nowrap transition-all uppercase tracking-wider ${
                  isCurrent
                    ? 'bg-[#D27230] text-[#121514] font-bold shadow-md'
                    : 'bg-[#141716] text-[#D8CDB8]/60 hover:text-[#F6F2E9] border border-[#D8CDB8]/15'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Archival Sheet Content Scroll Body */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
        
        {/* SECTION: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
                DOCUMENT SUMMARY // CLASSIFICATION 01
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F6F2E9] mt-1">
                {equipment.name}
              </h2>
              <p className="text-sm leading-relaxed text-[#D8CDB8]/90 mt-3 font-sans">
                {equipment.overview}
              </p>
            </div>

            {/* Specimen Properties Card */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-[#0E1110] border border-[#D8CDB8]/15">
                <span className="text-[10px] font-mono text-[#D8CDB8]/60 uppercase">Model Specification</span>
                <div className="text-xs font-bold text-[#F6F2E9] font-mono mt-1">{equipment.model}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0E1110] border border-[#D8CDB8]/15">
                <span className="text-[10px] font-mono text-[#D8CDB8]/60 uppercase">Manufacturer</span>
                <div className="text-xs font-bold text-[#F6F2E9] font-mono mt-1">{equipment.manufacturer}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0E1110] border border-[#D8CDB8]/15">
                <span className="text-[10px] font-mono text-[#D8CDB8]/60 uppercase">Laboratory Bench</span>
                <div className="text-xs font-bold text-[#F6F2E9] font-mono mt-1">{equipment.benchLocation}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0E1110] border border-[#D8CDB8]/15">
                <span className="text-[10px] font-mono text-[#D8CDB8]/60 uppercase">Verification Officer</span>
                <div className="text-xs font-bold text-[#589E6E] font-mono mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{equipment.verifiedBy}</span>
                </div>
              </div>
            </div>

            {/* Safety Callout Banner */}
            <div className="p-4 rounded-xl bg-[#9E4224]/15 border border-[#9E4224]/40 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#C45630] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-[#C45630] font-mono uppercase tracking-wider">
                  Mandatory Laboratory Precaution
                </div>
                <p className="text-xs text-[#E8DFC8]/90 mt-1 leading-relaxed">
                  {equipment.safetyPrecautions[0]?.text}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: WHAT IT DOES */}
        {activeSection === 'what_is_it' && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
              TECHNICAL BACKGROUND
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              Purpose and Engineering Principles
            </h2>
            <div className="p-5 rounded-xl bg-[#0E1110] border border-[#D8CDB8]/15 text-sm leading-relaxed text-[#D8CDB8]/90 font-sans space-y-3">
              <p>{equipment.whatIsIt}</p>
            </div>
            
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono font-bold text-[#F6F2E9]">Primary Laboratory Functions:</span>
              <div className="space-y-2">
                {equipment.purposeAndApplications.map((app, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#0E1110]/70 border border-[#D8CDB8]/15 flex items-start gap-2.5 text-xs text-[#D8CDB8]">
                    <Check className="w-4 h-4 text-[#589E6E] shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: HOW TO USE */}
        {activeSection === 'how_to_use' && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
              BENCH OPERATING PROCEDURE
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              Standard 5-Step Experimental Protocol
            </h2>
            <OperatingProcedure steps={equipment.operatingProcedure} equipmentName={equipment.name} />
          </div>
        )}

        {/* SECTION: CONNECTIONS & PINOUT */}
        {activeSection === 'connections' && equipment.pinoutAndConnections && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
              TERMINAL & PIN SPECIFICATION
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              Hardware Pinout & Connections
            </h2>
            <PinoutDiagram
              diagramType={equipment.pinoutAndConnections.diagramType}
              packageType={equipment.pinoutAndConnections.packageType}
              pins={equipment.pinoutAndConnections.pins}
              wiringRules={equipment.pinoutAndConnections.wiringRules}
            />
          </div>
        )}

        {/* SECTION: HOW IT WORKS */}
        {activeSection === 'how_it_works' && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
              PHYSICAL & ELECTRONIC THEORY
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              Underlying Working Principle
            </h2>
            <div className="p-5 rounded-xl bg-[#0E1110] border border-[#D8CDB8]/15 text-sm leading-relaxed text-[#D8CDB8]/90 font-sans space-y-3">
              <p>{equipment.howItWorks}</p>
            </div>
          </div>
        )}

        {/* SECTION: SPECIFICATIONS */}
        {activeSection === 'specifications' && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
              CALIBRATED METRIC RATINGS
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              Technical Specifications
            </h2>
            <div className="rounded-xl border border-[#D8CDB8]/15 overflow-hidden bg-[#0E1110]">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#141716] border-b border-[#D8CDB8]/15 text-[#D8CDB8]/60 font-mono">
                  <tr>
                    <th className="p-3">Parameter</th>
                    <th className="p-3">Calibrated Value</th>
                    <th className="p-3">Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8CDB8]/10 font-mono">
                  {equipment.technicalSpecs.map((spec, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="p-3 font-sans font-medium text-[#F6F2E9]">{spec.property}</td>
                      <td className="p-3 font-bold text-[#D27230]">{spec.value}</td>
                      <td className="p-3 text-[#D8CDB8]/60">{spec.unit || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: PRECAUTIONS */}
        {activeSection === 'precautions' && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#C43D30] uppercase tracking-widest font-bold">
              LABORATORY SAFETY PROTOCOLS
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              Mandatory Safety Directives
            </h2>
            <div className="space-y-3">
              {equipment.safetyPrecautions.map((sec, i) => {
                const isCrit = sec.severity === 'critical';
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${
                      isCrit
                        ? 'bg-[#73221E]/20 border-[#C43D30]/40 text-[#F6F2E9]'
                        : 'bg-[#8E3A20]/15 border-[#D27230]/30 text-[#F6F2E9]'
                    } space-y-1`}
                  >
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#C43D30] uppercase">
                      <ShieldAlert className="w-4 h-4" />
                      <span>{sec.severity} Safety Rule</span>
                    </div>
                    <p className="text-xs leading-relaxed font-semibold">{sec.text}</p>
                    {sec.rationale && (
                      <p className="text-[11px] text-[#D8CDB8]/70 italic">Why: {sec.rationale}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION: COMMON MISTAKES */}
        {activeSection === 'mistakes' && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
              DIAGNOSTIC ARCHIVE
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              Frequent Student Errors & Corrections
            </h2>
            <div className="space-y-3">
              {equipment.commonMistakes.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0E1110] border border-[#D8CDB8]/15 space-y-2">
                  <div className="text-xs font-bold text-[#C45630] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Mistake: {item.mistake}</span>
                  </div>
                  <div className="text-xs text-[#D8CDB8]/80 pl-6">
                    <span className="text-[#D8CDB8]/60 font-mono">Consequence: </span>
                    {item.consequence}
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#589E6E]/15 border border-[#589E6E]/30 text-xs text-[#E8DFC8] flex items-start gap-2 ml-6">
                    <Check className="w-3.5 h-3.5 text-[#589E6E] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#589E6E]">Fix: </span>
                      {item.fix}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: TROUBLESHOOTING */}
        {activeSection === 'troubleshooting' && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
              BENCH RECOVERY
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              Hardware Troubleshooting Ledger
            </h2>
            <div className="space-y-3">
              {equipment.troubleshooting.map((tb, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0E1110] border border-[#D8CDB8]/15 space-y-2">
                  <div className="text-xs font-bold text-[#F6F2E9] flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#D27230]" />
                    <span>Symptom: {tb.symptom}</span>
                  </div>
                  <div className="text-xs text-[#D8CDB8]/70 pl-6">
                    <span className="font-mono text-[#D8CDB8]/50">Probable Cause: </span>
                    {tb.probableCause}
                  </div>
                  <div className="text-xs text-[#F6F2E9] pl-6 border-l-2 border-[#D27230]/40 ml-2">
                    <span className="text-[#D27230] font-mono">Remedy: </span>
                    {tb.remedy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: LAB MANUAL */}
        {activeSection === 'manual' && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
              COURSEWORK ALIGNMENT
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              AIT Laboratory Curriculum Manual
            </h2>
            <div className="p-6 rounded-2xl bg-[#0E1110] border border-[#D8CDB8]/20 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D27230]">
                <FileText className="w-4 h-4" />
                <span>{equipment.labManualReference?.courseCode || 'E&TC Engineering'}</span>
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#F6F2E9]">
                {equipment.labManualReference?.manualTitle}
              </h3>
              <div className="p-3.5 rounded-lg bg-[#141716] border border-[#D8CDB8]/15 text-xs font-mono text-[#D8CDB8] space-y-1.5">
                <div>Experiment: <span className="font-bold text-[#F6F2E9]">{equipment.labManualReference?.experimentNumber} — {equipment.labManualReference?.experimentName}</span></div>
                <div>Section: <span className="text-[#D8CDB8]/80">{equipment.labManualReference?.pageReference}</span></div>
              </div>
              <div className="text-[11px] font-mono text-[#D8CDB8]/60 pt-2 border-t border-white/10 flex items-center justify-between">
                <span>Verified by {equipment.verifiedBy}</span>
                <span className="text-[#589E6E]">OFFICIAL SYLLABUS RECORD</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: AI LAB ASSISTANT */}
        {activeSection === 'ai_assistant' && (
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D27230] uppercase tracking-widest font-bold">
              INTERACTIVE DOSSIER EXPERT
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#F6F2E9]">
              Laboratory AI Assistant
            </h2>
            <AiLabAssistant equipment={equipment} />
          </div>
        )}
      </div>
    </motion.div>
  );
};
