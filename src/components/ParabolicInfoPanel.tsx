import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Equipment, 
  InfoPanelSection,
  SafetyPrecaution
} from '../types/equipment';
import { PinoutDiagram } from './PinoutDiagram';
import { OperatingProcedure } from './OperatingProcedure';
import { AiLabAssistant } from './AiLabAssistant';
import { 
  Compass, 
  HelpCircle, 
  Target, 
  ListOrdered, 
  Cpu, 
  Activity, 
  MapPin, 
  Sliders, 
  ShieldAlert, 
  AlertTriangle, 
  Wrench, 
  Layers, 
  BookMarked, 
  Bot, 
  ArrowLeft, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
  FileText
} from 'lucide-react';

interface ParabolicInfoPanelProps {
  equipment: Equipment;
  activeSection: InfoPanelSection | 'ai_assistant' | null;
  onSelectSection: (section: InfoPanelSection | 'ai_assistant' | null) => void;
  onSelectRelatedEquipment?: (equipmentId: string) => void;
}

interface MenuItemConfig {
  id: InfoPanelSection | 'ai_assistant';
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge?: string;
  relevantOnlyIf?: boolean;
}

export const ParabolicInfoPanel: React.FC<ParabolicInfoPanelProps> = ({
  equipment,
  activeSection,
  onSelectSection,
  onSelectRelatedEquipment
}) => {
  // Define available menu items filtered for this equipment
  const rawMenuItems: MenuItemConfig[] = [
    {
      id: 'overview',
      title: 'Overview',
      tagline: 'High-level purpose and summary',
      icon: Compass,
      color: 'text-lab-accent'
    },
    {
      id: 'what_is_it',
      title: 'What is it?',
      tagline: 'Detailed academic background',
      icon: HelpCircle,
      color: 'text-blue-400'
    },
    {
      id: 'purpose',
      title: 'Purpose & Applications',
      tagline: 'Where and why this is utilized',
      icon: Target,
      color: 'text-emerald-400'
    },
    {
      id: 'how_to_use',
      title: 'How to Use',
      tagline: 'Standard 5-step lab procedure',
      icon: ListOrdered,
      color: 'text-lab-lime',
      badge: `${equipment.operatingProcedure.length} Steps`
    },
    {
      id: 'connections',
      title: 'Connections & Pinout',
      tagline: 'Terminal, BNC & pin configurations',
      icon: Cpu,
      color: 'text-cyan-400',
      relevantOnlyIf: Boolean(equipment.pinoutAndConnections),
      badge: equipment.pinoutAndConnections ? `${equipment.pinoutAndConnections.pins.length} Pins` : undefined
    },
    {
      id: 'how_it_works',
      title: 'How it Works',
      tagline: 'Physical and electronic principles',
      icon: Activity,
      color: 'text-purple-400'
    },
    {
      id: 'where_used',
      title: 'Where it is Used',
      tagline: 'Industry and campus laboratories',
      icon: MapPin,
      color: 'text-pink-400'
    },
    {
      id: 'specifications',
      title: 'Technical Specifications',
      tagline: 'Calibrated ratings and units',
      icon: Sliders,
      color: 'text-amber-400',
      badge: `${equipment.technicalSpecs.length} Specs`
    },
    {
      id: 'precautions',
      title: 'Precautions & Safety',
      tagline: 'Hazard prevention & safety rules',
      icon: ShieldAlert,
      color: 'text-red-400',
      badge: `${equipment.safetyPrecautions.length} Rules`
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      tagline: 'Frequent student errors & fixes',
      icon: AlertTriangle,
      color: 'text-orange-400'
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      tagline: 'Diagnostic symptoms and remedies',
      icon: Wrench,
      color: 'text-teal-400'
    },
    {
      id: 'related',
      title: 'Related Components',
      tagline: 'Complementary devices on bench',
      icon: Layers,
      color: 'text-indigo-400'
    },
    {
      id: 'manual',
      title: 'Lab Manual & References',
      tagline: 'Syllabus alignment and coursework',
      icon: BookMarked,
      color: 'text-sky-400',
      badge: 'AIT Verified'
    },
    {
      id: 'ai_assistant',
      title: 'AI Lab Assistant',
      tagline: 'Interactive Q&A for this instrument',
      icon: Bot,
      color: 'text-lab-accent',
      badge: 'Grounded'
    }
  ];

  const menuItems = rawMenuItems.filter(item => item.relevantOnlyIf !== false);

  // Parabolic trajectory animation variant for the expanded panel
  const parabolicPanelVariants = {
    initial: {
      opacity: 0,
      scale: 0.88,
      x: 35,
      y: 50,
      filter: 'blur(8px)'
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 24,
        mass: 0.9
      }
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      x: 25,
      y: 35,
      filter: 'blur(6px)',
      transition: {
        duration: 0.22,
        ease: 'easeIn'
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <AnimatePresence mode="wait">
        {!activeSection ? (
          /* ======================================================== */
          /* DEFAULT MENU VIEW: Editorial Card Grid with Parabolic Clues */
          /* ======================================================== */
          <motion.div
            key="menu-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {/* Header intro */}
            <div className="p-6 border-b border-lab-border bg-lab-900/40">
              <div className="flex items-center gap-2 text-xs font-mono text-lab-accent mb-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Knowledge Matrix</span>
              </div>
              <h2 className="text-xl font-bold text-slate-100 font-sans">
                Explore Equipment Architecture
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
                Select any module below. The panel expands along a calibrated trajectory with verified specifications, wiring diagrams, and safety guidelines.
              </p>
            </div>

            {/* Menu Cards Scrollable Grid */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {menuItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    layoutId={`menu-card-${item.id}`}
                    onClick={() => onSelectSection(item.id)}
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group text-left p-4 rounded-xl bg-lab-900/60 hover:bg-lab-850/90 border border-lab-border hover:border-lab-accent/40 transition-colors shadow-panel flex flex-col justify-between overflow-hidden"
                  >
                    {/* Subtle Parabolic Arc Guide Path on hover */}
                    <svg className="absolute -right-4 -bottom-4 w-28 h-28 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity">
                      <path
                        d="M 10 90 Q 50 10 90 20"
                        fill="none"
                        stroke="#00F0FF"
                        strokeWidth="1.5"
                        className="parabolic-arc"
                      />
                    </svg>

                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-9 h-9 rounded-lg bg-lab-950 border border-lab-border flex items-center justify-center ${item.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lab-800 text-slate-300 border border-lab-border">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-slate-100 group-hover:text-lab-accent transition-colors flex items-center justify-between">
                        <span>{item.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-lab-accent" />
                      </div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1 font-sans">
                        {item.tagline}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ======================================================== */
          /* EXPANDED PARABOLIC FLOATING PANEL: Full Editorial Content */
          /* ======================================================== */
          <motion.div
            key={`detail-${activeSection}`}
            variants={parabolicPanelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col bg-lab-900/90 backdrop-blur-xl overflow-hidden"
          >
            {/* Top Navigation Bar with Parabolic Curve Clues & Quick Switcher */}
            <div className="p-4 border-b border-lab-border bg-lab-950/70 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onSelectSection(null)}
                  className="flex items-center gap-2 text-xs font-mono font-medium text-slate-300 hover:text-lab-accent transition-colors px-2.5 py-1.5 rounded-lg bg-lab-850 border border-lab-border hover:border-lab-accent/40"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-lab-accent" />
                  <span>Return to Menu</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    AIT Record: <span className="text-slate-200">{equipment.assetCode}</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Horizontal Category Quick Switcher Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {menuItems.map((item) => {
                  const isCurrent = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectSection(item.id)}
                      className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all font-sans flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-lab-accent text-lab-950 font-bold shadow-glow-cyan'
                          : 'bg-lab-900 text-slate-400 hover:text-slate-200 border border-lab-border hover:border-slate-600'
                      }`}
                    >
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Detailed Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* SECTION: OVERVIEW */}
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-lab-accent uppercase tracking-wider">Executive Summary</span>
                    <h3 className="text-xl font-bold text-slate-100 font-sans mt-1">{equipment.name}</h3>
                    <p className="text-sm leading-relaxed text-slate-300 mt-3 font-sans">
                      {equipment.overview}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-lab-950/80 border border-lab-border">
                      <div className="text-xs text-slate-400 font-mono">Model / Architecture</div>
                      <div className="text-sm font-semibold text-slate-200 mt-1">{equipment.model}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-lab-950/80 border border-lab-border">
                      <div className="text-xs text-slate-400 font-mono">Manufacturer</div>
                      <div className="text-sm font-semibold text-slate-200 mt-1">{equipment.manufacturer}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-lab-950/80 border border-lab-border">
                      <div className="text-xs text-slate-400 font-mono">Lab Bench Location</div>
                      <div className="text-sm font-semibold text-slate-200 mt-1">{equipment.benchLocation}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-lab-950/80 border border-lab-border">
                      <div className="text-xs text-slate-400 font-mono">Status & Reviewer</div>
                      <div className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified by {equipment.verifiedBy.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Safety Alert Box */}
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-red-200 font-mono uppercase tracking-wider">
                        Primary Safety Warning
                      </div>
                      <p className="text-xs text-red-300 leading-relaxed">
                        {equipment.safetyPrecautions[0]?.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: WHAT IS IT */}
              {activeSection === 'what_is_it' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">Academic Background</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Core Definition & Technology</h3>
                  <div className="p-4 rounded-xl bg-lab-950/70 border border-lab-border text-sm leading-relaxed text-slate-300 space-y-3 font-sans">
                    <p>{equipment.whatIsIt}</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-lab-900 border border-lab-border text-xs text-slate-400 font-mono flex items-center justify-between">
                    <span>Common Aliases:</span>
                    <span className="text-slate-200 font-sans">{equipment.aliases.join(', ')}</span>
                  </div>
                </div>
              )}

              {/* SECTION: PURPOSE & APPLICATIONS */}
              {activeSection === 'purpose' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Utility & Capabilities</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Key Lab Applications</h3>
                  <div className="space-y-2.5">
                    {equipment.purposeAndApplications.map((app, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-lab-950/70 border border-lab-border flex items-start gap-3">
                        <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs leading-relaxed text-slate-200 font-sans">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: HOW TO USE */}
              {activeSection === 'how_to_use' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-lab-lime uppercase tracking-wider">Standard Operating Checklist</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Step-by-Step Procedure</h3>
                  <OperatingProcedure
                    steps={equipment.operatingProcedure}
                    equipmentName={equipment.name}
                  />
                </div>
              )}

              {/* SECTION: CONNECTIONS & PINOUT */}
              {activeSection === 'connections' && equipment.pinoutAndConnections && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Hardware Interface</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Terminals, BNCs & Pinout</h3>
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
                <div className="space-y-4">
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">Engineering Principle</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Underlying Physics & Circuitry</h3>
                  <div className="p-4 rounded-xl bg-lab-950/80 border border-lab-border text-sm leading-relaxed text-slate-300 space-y-3">
                    <p>{equipment.howItWorks}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-lab-900/60 border border-lab-border flex items-center gap-3">
                    <Activity className="w-5 h-5 text-purple-400 shrink-0" />
                    <div className="text-xs text-slate-300">
                      Understanding internal feedback loops and attenuators helps you avoid circuit loading during measurement.
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: WHERE IT IS USED */}
              {activeSection === 'where_used' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-pink-400 uppercase tracking-wider">Campus & Industry Presence</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Laboratory Deployment Locations</h3>
                  <div className="space-y-2.5">
                    {equipment.whereItIsUsed.map((loc, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-lab-950/70 border border-lab-border flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                        <span className="text-xs font-medium text-slate-200">{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: TECHNICAL SPECIFICATIONS */}
              {activeSection === 'specifications' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Instrument Tolerances</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Technical Specifications Table</h3>
                  <div className="rounded-xl border border-lab-border overflow-hidden bg-lab-950/70">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-lab-900 border-b border-lab-border text-slate-400 font-mono">
                        <tr>
                          <th className="p-3">Parameter</th>
                          <th className="p-3">Calibrated Value</th>
                          <th className="p-3">Unit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-lab-border">
                        {equipment.technicalSpecs.map((spec, i) => (
                          <tr key={i} className="hover:bg-lab-850/50">
                            <td className="p-3 font-medium text-slate-300">{spec.property}</td>
                            <td className="p-3 font-mono font-bold text-lab-accent">{spec.value}</td>
                            <td className="p-3 font-mono text-slate-400">{spec.unit || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SECTION: PRECAUTIONS & SAFETY */}
              {activeSection === 'precautions' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-red-400 uppercase tracking-wider">Safety Protocols</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Mandatory Lab Safety Directives</h3>
                  <div className="space-y-3">
                    {equipment.safetyPrecautions.map((sec, i) => {
                      const isCrit = sec.severity === 'critical';
                      return (
                        <div
                          key={i}
                          className={`p-4 rounded-xl border ${
                            isCrit
                              ? 'bg-red-950/40 border-red-500/40 text-red-100'
                              : 'bg-amber-950/30 border-amber-500/30 text-amber-100'
                          } space-y-1.5`}
                        >
                          <div className="flex items-center gap-2">
                            <ShieldAlert className={`w-4 h-4 ${isCrit ? 'text-red-400' : 'text-amber-400'}`} />
                            <span className="text-xs font-mono uppercase font-bold tracking-wider">
                              {sec.severity} Safety Rule
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed font-semibold">{sec.text}</p>
                          {sec.rationale && (
                            <p className="text-[11px] text-slate-300 opacity-90 italic">
                              Why: {sec.rationale}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION: COMMON MISTAKES */}
              {activeSection === 'mistakes' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">Student Troubleshooting</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Common Mistakes & Quick Fixes</h3>
                  <div className="space-y-3">
                    {equipment.commonMistakes.map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-lab-950/80 border border-lab-border space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>Mistake: {item.mistake}</span>
                        </div>
                        <div className="text-xs text-slate-300">
                          <span className="text-slate-400 font-mono">Consequence: </span>
                          {item.consequence}
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">How to Fix: </span>
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
                <div className="space-y-4">
                  <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">Diagnostics</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Symptom Diagnostic Guide</h3>
                  <div className="space-y-3">
                    {equipment.troubleshooting.map((tb, i) => (
                      <div key={i} className="p-4 rounded-xl bg-lab-950/80 border border-lab-border space-y-2">
                        <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-teal-400" />
                          <span>Symptom: {tb.symptom}</span>
                        </div>
                        <div className="text-xs text-amber-300/90 pl-6">
                          <span className="text-slate-400 font-mono">Probable Cause: </span>
                          {tb.probableCause}
                        </div>
                        <div className="text-xs text-slate-300 pl-6 border-l-2 border-teal-500/40 ml-2">
                          <span className="text-teal-400 font-mono">Remedy: </span>
                          {tb.remedy}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: RELATED COMPONENTS */}
              {activeSection === 'related' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Bench Ecosystem</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Related & Complementary Equipment</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {equipment.relatedComponents.map((rel, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-lab-950/80 border border-lab-border flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-mono text-indigo-400 uppercase">
                            {rel.relationType.replace('_', ' ')}
                          </div>
                          <div className="text-sm font-semibold text-slate-100">{rel.name}</div>
                          <div className="text-xs text-slate-400">{rel.note}</div>
                        </div>
                        {onSelectRelatedEquipment && (
                          <button
                            onClick={() => onSelectRelatedEquipment(rel.id)}
                            className="px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-medium transition-colors shrink-0"
                          >
                            Inspect
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: LAB MANUAL */}
              {activeSection === 'manual' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">Curriculum Alignment</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">College Coursework & Verified Manual</h3>
                  <div className="p-5 rounded-xl bg-lab-950/90 border border-lab-border space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-lab-accent">
                      <FileText className="w-4 h-4" />
                      <span>{equipment.labManualReference?.courseCode || 'E&TC Department'}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-100">
                      {equipment.labManualReference?.manualTitle}
                    </h4>
                    <div className="p-3 rounded-lg bg-lab-900 border border-lab-border text-xs text-slate-300 space-y-1.5 font-mono">
                      <div>Experiment: <span className="text-slate-100 font-semibold">{equipment.labManualReference?.experimentNumber} — {equipment.labManualReference?.experimentName}</span></div>
                      <div>Syllabus Unit: <span className="text-slate-200">{equipment.labManualReference?.syllabusTopic || 'Core Practical Unit'}</span></div>
                      <div>Journal Section: <span className="text-slate-200">{equipment.labManualReference?.pageReference}</span></div>
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-white/5">
                      <div className="text-[11px] text-slate-400 font-mono">
                        Reviewed: {equipment.lastReviewedDate} by {equipment.verifiedBy}
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-medium">
                        Verified Record
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: AI LAB ASSISTANT */}
              {activeSection === 'ai_assistant' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-lab-accent uppercase tracking-wider">Interactive Expert</span>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">Laboratory AI Assistant</h3>
                  <AiLabAssistant equipment={equipment} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
