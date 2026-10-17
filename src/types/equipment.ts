export type EquipmentCategory = 
  | 'instrument' 
  | 'ic_component' 
  | 'trainer_kit' 
  | 'sensor' 
  | 'power_supply' 
  | 'passive_component';

export type VerificationStatus = 'verified' | 'unverified' | 'under_review' | 'outdated';

export interface PinOrTerminal {
  number: string;
  name: string;
  type: 'input' | 'output' | 'power' | 'ground' | 'analog' | 'bidirectional';
  voltageLevel?: string;
  description: string;
  hotspotCoordinates?: { x: number; y: number }; // Percentage 0-100 on equipment image
}

export interface OperatingStep {
  step: number;
  title: string;
  instruction: string;
  tip?: string;
  warning?: string;
}

export interface TechnicalSpec {
  property: string;
  value: string;
  unit?: string;
}

export interface SafetyPrecaution {
  severity: 'critical' | 'warning' | 'info';
  text: string;
  rationale?: string;
}

export interface CommonMistake {
  mistake: string;
  consequence: string;
  fix: string;
}

export interface TroubleshootingItem {
  symptom: string;
  probableCause: string;
  remedy: string;
}

export interface RelatedComponent {
  id: string;
  name: string;
  relationType: 'prerequisite' | 'pairs_with' | 'alternative' | 'next_step';
  note: string;
}

export interface LabManualReference {
  manualTitle: string;
  experimentNumber?: string;
  experimentName?: string;
  courseCode?: string;
  pdfUrl?: string;
  pageReference?: string;
  syllabusTopic?: string;
}

export interface InspectionHotspot {
  id: string;
  title: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  description: string;
  categoryTag: string;
}

export interface Equipment {
  id: string;
  assetCode: string; // e.g. "AIT-ENTC-DEL-042"
  name: string;
  shortName: string;
  aliases: string[];
  category: EquipmentCategory;
  model: string;
  manufacturer: string;
  institutionId: string;
  departmentId: string;
  labId: string;
  benchLocation: string;
  status: VerificationStatus;
  lastReviewedDate: string;
  verifiedBy: string;
  reviewerDesignation: string;
  imageUrl: string;
  thumbnailUrl: string;
  
  // Section Content
  overview: string;
  whatIsIt: string;
  purposeAndApplications: string[];
  howItWorks: string;
  whereItIsUsed: string[];
  operatingProcedure: OperatingStep[];
  
  pinoutAndConnections?: {
    diagramType: 'ic_pinout' | 'terminal_panel' | 'front_panel' | 'wiring_diagram';
    packageType?: string; // e.g. "DIP-8", "BNC Panel", "Screw Terminals"
    pins: PinOrTerminal[];
    wiringRules?: string[];
  };
  
  technicalSpecs: TechnicalSpec[];
  safetyPrecautions: SafetyPrecaution[];
  commonMistakes: CommonMistake[];
  troubleshooting: TroubleshootingItem[];
  relatedComponents: RelatedComponent[];
  labManualReference: LabManualReference;
  hotspots?: InspectionHotspot[];
}

export type InfoPanelSection = 
  | 'overview'
  | 'what_is_it'
  | 'purpose'
  | 'how_to_use'
  | 'connections'
  | 'how_it_works'
  | 'where_used'
  | 'specifications'
  | 'precautions'
  | 'mistakes'
  | 'troubleshooting'
  | 'related'
  | 'manual';
