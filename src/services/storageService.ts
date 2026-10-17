import { Equipment } from '../types/equipment';
import { UserProfile, UserRole } from '../types/college';
import { INITIAL_EQUIPMENT_DATABASE } from '../data/equipmentDatabase';
import { DEFAULT_INSTITUTION, DEFAULT_DEPARTMENT, DEFAULT_LAB } from '../data/colleges';

const STORAGE_KEYS = {
  EQUIPMENT: 'lablens_equipment_catalog_v1',
  USER_PROFILE: 'lablens_user_profile_v1',
  SELECTED_LAB: 'lablens_selected_lab_v1',
  GEMINI_KEY: 'lablens_gemini_api_key',
  PROVIDER_TYPE: 'lablens_vision_provider_type',
  DISCREPANCY_REPORTS: 'lablens_discrepancy_reports_v1'
};

export interface DiscrepancyReport {
  id: string;
  equipmentId: string;
  equipmentName: string;
  submittedBy: string;
  submittedAt: string;
  issueType: 'wrong_specs' | 'damaged_hardware' | 'incorrect_procedure' | 'pinout_error' | 'other';
  notes: string;
  status: 'pending' | 'resolved';
}

export class StorageService {
  static getEquipmentCatalog(): Equipment[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EQUIPMENT);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load equipment from localStorage, falling back to seed database', e);
    }
    // Default seed
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(INITIAL_EQUIPMENT_DATABASE));
    return INITIAL_EQUIPMENT_DATABASE;
  }

  static saveEquipmentCatalog(catalog: Equipment[]): void {
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(catalog));
  }

  static resetToDefaultSeed(): Equipment[] {
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(INITIAL_EQUIPMENT_DATABASE));
    return INITIAL_EQUIPMENT_DATABASE;
  }

  static getUserProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading user profile', e);
    }
    const defaultProfile: UserProfile = {
      id: 'student-demo-01',
      name: 'Rohan Sharma (TE E&TC)',
      role: 'student',
      institutionId: DEFAULT_INSTITUTION.id,
      departmentId: DEFAULT_DEPARTMENT.id,
      labId: DEFAULT_LAB.id,
      bookmarkedIds: ['eq-dso-tek', 'eq-ic-ne555'],
      recentScans: [
        {
          equipmentId: 'eq-dso-tek',
          scannedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          thumbnail: INITIAL_EQUIPMENT_DATABASE[0].thumbnailUrl,
          name: INITIAL_EQUIPMENT_DATABASE[0].shortName
        }
      ]
    };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(defaultProfile));
    return defaultProfile;
  }

  static saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }

  static addRecentScan(equipment: Equipment): void {
    const profile = this.getUserProfile();
    const filtered = profile.recentScans.filter(s => s.equipmentId !== equipment.id);
    const updated = [
      {
        equipmentId: equipment.id,
        scannedAt: new Date().toISOString(),
        thumbnail: equipment.thumbnailUrl,
        name: equipment.shortName
      },
      ...filtered
    ].slice(0, 10);
    profile.recentScans = updated;
    this.saveUserProfile(profile);
  }

  static toggleBookmark(equipmentId: string): boolean {
    const profile = this.getUserProfile();
    const index = profile.bookmarkedIds.indexOf(equipmentId);
    let isBookmarked: boolean;
    if (index > -1) {
      profile.bookmarkedIds.splice(index, 1);
      isBookmarked = false;
    } else {
      profile.bookmarkedIds.push(equipmentId);
      isBookmarked = true;
    }
    this.saveUserProfile(profile);
    return isBookmarked;
  }

  static getGeminiApiKey(): string {
    return localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  }

  static setGeminiApiKey(key: string): void {
    localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key.trim());
  }

  static getDiscrepancyReports(): DiscrepancyReport[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DISCREPANCY_REPORTS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  }

  static addDiscrepancyReport(report: Omit<DiscrepancyReport, 'id' | 'submittedAt' | 'status'>): void {
    const list = this.getDiscrepancyReports();
    const newReport: DiscrepancyReport = {
      ...report,
      id: 'rep-' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    list.unshift(newReport);
    localStorage.setItem(STORAGE_KEYS.DISCREPANCY_REPORTS, JSON.stringify(list));
  }
}
