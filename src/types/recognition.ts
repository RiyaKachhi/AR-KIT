export type VisionProviderType = 'simulated' | 'gemini_vision' | 'custom_api';

export interface BoundingBox {
  x: number;      // 0 to 100 (% of image width)
  y: number;      // 0 to 100 (% of image height)
  width: number;  // 0 to 100 (% of image width)
  height: number; // 0 to 100 (% of image height)
}

export interface AlternateMatch {
  equipmentId: string;
  name: string;
  confidence: number; // 0 to 1
  category: string;
  reason: string;
}

export interface RecognitionResult {
  equipmentId: string | null;
  matchedEquipmentName: string;
  confidence: number; // 0 to 1 (e.g. 0.94)
  boundingBox: BoundingBox;
  detectedFeatures: string[];
  isSimulated: boolean;
  provider: VisionProviderType;
  alternateMatches: AlternateMatch[];
  rawAnalysisNotes: string;
  suggestedAction?: 'confirm' | 'retake' | 'manual_search';
  capturedImageBase64?: string;
}

export interface IVisionProvider {
  name: string;
  type: VisionProviderType;
  isConfigured: boolean;
  identifyEquipment: (
    imageBase64: string, 
    contextLabId?: string,
    onProgress?: (stage: string) => void
  ) => Promise<RecognitionResult>;
}
