# Aarogya Drishti (ఆరోగ్య దృష్టి) — Alluri Sitharama Raju District (ITDA Paderu)
**AI-Assisted Oral Cancer Early Detection & Telemedicine Platform (Alluri Sitharama Raju District)**

## Folder Structure
```text
aarogya-drishti/
└── aarogya-drishti-platform/
    ├── README.md                      # Architecture, Setup & Test Credentials
    ├── docker-compose.yml             # PostgreSQL + FastAPI + Frontend containers
    ├── .env.example                   # DB_URL, JWT_SECRET, S3_BUCKET
    │
    ├── frontend/                      # Web & Mobile PWA Client
    │   ├── index.html                 # Complete Single-Page PWA Application
    │   ├── manifest.json              # PWA Offline Install Manifest
    │   ├── service-worker.js          # Offline Asset & IndexedDB Sync Worker
    │   └── i18n/
    │       ├── en.json                # English UI Strings
    │       └── te.json                # Telugu (తెలుగు) Localization Strings
    │
    ├── backend/                       # Python FastAPI REST + WebRTC Signaling
    │   ├── Dockerfile                 # Container Build File for FastAPI
    │   ├── requirements.txt           # fastapi, uvicorn, sqlalchemy, onnxruntime
    │   ├── main.py                    # API Gateway, CORS & WebRTC Socket Server
    │   ├── auth_rbac.py               # JWT & Role-Based Access Control (4 Roles)
    │   ├── database.py                # PostgreSQL SQLAlchemy Connection
    │   ├── models.py                  # Patients, Screenings, Referrals, Biopsies
    │   └── ai_engine/
    │       ├── inference.py           # MobileNetV3 ONNX Lesion Classifier
    │       └── weights/
    │           └── oral_opmd_v2.onnx  # Pre-trained TANUH/Oral Lesion Weights
    │
    └── database/
        ├── schema.sql                 # PostgreSQL DDL Tables & Indexes
        └── seed_synthetic_data.sql    # Anonymized Demo Patients for Judges
```

## Quick Start (Step-by-Step)

### Option A: Run with Docker Compose (Recommended)
```bash
cd aarogya-drishti/aarogya-drishti-platform
cp .env.example .env
docker-compose up --build -d
```
- **Frontend Web/Mobile PWA**: http://localhost:3000
- **Backend FastAPI Swagger UI**: http://localhost:8000/docs
- **PostgreSQL Database**: `localhost:5432`

### Option B: Run Manually (Without Docker)
1. **Database Setup (PostgreSQL)**:
   ```bash
   psql -U postgres -c "CREATE DATABASE aarogya_drishti_db;"
   psql -U postgres -d aarogya_drishti_db -f database/schema.sql
   psql -U postgres -d aarogya_drishti_db -f database/seed_synthetic_data.sql
   ```
2. **Backend Setup (FastAPI + ONNX)**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
3. **Frontend Setup**:
   Open `frontend/index.html` directly in any browser or serve it locally:
   ```bash
   cd frontend
   python -m http.server 3000
   ```

## Role-Based Access Control (RBAC) & Dedicated Dashboards
The platform features a **Single Unified Sign-In Portal** where users log in with their account credentials. The entire dashboard, clinical navigation bar, and cadre command center dynamically transform based on the account used to log in:

| Role Cadre | User Account | Demo Password | Facility / Jurisdiction | Authorized Pipeline Steps | Primary Role Duties |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `HEALTH_WORKER` | `anm_lakshmi` | `paderu@2026` | Tajangi Sub-Centre, Paderu | Steps 1, 2, 3, 5, 6, 8 | Village oral screening, patient intake, high-contrast camera capture, offline queue sync |
| `MEDICAL_OFFICER` | `dr_lokeshkumar` | `paderu@2026` | Minumuluru PHC, Paderu | Steps 1–9 (Full Access) | Clinical triage of AI risk predictions, urgent teleconsult initiation, Aarogyasri pre-auth |
| `SPECIALIST` | `dr_surya_kgh` | `paderu@2026` | King George Hospital (KGH) | Steps 3, 4, 5, 6, 7, 8, 9 | Synchronous WebRTC video teleconsult, punch biopsy histopathology verification, TNM tumor staging |
| `DISTRICT_ADMIN` | `po_itda_paderu` | `paderu@2026` | ITDA Paderu Complex (Sri Aditya Verma, IAS) | Steps 1, 4, 9 | District epidemiological heatmaps, screening target surveillance, feeder ambulance logistics |

### RBAC Features on Every Single Dashboard
1. **Dedicated Cadre Command Hub**: 
   - Positioned at the top of the workspace upon login.
   - Tailored to each cadre with active greetings, jurisdiction badge, assigned facility, and **4 cadre-specific dynamic KPI cards** (e.g. Village Screenings & Offline Cache for Health Workers; Pending Triages & Decision TAT for Medical Officers; Tele-Oncology Queue & TNM Staging for Specialists; District Target % & Feeder Fleet for District Admin).
   - Provides **1-Click Cadre Quick Routes** directly to authorized primary dashboards.
