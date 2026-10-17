import React, { useState } from 'react';
import { Equipment } from '../types/equipment';
import { StorageService } from '../services/storageService';
import { X, Flag, CheckCircle2 } from 'lucide-react';

interface ReportIssueModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  equipment,
  isOpen,
  onClose
}) => {
  const [issueType, setIssueType] = useState<'wrong_specs' | 'damaged_hardware' | 'incorrect_procedure' | 'pinout_error' | 'other'>('damaged_hardware');
  const [studentName, setStudentName] = useState('Rohan Sharma (TE E&TC)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !equipment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    StorageService.addDiscrepancyReport({
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      submittedBy: studentName,
      issueType,
      notes
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setNotes('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-lab-900 border border-lab-border rounded-2xl shadow-floating p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-lab-border pb-3">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-bold text-slate-100 font-sans">
              Report Equipment Discrepancy
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold text-slate-100">Discrepancy Report Submitted</h4>
            <p className="text-xs text-slate-400">
              Lab Assistant & Faculty In-Charge have been notified for bench inspection.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <span className="text-slate-400 font-mono text-[11px]">Equipment Unit:</span>
              <div className="font-bold text-slate-200 mt-0.5">
                {equipment.name} ({equipment.assetCode})
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-mono">Discrepancy Category</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as any)}
                className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-lab-accent"
              >
                <option value="damaged_hardware">Damaged / Malfunctioning Hardware on Bench</option>
                <option value="pinout_error">Incorrect Pinout or Wiring Diagram</option>
                <option value="wrong_specs">Outdated / Inaccurate Technical Specs</option>
                <option value="incorrect_procedure">Procedure Conflict with College Lab Manual</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-mono">Reported By</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-lab-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-mono">Detailed Observations</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
                rows={3}
                placeholder="Explain what is broken, incorrect, or missing..."
                className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 focus:border-lab-accent"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-lab-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-lab-850 hover:bg-lab-800 text-slate-300 font-mono text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs shadow-sm"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
