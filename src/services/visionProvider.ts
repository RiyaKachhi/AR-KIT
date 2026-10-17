import { IVisionProvider, RecognitionResult, VisionProviderType, AlternateMatch } from '../types/recognition';
import { Equipment } from '../types/equipment';

export class SimulatedVisionProvider implements IVisionProvider {
  name = 'LABLENS Edge Vision Engine (Simulated Demo)';
  type: VisionProviderType = 'simulated';
  isConfigured = true;

  constructor(private equipmentDatabase: Equipment[]) {}

  async identifyEquipment(
    imageBase64: string,
    contextLabId?: string,
    onProgress?: (stage: string) => void
  ): Promise<RecognitionResult> {
    onProgress?.('Initializing camera frame analysis...');
    await new Promise((r) => setTimeout(r, 600));

    onProgress?.('Extracting edge contours and optical character markers...');
    await new Promise((r) => setTimeout(r, 700));

    onProgress?.('Matching against localized college equipment database...');
    await new Promise((r) => setTimeout(r, 600));

    // Analyze image cues or fallback heuristics:
    // Check if the image string contains hints or check context lab
    const labFiltered = contextLabId 
      ? this.equipmentDatabase.filter(e => e.labId === contextLabId)
      : this.equipmentDatabase;
    
    const candidates = labFiltered.length > 0 ? labFiltered : this.equipmentDatabase;

    // Check if image data matches any specific sample
    let matchedItem: Equipment | undefined;

    if (imageBase64.includes('Tektronix') || imageBase64.includes('TBS1052') || imageBase64.includes('dso')) {
      matchedItem = this.equipmentDatabase.find(e => e.id === 'eq-dso-tek');
    } else if (imageBase64.includes('Keysight') || imageBase64.includes('33220A') || imageBase64.includes('Function Gen')) {
      matchedItem = this.equipmentDatabase.find(e => e.id === 'eq-fg-keysight');
    } else if (imageBase64.includes('Scientific') || imageBase64.includes('PSD3304') || imageBase64.includes('Power Supply')) {
      matchedItem = this.equipmentDatabase.find(e => e.id === 'eq-rps-scientific');
    } else if (imageBase64.includes('Fluke') || imageBase64.includes('115') || imageBase64.includes('Multimeter')) {
      matchedItem = this.equipmentDatabase.find(e => e.id === 'eq-dmm-fluke');
    } else if (imageBase64.includes('NE555') || imageBase64.includes('555') || imageBase64.includes('Timer IC')) {
      matchedItem = this.equipmentDatabase.find(e => e.id === 'eq-ic-ne555');
    } else if (imageBase64.includes('ESP32') || imageBase64.includes('ESP-WROOM-32')) {
      matchedItem = this.equipmentDatabase.find(e => e.id === 'eq-esp32-devkit');
    } else if (imageBase64.includes('7408') || imageBase64.includes('74LS08') || imageBase64.includes('AND')) {
      matchedItem = this.equipmentDatabase.find(e => e.id === 'eq-ic-7408');
    } else if (imageBase64.includes('LVDT') || imageBase64.includes('Displacement')) {
      matchedItem = this.equipmentDatabase.find(e => e.id === 'eq-sensor-lvdt');
    }

    // If still undefined, pick top item for the current lab or default DSO
    if (!matchedItem) {
      matchedItem = candidates[0] || this.equipmentDatabase[0];
    }

    // Build alternate matches for confirmation UI
    const alternates: AlternateMatch[] = this.equipmentDatabase
      .filter(e => e.id !== matchedItem?.id)
      .slice(0, 3)
      .map((e, idx) => ({
        equipmentId: e.id,
        name: e.name,
        confidence: Math.round((0.68 - idx * 0.15) * 100) / 100,
        category: e.category,
        reason: `Secondary correlation with ${e.category} visual profile`
      }));

    // Bounding box localized around the equipment
    const boundingBox = {
      x: 12,
      y: 10,
      width: 76,
      height: 80
    };

    const detectedFeatures = [
      'Front panel layout matches catalog silhouette',
      `Identified ${matchedItem.manufacturer} chassis branding markers`,
      'Primary control knobs and terminal array registered',
      'Asset tag format matches AIT Pune laboratory inventory schema'
    ];

    return {
      equipmentId: matchedItem.id,
      matchedEquipmentName: matchedItem.name,
      confidence: 0.94,
      boundingBox,
      detectedFeatures,
      isSimulated: true,
      provider: 'simulated',
      alternateMatches: alternates,
      rawAnalysisNotes: `Demonstration recognition: Component successfully mapped to localized AIT Pune catalog record (${matchedItem.assetCode}). Simulated confidence 94.2%.`,
      suggestedAction: 'confirm',
      capturedImageBase64: imageBase64
    };
  }
}

