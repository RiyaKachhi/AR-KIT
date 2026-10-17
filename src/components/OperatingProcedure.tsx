import React, { useState } from 'react';
import { OperatingStep } from '../types/equipment';
import { CheckCircle2, Circle, AlertTriangle, Lightbulb, Play } from 'lucide-react';

interface OperatingProcedureProps {
  steps: OperatingStep[];
  equipmentName: string;
}

export const OperatingProcedure: React.FC<OperatingProcedureProps> = ({ steps, equipmentName }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber) 
        : [...prev, stepNumber]
    );
  };

  const progressPercent = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="space-y-5">
      {/* Progress Tracker */}
      <div className="p-3.5 rounded-xl bg-lab-900/60 border border-lab-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lab-accent/10 border border-lab-accent/30 flex items-center justify-center text-lab-accent">
            <Play className="w-4 h-4 fill-lab-accent" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Standard Operating Checklist</div>
            <div className="text-sm font-semibold text-slate-200">
              {completedSteps.length} of {steps.length} steps completed
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-24 h-2 bg-lab-800 rounded-full overflow-hidden border border-lab-border">
            <div 
              className="h-full bg-gradient-to-r from-lab-accent to-lab-lime transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-lab-accent min-w-[2.5rem] text-right">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step) => {
          const isDone = completedSteps.includes(step.step);
          return (
            <div
              key={step.step}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                isDone 
                  ? 'bg-lab-950/70 border-emerald-500/30 opacity-75' 
                  : 'bg-lab-900/80 border-lab-border hover:border-slate-600'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleStep(step.step)}
                  className="mt-0.5 text-slate-400 hover:text-lab-accent transition-colors shrink-0"
                  aria-label={isDone ? `Mark step ${step.step} incomplete` : `Mark step ${step.step} complete`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-lab-800 text-lab-accent border border-lab-border">
                      STEP {step.step}
                    </span>
                    <h4 className={`text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {step.instruction}
                  </p>

                  {/* Warning Callout */}
                  {step.warning && (
                    <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 flex items-start gap-2 text-xs text-red-200">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{step.warning}</span>
                    </div>
                  )}

                  {/* Lab Tip */}
                  {step.tip && (
                    <div className="p-2.5 rounded-lg bg-lab-lime/5 border border-lab-lime/20 flex items-start gap-2 text-xs text-slate-300">
                      <Lightbulb className="w-4 h-4 text-lab-lime shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-lab-lime">Lab Assistant Tip: </span>
                        {step.tip}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
