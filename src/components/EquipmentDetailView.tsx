import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Equipment, InfoPanelSection } from '../types/equipment';
import { RecognitionResult } from '../types/recognition';
import { SpecimenImagePanel } from './SpecimenImagePanel';
import { EquipmentSectionIndex } from './EquipmentSectionIndex';
import { CurvedInfoSheet } from './CurvedInfoSheet';
import { StorageService } from '../services/storageService';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Flag, 
  Check, 
  Sparkles,
  Building2
} from 'lucide-react';

interface EquipmentDetailViewProps {
  equipment: Equipment;
  recognitionResult?: RecognitionResult | null;
  capturedImage?: string | null;
  onBack: () => void;
  onSelectRelatedEquipment?: (equipmentId: string) => void;
  onReportIssue?: (equipment: Equipment) => void;
}

export const EquipmentDetailView: React.FC<EquipmentDetailViewProps> = ({
  equipment,
  recognitionResult,
  capturedImage,
  onBack,
  onSelectRelatedEquipment,
  onReportIssue
}) => {
  const [activeSection, setActiveSection] = useState<InfoPanelSection | 'ai_assistant' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const profile = StorageService.getUserProfile();
    return profile.bookmarkedIds.includes(equipment.id);
  });
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleBookmark = () => {
    const next = StorageService.toggleBookmark(equipment.id);
    setIsBookmarked(next);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-4rem)] flex flex-col bg-[#0E1110] text-[#F6F2E9] overflow-hidden">
      {/* Top Ledger Breadcrumb Bar */}
      <div className="h-12 px-6 border-b border-[#D8CDB8]/15 bg-[#141716]/90 backdrop-blur-md flex items-center justify-between shrink-0 z-20 font-mono text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[#D8CDB8] hover:text-[#D27230] transition-colors px-2.5 py-1 rounded-md bg-[#0E1110] border border-[#D8CDB8]/20"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#D27230]" />
            <span>Archive Index</span>
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-[#D8CDB8]/60">AIT Pune // E&TC</span>
            <span className="text-white/20">/</span>
            <span className="font-bold text-[#F6F2E9]">{equipment.assetCode}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {recognitionResult && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D27230]/15 border border-[#D27230]/30 text-[11px] text-[#D27230]">
              <Sparkles className="w-3 h-3" />
              <span>Identified: {Math.round(recognitionResult.confidence * 100)}%</span>
            </div>
          )}

          <button
            onClick={toggleBookmark}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Dossier'}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-[#D27230]/20 border-[#D27230]/50 text-[#D27230]'
                : 'bg-[#0E1110] border-[#D8CDB8]/20 text-[#D8CDB8]/60 hover:text-white'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            title="Share Dossier Link"
            className="p-1.5 rounded-lg bg-[#0E1110] border border-[#D8CDB8]/20 text-[#D8CDB8]/60 hover:text-white transition-colors"
          >
            {copiedLink ? <Check className="w-4 h-4 text-[#589E6E]" /> : <Share2 className="w-4 h-4" />}
          </button>

          {onReportIssue && (
            <button
              onClick={() => onReportIssue(equipment)}
              title="Report Hardware Discrepancy"
              className="px-2.5 py-1 rounded-lg bg-[#0E1110] hover:bg-[#73221E]/20 text-[#D8CDB8]/70 hover:text-[#C43D30] border border-[#D8CDB8]/20 hover:border-[#C43D30]/40 flex items-center gap-1 transition-colors"
            >
              <Flag className="w-3 h-3" />
              <span className="hidden md:inline">Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 50/50 Split Layout Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Half: Archival Specimen Photograph */}
        <SpecimenImagePanel
          equipment={equipment}
          capturedImage={capturedImage}
          recognitionResult={recognitionResult}
          onSelectHotspotCategory={(cat) => setActiveSection(cat as any)}
        />

        {/* Right Half: Labeled File Dividers OR Pulled Curved Info Sheet */}
        <div className="relative flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {!activeSection ? (
              <EquipmentSectionIndex
                key="section-index"
                equipment={equipment}
                onSelectSection={(sec) => setActiveSection(sec)}
              />
            ) : (
              <CurvedInfoSheet
                key={`curved-sheet-${activeSection}`}
                equipment={equipment}
                activeSection={activeSection}
                onClose={() => setActiveSection(null)}
                onSelectSection={(sec) => setActiveSection(sec)}
                onSelectRelatedEquipment={onSelectRelatedEquipment}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
