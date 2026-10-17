# LABLENS — Laboratory Equipment Archival Index & Learning Platform

> **Identify. Understand. Operate Safely.**  
> *A tactile engineering knowledge archive combining vintage technical manuals, specimen dossiers, and modern multimodal recognition.*

---

## 🏛️ Design Vision: The Interactive Physical Archive

LABLENS transforms the laboratory experience from a conventional SaaS dashboard into an **immersive interactive physical archive**. Inspired by tactile stacks of vertically arranged archival folders, book spines, index tabs, layered paper, and editorial typography, the interface delivers:

1. **The Interactive Book-Spine / Folder-Stack Archive**:
   - A tactile horizontal stack of overlapping vertical book spines and folders representing cataloged equipment files.
   - Each spine features distinctive typography, archive codes (e.g. `№ 042`), category stamps, cloth textures, and custom colors:
     - **Forest Green** (`#182A1E`) — Tektronix Digital Storage Oscilloscope
     - **Terracotta / Rust** (`#8E3A20`) — Keysight 20MHz Function Generator
     - **Muted Olive** (`#384334`) — Scientific Dual Tracking Regulated DC Power Supply
     - **Aged Ochre Leather** (`#986E3C`) — Fluke 115 True-RMS Digital Multimeter
     - **Prussian Navy** (`#1D2834`) — NE555 Precision Timer IC
     - **Charcoal Obsidian** (`#1F2321`) — ESP32 NodeMCU IoT Development Board
     - **Deep Burgundy** (`#73221E`) — SN74LS08N Quad AND Gate TTL IC
     - **Faded Blue-Grey Slate** (`#2A3E42`) — LVDT Linear Displacement Transducer Bench
   - **Tactile Interactions**:
     - Hovering lifts the spine forward (`y: -26px`, subtle rotation, layered drop shadow).
     - Neighboring folders react with staggered physics.
     - Clicking smoothly pulls out the archival dossier into the detailed split-screen.
     - Full keyboard accessibility: Arrow keys (`←`, `→`) navigate spines, and `Enter` pulls the file.

2. **Personalized to Each Campus Lab (`LabSelector.tsx`)**:
   - Configured for **Army Institute of Technology (AIT), Pune**.
   - Select Departments (E&TC, Mechanical, Computer) and specific laboratory rooms (DEL-LAB, AC-LAB, IOT-LAB).
   - Real-time catalog counts and verified syllabus alignment records.

3. **Redesigned Split-Screen Equipment Detail Experience (`EquipmentDetailView.tsx`)**:
   - **Left Panel (`SpecimenImagePanel.tsx`)**:
     - Large, crisp, centered specimen photograph with tactile border framing.
     - Archival stamp: `SPECIMEN // AIT-ENTC-DEL-042`, verification seal, bench location.
     - Zoom in/out/reset controls and interactive inspection hotspots (+ pins).
   - **Right Panel (`EquipmentSectionIndex.tsx` & `CurvedInfoSheet.tsx`)**:
     - Archival file dividers: *Overview, What It Does, How to Use, Connections / Pinout, How It Works, Specifications, Safety / Precautions, Common Mistakes, Troubleshooting, Lab Manual References, and Grounded AI Assistant*.
     - **Signature Parabolic Curved Motion**: Clicking any section extracts the document sheet along a curved parabolic trajectory into the foreground, like pulling a technical sheet out of an archival binder.

4. **Curated & Verified Engineering Equipment**:
   - Accurate pinouts with voltage ratings and wiring rules.
   - 5-step operational procedures with interactive progress checklists and warning alerts.
   - Critical safety directives with rationales.
   - Comprehensive diagnostic troubleshooting ledgers.

5. **Camera Scanner & Verification Engine (`ScannerView.tsx`)**:
   - Live camera stream with scanning reticle and laser beam.
   - Multimodal recognition supporting both **Google Gemini 1.5/2.0 Vision** and the **Edge Demonstration Engine**.
   - Instant manual match confirmation with candidate alternates.

6. **Governance & Discrepancy Reporting (`AdminPortal.tsx`)**:
   - Role switcher: **Student**, **Lab Assistant**, and **Faculty Admin**.
   - Student discrepancy submission for damaged hardware or manual errata.
   - Full equipment creation, verification, and JSON export/import.

---

## 🛠️ Technology Stack

- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom archival palette (paper beige, warm cream, forest green, muted olive, rust terracotta, ink charcoal)
- **Typography**: Fraunces (editorial serif), Space Grotesk (technical sans), JetBrains Mono (archival code)
- **Motion**: Framer Motion (parabolic trajectories, spring dynamics, staggered folder lift)
- **Icons**: Lucide React

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open in browser:
http://localhost:3000/
```
