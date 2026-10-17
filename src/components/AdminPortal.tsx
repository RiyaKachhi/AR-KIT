import React, { useState } from 'react';
import { Equipment, EquipmentCategory } from '../types/equipment';
import { UserRole } from '../types/college';
import { StorageService, DiscrepancyReport } from '../services/storageService';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Download, 
  Upload, 
  RotateCcw, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Flag,
  UserCheck,
  Building,
  Save,
  X
} from 'lucide-react';

interface AdminPortalProps {
  catalog: Equipment[];
  userRole: UserRole;
  onUpdateCatalog: (newCatalog: Equipment[]) => void;
  onChangeRole: (newRole: UserRole) => void;
  onSelectEquipment: (equipment: Equipment) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  catalog,
  userRole,
  onUpdateCatalog,
  onChangeRole,
  onSelectEquipment
}) => {
  const [reports, setReports] = useState<DiscrepancyReport[]>(() => StorageService.getDiscrepancyReports());
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formAssetCode, setFormAssetCode] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formManufacturer, setFormManufacturer] = useState('');
  const [formCategory, setFormCategory] = useState<EquipmentCategory>('instrument');
  const [formOverview, setFormOverview] = useState('');
  const [formBench, setFormBench] = useState('');
  const [formVerifiedBy, setFormVerifiedBy] = useState('Dr. P. B. Karandikar');

  const startEdit = (item: Equipment) => {
    setEditingItem(item);
    setIsCreating(false);
    setFormName(item.name);
    setFormAssetCode(item.assetCode);
    setFormModel(item.model);
    setFormManufacturer(item.manufacturer);
    setFormCategory(item.category);
    setFormOverview(item.overview);
    setFormBench(item.benchLocation);
    setFormVerifiedBy(item.verifiedBy);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormName('');
    setFormAssetCode(`AIT-ENTC-DEL-${Math.floor(100 + Math.random() * 900)}`);
    setFormModel('');
    setFormManufacturer('');
    setFormCategory('instrument');
    setFormOverview('');
    setFormBench('Bench 5, Rack C');
    setFormVerifiedBy('Dr. P. B. Karandikar (Faculty In-Charge)');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAssetCode.trim()) return;

    let updatedList: Equipment[];

    if (isCreating) {
      const newItem: Equipment = {
        id: 'eq-custom-' + Date.now(),
        assetCode: formAssetCode,
        name: formName,
        shortName: formName.split(' ')[0] + ' ' + (formModel || 'Unit'),
        aliases: [formName, formModel],
        category: formCategory,
        model: formModel,
        manufacturer: formManufacturer || 'Standard Lab Equipment',
        institutionId: 'ait-pune',
        departmentId: 'dept-entc',
        labId: 'lab-entc-del',
        benchLocation: formBench,
        status: 'verified',
        lastReviewedDate: new Date().toISOString().split('T')[0],
        verifiedBy: formVerifiedBy,
        reviewerDesignation: 'Faculty Laboratory In-Charge',
        imageUrl: catalog[0].imageUrl,
        thumbnailUrl: catalog[0].thumbnailUrl,
        overview: formOverview || 'Standard laboratory hardware unit cataloged for student practicals.',
        whatIsIt: formOverview,
        purposeAndApplications: ['General undergraduate circuit characterization.'],
        howItWorks: 'Standard electronic operating principles.',
        whereItIsUsed: ['Digital Electronics & Embedded Systems Lab'],
        operatingProcedure: [
          { step: 1, title: 'Visual Inspection', instruction: 'Inspect terminals for physical integrity before powering.' }
        ],
        technicalSpecs: [
          { property: 'Operating Condition', value: 'Verified Bench Spec', unit: '' }
        ],
        safetyPrecautions: [
          { severity: 'critical', text: 'Always confirm power switch is OFF before wiring breadboards.' }
        ],
        commonMistakes: [
          { mistake: 'Reversing polarity', consequence: 'Component overload', fix: 'Check Ground terminal first.' }
        ],
        troubleshooting: [
          { symptom: 'No power', probableCause: 'Blown fuse', remedy: 'Consult lab assistant' }
        ],
        relatedComponents: [],
        labManualReference: {
          manualTitle: 'AIT E&TC Laboratory Manual (2026 Edition)',
          experimentNumber: 'Exp 01',
          experimentName: 'Standard Instrument Familiarization'
        }
      };
      updatedList = [newItem, ...catalog];
    } else if (editingItem) {
      updatedList = catalog.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            name: formName,
            assetCode: formAssetCode,
            model: formModel,
            manufacturer: formManufacturer,
            category: formCategory,
            overview: formOverview,
            benchLocation: formBench,
            verifiedBy: formVerifiedBy,
            lastReviewedDate: new Date().toISOString().split('T')[0]
          };
        }
        return item;
      });
    } else {
      return;
    }

    StorageService.saveEquipmentCatalog(updatedList);
    onUpdateCatalog(updatedList);
    setEditingItem(null);
    setIsCreating(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(catalog, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `lablens_inventory_ait_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          StorageService.saveEquipmentCatalog(parsed);
          onUpdateCatalog(parsed);
          alert(`Successfully imported ${parsed.length} equipment records.`);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetSeed = () => {
    if (confirm('Reset entire catalog to default verified seed inventory for AIT Pune?')) {
      const reset = StorageService.resetToDefaultSeed();
      onUpdateCatalog(reset);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0E1110] text-[#F6F2E9] p-6 max-w-7xl mx-auto space-y-6 paper-laid">
      
      {/* Top Banner: Role Selection & Authorization Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D8CDB8]/15 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D27230] uppercase tracking-widest mb-1 font-bold">
            <UserCheck className="w-4 h-4" />
            <span>FACULTY & LABORATORY GOVERNANCE</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F6F2E9]">
            Inventory & Records Administration
          </h1>
          <p className="text-xs sm:text-sm text-[#D8CDB8]/70 mt-1 max-w-xl font-sans leading-relaxed">
            Manage college equipment inventories, verify specifications, review student discrepancy reports, and export laboratory schemas.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2 bg-[#141716] p-1.5 rounded-xl border border-[#D8CDB8]/20">
          <span className="text-xs font-mono text-[#D8CDB8]/60 px-2">Active Role:</span>
          <button
            onClick={() => onChangeRole('student')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors uppercase tracking-wider ${
              userRole === 'student' ? 'bg-[#D27230] text-[#121514] font-bold shadow-sm' : 'text-[#D8CDB8]/60 hover:text-white'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => onChangeRole('lab_assistant')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors uppercase tracking-wider ${
              userRole === 'lab_assistant' ? 'bg-[#589E6E] text-[#121514] font-bold shadow-sm' : 'text-[#D8CDB8]/60 hover:text-white'
            }`}
          >
            Lab Assistant
          </button>
          <button
            onClick={() => onChangeRole('faculty_admin')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors uppercase tracking-wider ${
              userRole === 'faculty_admin' ? 'bg-[#9E4224] text-[#F6F2E9] font-bold shadow-sm' : 'text-[#D8CDB8]/60 hover:text-white'
            }`}
          >
            Faculty Admin
          </button>
        </div>
      </div>

      {/* Control Actions Row: Add Equipment, Export, Import, Reset */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-xl bg-[#141716] border border-[#D8CDB8]/20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={startCreate}
            className="px-4 py-2 rounded-lg bg-[#D27230] hover:bg-[#C45630] text-[#121514] font-bold font-mono text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Equipment</span>
          </button>
          <button
            onClick={handleExportJson}
            className="px-3 py-2 rounded-lg bg-[#0E1110] hover:bg-white/5 text-[#D8CDB8] border border-[#D8CDB8]/20 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-lab-accent" />
            <span>Export JSON</span>
          </button>
          <label className="px-3 py-2 rounded-lg bg-lab-850 hover:bg-lab-800 text-slate-200 border border-lab-border text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>
        </div>

        <button
          onClick={handleResetSeed}
          className="px-3 py-2 rounded-lg bg-lab-850 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-lab-border hover:border-red-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Default Seed</span>
        </button>
      </div>

      {/* Student Discrepancy Reports Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200 font-mono uppercase tracking-wider">
              Student Hardware Discrepancy Reports ({reports.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Pending Faculty Review
          </span>
        </div>

        {reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reports.map((rep) => (
              <div key={rep.id} className="p-4 rounded-xl bg-lab-900/60 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 font-mono">{rep.equipmentName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                    {rep.issueType.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic">"{rep.notes}"</p>
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-lab-border">
                  <span>Reported by: {rep.submittedBy}</span>
                  <span>{new Date(rep.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-lab-900/30 border border-lab-border text-xs text-slate-400 font-mono text-center">
            No pending student discrepancies reported. All equipment operational.
          </div>
        )}
      </div>

      {/* College Equipment Records Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-lab-accent" />
            <h3 className="text-sm font-bold text-slate-200 font-mono uppercase tracking-wider">
              AIT Laboratory Asset Records ({catalog.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Schema</span>
          </span>
        </div>

        <div className="rounded-xl border border-lab-border overflow-hidden bg-lab-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-lab-900 border-b border-lab-border text-slate-400 font-mono">
                <tr>
                  <th className="p-3">Asset ID</th>
                  <th className="p-3">Equipment Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Bench Station</th>
                  <th className="p-3">Verified By</th>
                  <th className="p-3">Last Reviewed</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lab-border">
                {catalog.map((item) => (
                  <tr key={item.id} className="hover:bg-lab-850/50">
                    <td className="p-3 font-mono font-bold text-lab-accent">{item.assetCode}</td>
                    <td className="p-3 font-semibold text-slate-200">{item.name}</td>
                    <td className="p-3 font-mono uppercase text-slate-400 text-[11px]">
                      {item.category.replace('_', ' ')}
                    </td>
                    <td className="p-3 text-slate-300 font-mono text-[11px]">{item.benchLocation}</td>
                    <td className="p-3 text-emerald-400 font-mono text-[11px]">{item.verifiedBy}</td>
                    <td className="p-3 text-slate-400 font-mono text-[11px]">{item.lastReviewedDate}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-1.5 rounded-lg bg-lab-850 hover:bg-lab-800 text-slate-300 hover:text-lab-accent border border-lab-border transition-colors"
                          title="Edit Equipment Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onSelectEquipment(item)}
                          className="px-2 py-1 rounded-lg bg-lab-accent/10 hover:bg-lab-accent/20 text-lab-accent border border-lab-accent/30 font-mono text-[11px] transition-colors"
                        >
                          Inspect
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Editor Modal for Adding / Modifying Equipment */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-lab-900 border border-lab-border rounded-2xl shadow-floating p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-lab-border pb-3">
              <h3 className="text-base font-bold text-slate-100 font-sans">
                {isCreating ? 'Add New Laboratory Hardware' : `Edit: ${editingItem?.name}`}
              </h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono">College Asset ID</label>
                  <input
                    type="text"
                    value={formAssetCode}
                    onChange={(e) => setFormAssetCode(e.target.value)}
                    required
                    className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-lab-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono">Component Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-lab-accent"
                  >
                    <option value="instrument">Instrument / Scope</option>
                    <option value="ic_component">Integrated Circuit (IC)</option>
                    <option value="power_supply">Power Supply</option>
                    <option value="trainer_kit">Trainer / MCU Kit</option>
                    <option value="sensor">Sensor / Transducer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-mono">Equipment Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Tektronix TBS1052B-EDU Oscilloscope"
                  required
                  className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-sans focus:border-lab-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono">Model / Architecture</label>
                  <input
                    type="text"
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    placeholder="e.g. 50MHz, 2-Channel 1GS/s"
                    className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-lab-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono">Manufacturer</label>
                  <input
                    type="text"
                    value={formManufacturer}
                    onChange={(e) => setFormManufacturer(e.target.value)}
                    placeholder="e.g. Tektronix / Keysight"
                    className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-lab-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono">Bench Physical Location</label>
                  <input
                    type="text"
                    value={formBench}
                    onChange={(e) => setFormBench(e.target.value)}
                    placeholder="e.g. Bench 4, Rack A"
                    className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-lab-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono">Responsible Reviewer</label>
                  <input
                    type="text"
                    value={formVerifiedBy}
                    onChange={(e) => setFormVerifiedBy(e.target.value)}
                    className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-lab-accent"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-mono">Overview & Pedagogical Summary</label>
                <textarea
                  value={formOverview}
                  onChange={(e) => setFormOverview(e.target.value)}
                  rows={3}
                  placeholder="Explain what the equipment does for engineering students..."
                  className="w-full bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-sans focus:border-lab-accent"
                />
              </div>

              <div className="pt-3 border-t border-lab-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-lab-850 hover:bg-lab-800 text-slate-300 font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-lab-accent hover:bg-cyan-300 text-lab-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