2. **Strict Role-Based Navigation (Authorized Dashboards Only)**:
   - The top navigation bar dynamically filters to display **only the dashboards authorized for the active cadre**:
     - `HEALTH_WORKER`: Exactly 6 authorized steps (Steps 1, 2, 3, 5, 6, 8) — unauthorized clinical steps (Steps 4, 7, 9) are completely excluded from view.
     - `MEDICAL_OFFICER`: All 9 steps (Full Clinical Access).
     - `SPECIALIST`: Exactly 7 authorized steps (Steps 3, 4, 5, 6, 7, 8, 9) — village intake steps (Steps 1, 2) are excluded.
     - `DISTRICT_ADMIN`: Exactly 3 authorized governance steps (Steps 1, 4, 9) — clinical procedures (Steps 2, 3, 5, 6, 7, 8) are excluded.
   - Shows active cadre badge and `Role-Based Access: N Dashboards Only` clearance badge in the navigation bar.
3. **Strict Navigation Guarding & Dynamic Step Progression**:
   - Direct attempts to navigate to any step outside the role's authorized scope are strictly blocked with an RBAC security notification.
   - Step-to-step "Proceed to Next" action buttons dynamically navigate only to the cadre's next authorized dashboard (e.g. Health Workers skip Step 4 MO Review to proceed directly to Step 5 Teleconsult Assist; from Step 6 Referral to Step 8 Follow-up; and from Step 8 back to Step 1).
4. **Fine-Grained In-Dashboard Feature Permissions**:
   - **Step 1 (Intake)**: Health Workers and Medical Officers have full write access; District Admin operates in an **Administrative Audit Mode** where demographic records can be reviewed but form submission is locked.
   - **Step 4 (MO Review)**: Medical Officers and Specialists have full clinical triage buttons (`Teleconsult` / `Refer Biopsy`); District Admin operates in **Surveillance Mode** with read-only audit badges.
   - **Step 7 (Biopsy Lab)**: Specimen lifecycle updates and TNM staging are restricted to certified Specialists and Medical Officers; Health Workers and District Admin are shielded.
   - **Step 9 (District Analytics)**: Surveillance metrics, heatmaps, and policy directives are optimized for District Admin and Medical Officers; Frontline Health Workers are shielded.

### Role Security & Session Features
- **Single Unified Login Screen**: No separate portal categories needed. Users sign in using a single, unified login portal. The system automatically detects the account's registered cadre and reconfigures the entire application dashboard, KPIs, and navigation bar to strictly authorized steps only. An interactive quick-fill directory allows 1-click credential population and demo sign-in for evaluators.
- **Forgot Password & Credential Recovery**: Includes a dedicated **"Forgot Password?"** recovery modal accessible directly from the portal login dialog, featuring an official role accounts directory and a self-service **"Set New Password"** utility (`POST /api/v1/auth/reset-password`).
- **Strict Role Isolation**: Pipeline steps outside a user's authorized role are locked (`🔒`) and guarded both in the UI and backend REST API (`require_roles`).
- **Switch Role / Logout**: Users can easily log out or switch roles using the header **"Switch Role"** button to evaluate other personas.
- **Bilingual Interface**: Full English and Telugu (తెలుగు) localization across all login cards, authentication forms, banners, shields, and role designations.
- **Offline Resilient**: Functions seamlessly whether connected to the live FastAPI backend on `http://localhost:8000` or running as a standalone PWA via local browser storage.

## LiveKit Cloud Video Calling & AI Voice Agent (Step 5)
The platform integrates **LiveKit Cloud** for WebRTC video teleconsultation and an autonomous **Clinical AI Voice Agent**:

- **LiveKit API Key**: `APIw8J4vzAKhTwS`
- **Default Room**: `#ITDA-PADERU-8841` (Encrypted e-Sanjeevani WebRTC channel)
- **3-Stream Interactive Feed**:
  1. **Remote Specialist Oncologist**: Live WebRTC stream connecting Dr. P. Surya Rao, MS, MCh at King George Hospital (KGH) / District Hospital Paderu.
  2. **Local Healthcare Worker & Patieready
  nt Camera**: Live local video stream with camera/mic access (`getUserMedia`) and 1-click intraoral lesion scan broadcasting.
  3. **Aarogya Voice AI Clinical Assistant**: Multimodal voice agent capable of real-time clinical speech synthesis and voice queries in both English and Telugu (తెలుగు).
- **LiveKit Backend Endpoints**:
  - `GET /api/v1/livekit/config`: LiveKit Cloud configuration & status.
  - `POST /api/v1/livekit/token`: JWT connection token generator for rooms.
  - `POST /api/v1/livekit/voice-agent/query`: Clinical query synthesis & speech handler.
- **2G/3G Low-Bandwidth Mode**: Adaptive audio-first 38 kbps mode optimized for remote agency mandals with weak cellular coverage.
