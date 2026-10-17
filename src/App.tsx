import React, { useState, useEffect } from 'react';
import { Equipment } from './types/equipment';
import { Institution, Department, Laboratory, UserProfile, UserRole } from './types/college';
import { RecognitionResult } from './types/recognition';
import { INSTITUTIONS, DEFAULT_INSTITUTION, DEFAULT_DEPARTMENT, DEFAULT_LAB } from './data/colleges';
import { StorageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { ArchiveHome } from './components/ArchiveHome';
import { ScannerView } from './components/ScannerView';
import { EquipmentDetailView } from './components/EquipmentDetailView';
import { EquipmentLibrary } from './components/EquipmentLibrary';
import { AdminPortal } from './components/AdminPortal';
import { SetupGuideModal } from './components/SetupGuideModal';
import { ReportIssueModal } from './components/ReportIssueModal';

export const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'scanner' | 'library' | 'splitscreen' | 'admin'>('home');

  // Institution & Laboratory Hierarchy
  const [institution, setInstitution] = useState<Institution>(DEFAULT_INSTITUTION);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(DEFAULT_DEPARTMENT);
  const [selectedLab, setSelectedLab] = useState<Laboratory>(DEFAULT_LAB);

  // Equipment Catalog & User Profile
  const [catalog, setCatalog] = useState<Equipment[]>(() => StorageService.getEquipmentCatalog());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => StorageService.getUserProfile());

  // Active Selected Equipment for Split Screen
  const [activeEquipment, setActiveEquipment] = useState<Equipment | null>(null);
  const [activeRecognitionResult, setActiveRecognitionResult] = useState<RecognitionResult | null>(null);
  const [activeCapturedImage, setActiveCapturedImage] = useState<string | null>(null);

  // Modals
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(false);
  const [reportingEquipment, setReportingEquipment] = useState<Equipment | null>(null);

  // Synchronize department when institution changes
  const handleSelectDepartment = (deptId: string) => {
    const dept = institution.departments.find(d => d.id === deptId);
    if (dept) {
      setSelectedDepartment(dept);
      if (dept.laboratories.length > 0) {
        setSelectedLab(dept.laboratories[0]);
      }
    }
  };

  const handleSelectLab = (labId: string) => {
    const lab = selectedDepartment.laboratories.find(l => l.id === labId);
    if (lab) {
      setSelectedLab(lab);
    }
  };

  // Change User Role
  const handleChangeRole = (newRole: UserRole) => {
    const updated = { ...userProfile, role: newRole };
    setUserProfile(updated);
    StorageService.saveUserProfile(updated);
  };

  // Toggle Bookmark
  const handleToggleBookmark = (equipmentId: string) => {
    StorageService.toggleBookmark(equipmentId);
    setUserProfile(StorageService.getUserProfile());
  };

  // Start Inspection of a component directly into Split Screen
  const handleOpenEquipmentSplitScreen = (
    equipment: Equipment, 
    result?: RecognitionResult | null, 
    image?: string | null
  ) => {
    setActiveEquipment(equipment);
    setActiveRecognitionResult(result || null);
    setActiveCapturedImage(image || null);
    setCurrentView('splitscreen');
    StorageService.addRecentScan(equipment);
    setUserProfile(StorageService.getUserProfile());
  };

  // Navigation handlers
  const handleNavbarNavigate = (view: 'home' | 'scanner' | 'library' | 'admin') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-lab-950 text-slate-100 flex flex-col font-sans selection:bg-lab-accent/20 selection:text-lab-accent">
      {/* Top Universal Navbar */}
      <Navbar
        currentView={currentView}
        onChangeView={handleNavbarNavigate}
        selectedLabCode={selectedLab.shortCode}
        userRole={userProfile.role}
        onOpenSetupGuide={() => setIsSetupGuideOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'home' && (
          <ArchiveHome
            institution={institution}
            selectedDepartment={selectedDepartment}
            selectedLab={selectedLab}
            departments={institution.departments}
            laboratories={selectedDepartment.laboratories}
            equipmentCatalog={catalog}
            onSelectDepartment={handleSelectDepartment}
            onSelectLab={handleSelectLab}
            onStartScan={() => setCurrentView('scanner')}
            onExploreEquipment={() => setCurrentView('library')}
            onSelectEquipment={(eq) => handleOpenEquipmentSplitScreen(eq)}
            onOpenSettings={() => setIsSetupGuideOpen(true)}
          />
        )}

        {currentView === 'scanner' && (
          <ScannerView
            equipmentCatalog={catalog}
            selectedLabId={selectedLab.id}
            onRecognitionComplete={(eq, res, img) => handleOpenEquipmentSplitScreen(eq, res, img)}
            onExploreCatalog={() => setCurrentView('library')}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'splitscreen' && activeEquipment && (
          <EquipmentDetailView
            equipment={activeEquipment}
            recognitionResult={activeRecognitionResult}
            capturedImage={activeCapturedImage}
            onBack={() => setCurrentView('home')}
            onSelectRelatedEquipment={(relId) => {
              const rel = catalog.find(e => e.id === relId);
              if (rel) handleOpenEquipmentSplitScreen(rel);
            }}
            onReportIssue={(eq) => setReportingEquipment(eq)}
          />
        )}

        {currentView === 'library' && (
          <EquipmentLibrary
            catalog={catalog}
            userProfile={userProfile}
            selectedLabId={selectedLab.id}
            onSelectEquipment={(eq) => handleOpenEquipmentSplitScreen(eq)}
            onToggleBookmark={handleToggleBookmark}
            onBackToHome={() => setCurrentView('home')}
            onStartScan={() => setCurrentView('scanner')}
          />
        )}

        {currentView === 'admin' && (
          <AdminPortal
            catalog={catalog}
            userRole={userProfile.role}
            onUpdateCatalog={(newCatalog) => setCatalog(newCatalog)}
            onChangeRole={handleChangeRole}
            onSelectEquipment={(eq) => handleOpenEquipmentSplitScreen(eq)}
          />
        )}
      </main>

      {/* Modals */}
      <SetupGuideModal
        isOpen={isSetupGuideOpen}
        onClose={() => setIsSetupGuideOpen(false)}
      />

      <ReportIssueModal
        equipment={reportingEquipment}
        isOpen={Boolean(reportingEquipment)}
        onClose={() => setReportingEquipment(null)}
      />
    </div>
  );
};
