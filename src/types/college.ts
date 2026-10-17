export interface Institution {
  id: string;
  name: string;
  shortName: string;
  campusLocation: string;
  established: number;
  departments: Department[];
}

export interface Department {
  id: string;
  institutionId: string;
  name: string;
  code: string; // e.g. "ENTC"
  laboratories: Laboratory[];
}

export interface Laboratory {
  id: string;
  departmentId: string;
  name: string;
  shortCode: string;
  roomNumber: string;
  labInCharge: string;
  labAssistant: string;
  equipmentCount: number;
  activeCourses: string[];
  description: string;
}

export type UserRole = 'student' | 'lab_assistant' | 'faculty_admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  institutionId: string;
  departmentId: string;
  labId: string;
  bookmarkedIds: string[];
  recentScans: {
    equipmentId: string;
    scannedAt: string;
    thumbnail: string;
    name: string;
  }[];
}
