import React, { useState } from 'react';
import { PinOrTerminal } from '../types/equipment';
import { Zap, ShieldAlert, CheckCircle2, Info } from 'lucide-react';

interface PinoutDiagramProps {
  diagramType: 'ic_pinout' | 'terminal_panel' | 'front_panel' | 'wiring_diagram';
  packageType?: string;
  pins: PinOrTerminal[];
  wiringRules?: string[];
  onPinSelect?: (pin: PinOrTerminal) => void;
}

export const PinoutDiagram: React.FC<PinoutDiagramProps> = ({
  diagramType,
  packageType,
  pins,
  wiringRules,
  onPinSelect
}) => {
  const [selectedPin, setSelectedPin] = useState<PinOrTerminal | null>(pins[0] || null);

  const getTypeColor = (type: PinOrTerminal['type']) => {
    switch (type) {
      case 'power':
        return { bg: 'bg-red-500/10', border: 'border-red-500/40', text: 'text-red-400', badge: 'bg-red-500/20 text-red-300' };
      case 'ground':
        return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' };
      case 'output':
        return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/40', text: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300' };
      case 'input':
        return { bg: 'bg-cyan-500/10', border: 'border-cyan-500/40', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300' };
      case 'analog':
        return { bg: 'bg-purple-500/10', border: 'border-purple-500/40', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' };
      default:
        return { bg: 'bg-slate-500/10', border: 'border-slate-500/40', text: 'text-slate-400', badge: 'bg-slate-500/20 text-slate-300' };
    }
  };

  const handlePinClick = (pin: PinOrTerminal) => {
    setSelectedPin(pin);
    onPinSelect?.(pin);
  };

  return (
    <div className="space-y-6">
      {/* Package Header */}
      <div className="flex items-center justify-between border-b border-lab-border pb-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Configuration</span>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-lab-accent" />
            {packageType || 'Terminal & Pin Specifications'}
          </h4>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-lab-800 border border-lab-border text-slate-300">
          {pins.length} Connection Points
        </span>
      </div>

      {/* Interactive Pin List / Schematic View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
        {pins.map((pin) => {
          const colors = getTypeColor(pin.type);
          const isSelected = selectedPin?.number === pin.number;
          return (
            <button
              key={pin.number}
              onClick={() => handlePinClick(pin)}
              className={`text-left p-3 rounded-lg border transition-all duration-200 flex items-start justify-between ${
                isSelected
                  ? `${colors.bg} ${colors.border} shadow-sm ring-1 ring-lab-accent/50`
                  : 'bg-lab-900/60 border-lab-border hover:border-slate-600 hover:bg-lab-850'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold bg-lab-950 border border-lab-border text-slate-200 shrink-0">
                  {pin.number}
                </span>
                <div>
                  <div className="text-sm font-semibold font-mono text-slate-200">{pin.name}</div>
                  <div className="text-xs text-slate-400 line-clamp-1">{pin.description}</div>
                </div>
              </div>
              <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded font-medium ${colors.badge}`}>
                {pin.type}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Pin Detailed Card */}
      {selectedPin && (
        <div className="p-4 rounded-xl bg-lab-900/90 border border-lab-border/80 shadow-panel space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-lab-accent/10 border border-lab-accent/30 text-lab-accent font-bold">
                PIN / TERMINAL {selectedPin.number}
              </span>
              <span className="text-sm font-semibold text-slate-100">{selectedPin.name}</span>
            </div>
            {selectedPin.voltageLevel && (
              <span className="text-xs font-mono text-lab-lime bg-lab-lime/10 px-2 py-0.5 rounded border border-lab-lime/20">
                {selectedPin.voltageLevel}
              </span>
            )}
          </div>
          <p className="text-xs leading-relaxed text-slate-300">{selectedPin.description}</p>
        </div>
      )}

      {/* Wiring Guidelines */}
      {wiringRules && wiringRules.length > 0 && (
        <div className="p-3.5 rounded-lg bg-lab-900/50 border border-lab-border text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Info className="w-3.5 h-3.5 text-lab-accent" />
            <span>Connection Rules & Best Practices:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
            {wiringRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
