import React, { useState } from 'react';
import { StorageService } from '../services/storageService';
import { 
  X, 
  Key, 
  Database, 
  Code2, 
  Check, 
  ExternalLink, 
  Copy, 
  FileText, 
  Sparkles,
  HelpCircle,
  Building2,
  Lock
} from 'lucide-react';

interface SetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupGuideModal: React.FC<SetupGuideModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(() => StorageService.getGeminiApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState<'api' | 'supabase' | 'onboarding'>('api');

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    StorageService.setGeminiApiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const supabaseSqlSchema = `-- ========================================================
-- LABLENS POSTGRESQL / SUPABASE DATABASE SCHEMA
-- Campus-Specific Laboratory Equipment Learning Platform
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. INSTITUTIONS TABLE
CREATE TABLE institutions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  campus_location TEXT NOT NULL,
  established INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DEPARTMENTS TABLE
CREATE TABLE departments (
  id TEXT PRIMARY KEY,
  institution_id TEXT REFERENCES institutions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  head_of_department TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LABORATORIES TABLE
CREATE TABLE laboratories (
  id TEXT PRIMARY KEY,
  department_id TEXT REFERENCES departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  short_code TEXT NOT NULL,
  room_number TEXT NOT NULL,
  lab_in_charge TEXT NOT NULL,
  lab_assistant TEXT,
  equipment_count INTEGER DEFAULT 0,
  active_courses TEXT[],
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EQUIPMENT TABLE
CREATE TABLE equipment (
  id TEXT PRIMARY KEY,
  asset_code TEXT UNIQUE NOT NULL, -- e.g. "AIT-ENTC-DEL-042"
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  aliases TEXT[] DEFAULT '{}',
  category TEXT NOT NULL CHECK (category IN ('instrument', 'ic_component', 'trainer_kit', 'sensor', 'power_supply', 'passive_component')),
  model TEXT,
  manufacturer TEXT,
  institution_id TEXT REFERENCES institutions(id),
  department_id TEXT REFERENCES departments(id),
  lab_id TEXT REFERENCES laboratories(id) ON DELETE CASCADE,
  bench_location TEXT NOT NULL,
  status TEXT DEFAULT 'verified' CHECK (status IN ('verified', 'unverified', 'under_review', 'outdated')),
  last_reviewed_date DATE NOT NULL,
  verified_by TEXT NOT NULL,
  reviewer_designation TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  overview TEXT NOT NULL,
  what_is_it TEXT NOT NULL,
  purpose_applications TEXT[],
  how_it_works TEXT NOT NULL,
  where_used TEXT[],
  technical_specs JSONB DEFAULT '[]'::jsonb,
  safety_precautions JSONB DEFAULT '[]'::jsonb,
  common_mistakes JSONB DEFAULT '[]'::jsonb,
  troubleshooting JSONB DEFAULT '[]'::jsonb,
  related_components JSONB DEFAULT '[]'::jsonb,
  manual_reference JSONB DEFAULT '{}'::jsonb,
  hotspots JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. OPERATING PROCEDURES (1-to-many)
CREATE TABLE operating_procedures (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  equipment_id TEXT REFERENCES equipment(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  instruction TEXT NOT NULL,
  tip TEXT,
  warning TEXT
);

-- 6. PINOUT AND TERMINALS
CREATE TABLE pinouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  equipment_id TEXT REFERENCES equipment(id) ON DELETE CASCADE,
  diagram_type TEXT NOT NULL,
  package_type TEXT,
  pin_number TEXT NOT NULL,
  name TEXT NOT NULL,
  pin_type TEXT NOT NULL,
  voltage_level TEXT,
  description TEXT NOT NULL,
  hotspot_x NUMERIC,
  hotspot_y NUMERIC
);

-- 7. DISCREPANCY & STUDENT REPORTS
CREATE TABLE discrepancy_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  equipment_id TEXT REFERENCES equipment(id),
  equipment_name TEXT NOT NULL,
  submitted_by TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  notes TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE laboratories ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE discrepancy_reports ENABLE ROW LEVEL SECURITY;

-- Allow public read access to verified lab curriculum
CREATE POLICY "Public Read Access to Verified Catalog" ON equipment FOR SELECT USING (true);
CREATE POLICY "Public Read Access to Labs" ON laboratories FOR SELECT USING (true);

-- Allow authenticated faculty / lab assistants to insert or edit
CREATE POLICY "Faculty Admin Edit Equipment" ON equipment FOR ALL TO authenticated USING (true);

-- Allow any student to submit discrepancy reports
CREATE POLICY "Students Report Discrepancy" ON discrepancy_reports FOR INSERT WITH CHECK (true);
`;

  const handleCopySql = () => {
    navigator.clipboard?.writeText(supabaseSqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-lab-900 border border-lab-border rounded-2xl shadow-floating p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-lab-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-lab-accent/15 border border-lab-accent/30 flex items-center justify-center text-lab-accent">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 font-sans">
                LABLENS Integration & System Architecture Guide
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Environment variables, Multimodal Vision, Supabase DDL & Onboarding
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-lab-border pb-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('api')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'api'
                ? 'bg-lab-accent text-lab-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Vision Engine & API Key</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'supabase'
                ? 'bg-lab-accent text-lab-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Schema (SQL)</span>
          </button>

          <button
            onClick={() => setActiveTab('onboarding')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'onboarding'
                ? 'bg-lab-accent text-lab-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>College Lab Onboarding</span>
          </button>
        </div>

        {/* TAB 1: VISION ENGINE CONFIGURATION */}
        {activeTab === 'api' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-lab-950/70 border border-lab-border space-y-2">
              <span className="font-bold text-slate-200 font-mono text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lab-accent" />
                Dual-Mode Computer Vision Architecture
              </span>
              <p className="text-slate-300 leading-relaxed font-sans">
                LABLENS features a pluggable provider interface (<code className="text-lab-accent font-mono">IVisionProvider</code>).
                When a live API key is supplied, real-time images are streamed to Google Gemini 1.5/2.0 Flash Vision for deep multimodal component classification. If no key is set, the application operates in <strong>Simulated Edge Demonstration Mode</strong> with zero setup required.
              </p>
            </div>

            {/* In-Browser API Key Input */}
            <div className="p-4 rounded-xl bg-lab-900 border border-lab-accent/30 space-y-3">
              <label className="text-xs font-mono font-bold text-slate-200 flex items-center justify-between">
                <span>Configure Google Gemini API Key (Optional)</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lab-accent hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  Get Free Key from Google AI Studio <ExternalLink className="w-3 h-3" />
                </a>
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-lab-accent"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="px-4 py-2 rounded-lg bg-lab-accent hover:bg-cyan-300 text-lab-950 font-bold font-mono text-xs flex items-center gap-1 transition-all"
                >
                  {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Key className="w-3.5 h-3.5" />}
                  <span>{savedSuccess ? 'Saved!' : 'Save Key'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Keys are stored securely in local browser storage and never transmitted to third-party tracking servers.
              </p>
            </div>

            {/* Environment Variables Reference */}
            <div className="p-4 rounded-xl bg-lab-950 border border-lab-border space-y-2">
              <div className="font-mono text-xs font-bold text-slate-300">
                Environment Variables Reference (<code className="text-lab-lime">.env</code>)
              </div>
              <pre className="p-3 rounded-lg bg-lab-900 text-slate-300 font-mono text-[11px] overflow-x-auto border border-lab-border">
{`# Optional: Real multimodal recognition API
VITE_GEMINI_API_KEY=AIzaSy...

# Optional: Cloud database for cross-device college sync
VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1Ni...`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 2: SUPABASE DATABASE SCHEMA */}
        {activeTab === 'supabase' && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-mono">
                PostgreSQL DDL Schema (Run in Supabase SQL Editor)
              </span>
              <button
                onClick={handleCopySql}
                className="px-3 py-1.5 rounded-lg bg-lab-850 hover:bg-lab-800 text-slate-200 border border-lab-border font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-lab-950 border border-lab-border text-slate-300 font-mono text-[11px] max-h-80 overflow-y-auto leading-relaxed">
              {supabaseSqlSchema}
            </pre>
          </div>
        )}

        {/* TAB 3: COLLEGE LAB ONBOARDING GUIDE */}
        {activeTab === 'onboarding' && (
          <div className="space-y-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-lab-950/70 border border-lab-border space-y-2">
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                How to Onboard Your Actual College Laboratory Inventory
              </h4>
              <p className="text-slate-300 leading-relaxed">
                LABLENS is designed to be populated by authorized faculty and lab assistants. Follow these standard four phases to transition from the seed catalog to live physical inventory:
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-lab-900/60 border border-lab-border space-y-1">
                <div className="text-xs font-bold text-lab-accent font-mono">PHASE 1: Physical Bench Survey & Asset Tagging</div>
                <p className="text-slate-300 text-[11px]">
                  Walk through the laboratory benches (e.g., AIT Academic Block A, Room 204). Assign college asset IDs conforming to the schema: <code className="text-slate-200 font-mono">[INSTITUTION]-[DEPT]-[LAB]-[NUMBER]</code> (e.g. <code className="text-lab-lime font-mono">AIT-ENTC-DEL-042</code>).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-lab-900/60 border border-lab-border space-y-1">
                <div className="text-xs font-bold text-lab-accent font-mono">PHASE 2: Reference Photography & Calibration Specs</div>
                <p className="text-slate-300 text-[11px]">
                  Capture crisp, well-lit front-panel photos of every scope, power supply, and trainer kit against a neutral workbench background. Note all probe BNC connections and fuse ratings.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-lab-900/60 border border-lab-border space-y-1">
                <div className="text-xs font-bold text-lab-accent font-mono">PHASE 3: Lab Manual & Syllabus Linking</div>
                <p className="text-slate-300 text-[11px]">
                  Map each piece of equipment to its respective course syllabus unit, experiment title, and PDF page numbers. Specify terminal limits and voltage thresholds.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-lab-900/60 border border-lab-border space-y-1">
                <div className="text-xs font-bold text-lab-accent font-mono">PHASE 4: Faculty Verification & Review Stamp</div>
                <p className="text-slate-300 text-[11px]">
                  The designated Lab In-Charge (e.g., Dr. P. B. Karandikar) logs in under the "Lab Assistant" or "Faculty Admin" role in the Admin Portal, reviews all drafts, verifies the safety rules, and marks the status as <strong>Verified</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-lab-border flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-lab-850 hover:bg-lab-800 text-slate-200 font-mono text-xs transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