export class GeminiVisionProvider implements IVisionProvider {
  name = 'Google Gemini Vision AI (Live Cloud API)';
  type: VisionProviderType = 'gemini_vision';

  constructor(
    private apiKey: string,
    private equipmentDatabase: Equipment[]
  ) {}

  get isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 10);
  }

  async identifyEquipment(
    imageBase64: string,
    contextLabId?: string,
    onProgress?: (stage: string) => void
  ): Promise<RecognitionResult> {
    if (!this.isConfigured) {
      throw new Error('Gemini API key is not configured. Please enter your key in settings or use the Simulated Vision Engine.');
    }

    onProgress?.('Uploading camera frame to Gemini 1.5 Flash Vision...');
    
    // Strip data:image/...;base64, prefix if present
    const base64Data = imageBase64.includes('base64,') 
      ? imageBase64.split('base64,')[1] 
      : imageBase64;

    const catalogPrompt = this.equipmentDatabase.map(e => 
      `- ID: "${e.id}", Name: "${e.name}", Aliases: [${e.aliases.join(', ')}], Category: "${e.category}"`
    ).join('\n');

    const prompt = `You are the visual equipment recognition system for LABLENS in an engineering college laboratory.
Examine this image captured by an engineering student and identify which lab equipment or electronic component it is.
Here is the localized laboratory inventory:
${catalogPrompt}

Respond ONLY with valid JSON in this exact structure:
{
  "matchedEquipmentId": "one of the IDs from the list above, or null if unknown",
  "matchedEquipmentName": "string name",
  "confidence": 0.0 to 1.0,
  "detectedFeatures": ["feature 1", "feature 2", "feature 3"],
  "analysisNotes": "Short 1-2 sentence technical rationale",
  "boundingBox": { "x": percentage 0-100, "y": percentage 0-100, "width": percentage 0-100, "height": percentage 0-100 }
}`;

    onProgress?.('Awaiting multimodal recognition inference...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: 'image/jpeg',
                    data: base64Data
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            response_mime_type: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini Vision API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error('Empty response received from vision model');
    }

    let parsed: any;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      throw new Error('Could not parse JSON from Gemini response: ' + rawText.slice(0, 100));
    }

    const matchedEquipment = this.equipmentDatabase.find(e => e.id === parsed.matchedEquipmentId);

    const alternates: AlternateMatch[] = this.equipmentDatabase
      .filter(e => e.id !== parsed.matchedEquipmentId)
      .slice(0, 3)
      .map(e => ({
        equipmentId: e.id,
        name: e.name,
        confidence: 0.45,
        category: e.category,
        reason: 'Secondary catalog match'
      }));

    return {
      equipmentId: matchedEquipment ? matchedEquipment.id : null,
      matchedEquipmentName: matchedEquipment ? matchedEquipment.name : parsed.matchedEquipmentName || 'Unrecognized Component',
      confidence: parsed.confidence || 0.85,
      boundingBox: parsed.boundingBox || { x: 15, y: 15, width: 70, height: 70 },
      detectedFeatures: parsed.detectedFeatures || ['Visual match detected by neural vision model'],
      isSimulated: false,
      provider: 'gemini_vision',
      alternateMatches: alternates,
      rawAnalysisNotes: parsed.analysisNotes || 'Identified via live Gemini Vision API model.',
      suggestedAction: parsed.confidence > 0.7 ? 'confirm' : 'manual_search',
      capturedImageBase64: imageBase64
    };
  }
}
