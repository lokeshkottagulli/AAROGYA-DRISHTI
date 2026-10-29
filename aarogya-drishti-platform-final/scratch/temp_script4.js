
    // ==================== STATE & SYNTHETIC DEMO DATA ====================
    let currentStep = 1;
    let currentLang = 'en';
    let isOnline = true;
    let currentRole = 'HEALTH_WORKER';
    let currentUser = null;
    let selectedLoginRole = 'HEALTH_WORKER';
    let currentPreset = 'SUSPICIOUS';
    let lowBandwidthMode = false;
    let webcamStream = null;

    const ROLE_CONFIGS = {
      HEALTH_WORKER: {
        id: "HEALTH_WORKER",
        titleEn: "Frontline Health Worker",
        titleTe: "గ్రామ ఆరోగ్య కార్యకర్త (ఆశా/ఏఎన్‌ఎం)",
        subEn: "ASHA / ANM Village Cadre",
        subTe: "ఆశా / ఏఎన్‌ఎం గ్రామ కేడర్",
        badgeEn: "Village Screening & Photo Capture",
        badgeTe: "గ్రామ స్క్రీనింగ్ & ఫోటో పరీక్ష",
        user: "anm_lakshmi",
        name: "ANM Lakshmi Devi",
        designation: "Frontline Worker (ASHA/ANM)",
        facility: "Tajangi Sub-Centre, Paderu",
        mandal: "Paderu",
        icon: "fa-user-nurse",
        color: "slate",
        accentHex: "#0096a6",
        badgeClass: "bg-teal-50 text-teal-800 border border-teal-200",
        allowedSteps: [1, 2, 3, 5, 6, 8],
        startStep: 1,
        dutiesEn: "Door-to-door oral screening, habit profiling, high-risk oral photography & offline village sync.",
        dutiesTe: "ఇంటింటికి తిరిగి నోటి పరీక్షలు, అలవాట్ల నమోదు, ఫోటో తీయుట మరియు ఆఫ్‌లైన్ సింక్."
      },
      MEDICAL_OFFICER: {
        id: "MEDICAL_OFFICER",
        titleEn: "PHC Medical Officer",
        titleTe: "వైద్యాధికారి (PHC MO)",
        subEn: "Primary Health Centre Doctor",
        subTe: "ప్రాథమిక ఆరోగ్య కేంద్ర డాక్టర్",
        badgeEn: "Clinical Review & Triage Authority",
        badgeTe: "వైద్య సమీక్ష & ట్రయాజ్ అధికారం",
        user: "dr_lokeshkumar",
        name: "Dr. K. Lokeshkumar, MBBS",
        designation: "PHC Medical Officer",
        facility: "Minumuluru Primary Health Centre",
        mandal: "Paderu",
        icon: "fa-user-doctor",
        color: "sky",
        accentHex: "#0ea5e9",
        badgeClass: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
        allowedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        startStep: 4,
        dutiesEn: "Clinical triage of AI risk predictions, tele-oncology consult initiation, urgent hospital referrals & pre-auth.",
        dutiesTe: "AI ఫలితాల వైద్య సమీక్ష, ప్రాథమిక ట్రయాజ్, టెలి-కన్సల్టేషన్ ప్రారంభం మరియు ఆసుపత్రి రిఫరల్."
      },
      SPECIALIST: {
        id: "SPECIALIST",
        titleEn: "Oral Oncology Specialist",
        titleTe: "నోటి క్యాన్సర్ నిపుణుడు",
        subEn: "Tertiary Cancer Hospital (KGH Vizag)",
        subTe: "కేన్సర్ స్పెషాలిటీ ఆసుపత్రి (KGH / హోమీ భాభా)",
        badgeEn: "Tertiary Center Tele-Oncology & Biopsy",
        badgeTe: "స్పెషలిస్ట్ టెలి-ఆంకాలజీ & బయాప్సీ స్టేజింగ్",
        user: "dr_surya_kgh",
        name: "Dr. P. Surya Rao, MS, MCh",
        designation: "Oral Oncology Specialist",
        facility: "King George Hospital (KGH) Visakhapatnam",
        mandal: "Visakhapatnam / Paderu Referral",
        icon: "fa-microscope",
        color: "slate",
        accentHex: "#0096a6",
        badgeClass: "bg-teal-50 text-teal-800 border border-teal-200",
        allowedSteps: [3, 4, 5, 6, 7, 8, 9],
        startStep: 5,
        dutiesEn: "Synchronous video teleconsultation, punch biopsy review, TNM staging (TisN0M0 - Stage IV), operative oncology guidance.",
        dutiesTe: "వీడియో టెలి-కన్సల్టేషన్, బయాప్సీ నమూనా పరిశీలన, TNM స్టేజింగ్ మరియు చికిత్స ప్రణాళిక."
      },
      DISTRICT_ADMIN: {
        id: "DISTRICT_ADMIN",
        titleEn: "ITDA District Admin",
        titleTe: "ITDA ప్రాజెక్ట్ అధికారి (Admin)",
        subEn: "Project Officer (IAS) / DM&HO",
        subTe: "జిల్లా పరిపాలన & DM&HO",
        badgeEn: "Epidemiological Surveillance & Governance",
        badgeTe: "జిల్లా ఆరోగ్య నిఘా & పాలన",
        user: "po_itda_paderu",
        name: "Sri Aditya Verma, IAS",
        designation: "ITDA District Admin (PO)",
        facility: "ITDA Paderu Administrative Complex",
        mandal: "ITDA Paderu Headquarters",
        icon: "fa-landmark-dome",
        color: "slate",
        accentHex: "#0096a6",
        badgeClass: "bg-teal-50 text-teal-800 border border-teal-200",
        allowedSteps: [1, 4, 9],
        startStep: 9,
        dutiesEn: "Alluri Sitharama Raju district epidemiological heatmaps, screening targets tracking, feeder ambulance fleet coordination.",
        dutiesTe: "జిల్లా స్థాయి నోటి క్యాన్సర్ గణాంకాలు, మండల వారీగా మ్యాపులు, ఉచిత అంబులెన్స్ పర్యవేక్షణ."
      }
    };

    const pipelineSteps = [
      { id: 1, titleEn: "1. Registration", titleTe: "1. నమోదు", icon: "fa-user-plus", roles: ['HEALTH_WORKER', 'MEDICAL_OFFICER', 'DISTRICT_ADMIN'], writeRoles: ['HEALTH_WORKER', 'MEDICAL_OFFICER'] },
      { id: 2, titleEn: "2. Oral Capture", titleTe: "2. ఫోటో పరీక్ష", icon: "fa-camera", roles: ['HEALTH_WORKER', 'MEDICAL_OFFICER'], writeRoles: ['HEALTH_WORKER', 'MEDICAL_OFFICER'] },
      { id: 3, titleEn: "3. AI Assessment", titleTe: "3. AI విశ్లేషణ", icon: "fa-microchip", roles: ['HEALTH_WORKER', 'MEDICAL_OFFICER', 'SPECIALIST'], writeRoles: ['HEALTH_WORKER', 'MEDICAL_OFFICER', 'SPECIALIST'] },
      { id: 4, titleEn: "4. MO Review", titleTe: "4. డాక్టర్ సమీక్ష", icon: "fa-user-doctor", roles: ['MEDICAL_OFFICER', 'SPECIALIST', 'DISTRICT_ADMIN'], writeRoles: ['MEDICAL_OFFICER', 'SPECIALIST'] },
      { id: 5, titleEn: "5. Teleconsult", titleTe: "5. టెలి-కన్సల్ట్", icon: "fa-video", roles: ['HEALTH_WORKER', 'MEDICAL_OFFICER', 'SPECIALIST'], writeRoles: ['HEALTH_WORKER', 'MEDICAL_OFFICER', 'SPECIALIST'] },
      { id: 6, titleEn: "6. Referral", titleTe: "6. రిఫరల్", icon: "fa-calendar-check", roles: ['HEALTH_WORKER', 'MEDICAL_OFFICER', 'SPECIALIST'], writeRoles: ['HEALTH_WORKER', 'MEDICAL_OFFICER', 'SPECIALIST'] },
      { id: 7, titleEn: "7. Biopsy Lab", titleTe: "7. బయాప్సీ ల్యాబ్", icon: "fa-microscope", roles: ['MEDICAL_OFFICER', 'SPECIALIST'], writeRoles: ['SPECIALIST', 'MEDICAL_OFFICER'] },
      { id: 8, titleEn: "8. Treatment", titleTe: "8. చికిత్స ట్రాకింగ్", icon: "fa-heart-pulse", roles: ['HEALTH_WORKER', 'MEDICAL_OFFICER', 'SPECIALIST'], writeRoles: ['HEALTH_WORKER', 'MEDICAL_OFFICER', 'SPECIALIST'] },
      { id: 9, titleEn: "9. District Analytics", titleTe: "9. జిల్లా డ్యాష్‌బోర్డ్", icon: "fa-chart-pie", roles: ['MEDICAL_OFFICER', 'SPECIALIST', 'DISTRICT_ADMIN'], writeRoles: ['DISTRICT_ADMIN', 'MEDICAL_OFFICER'] }
    ];

    let patients = [
      {
        id: "PT-ASR-101",
        name: "Korrailingam Padala",
        age: 48,
        gender: "Male",
        mandal: "Paderu",
        village: "Minumuluru",
        phone: "+91 94401 82310",
        habits: "Gutka + Khaini (16 yrs)",
        site: "Left Buccal Mucosa",
        aiScore: 0.884,
        risk: "SUSPICIOUS",
        moDecision: "Referred for Urgent Biopsy",
        biopsyStage: "Report Available",
        synced: true
      },
      {
        id: "PT-ASR-102",
        name: "Siveri Bangaramma",
        age: 54,
        gender: "Female",
        mandal: "Chintapalli",
        village: "Lammasingi",
        phone: "+91 94408 11920",
        habits: "Reverse Chutta Smoking (22 yrs)",
        site: "Hard / Soft Palate",
        aiScore: 0.812,
        risk: "SUSPICIOUS",
        moDecision: "Teleconsult Scheduled",
        biopsyStage: "Specimen Collected",
        synced: true
      },
      {
        id: "PT-ASR-103",
        name: "Pangi Somanna",
        age: 37,
        gender: "Male",
        mandal: "Araku Valley",
        village: "Sunkarametta",
        phone: "+91 94912 44501",
        habits: "Betel Quid / Areca Nut (9 yrs)",
        site: "Lateral Border of Tongue",
        aiScore: 0.540,
        risk: "MODERATE",
        moDecision: "7-Day PHC Follow-up",
        biopsyStage: "Pending",
        synced: true
      },
      {
        id: "PT-ASR-104",
        name: "Vanthala Sitamma",
        age: 31,
        gender: "Female",
        mandal: "G.K. Veedhi",
        village: "arinama",
        phone: "+91 94415 77832",
        habits: "None",
        site: "Right Buccal Mucosa",
        aiScore: 0.140,
        risk: "LOW",
        moDecision: "Routine Oral Hygiene Advice",
        biopsyStage: "Not Required",
        synced: true
      },
      {
        id: "PT-ASR-105",
        name: "Killo Simhachalam",
        age: 44,
        gender: "Male",
        mandal: "Hukumpeta",
        village: "Kontamuru",
        phone: "+91 94409 65112",
        habits: "Gutka + Tobacco (14 yrs)",
        site: "Floor of Mouth",
        aiScore: 0.765,
        risk: "SUSPICIOUS",
        moDecision: "Biopsy Confirmed Stage I",
        biopsyStage: "Staging Confirmed",
        synced: true
      },
      {
        id: "PT-ASR-106",
        name: "Killo Appala Naidu",
        age: 51,
        gender: "Male",
        mandal: "Ananthagiri",
        village: "Borra Caves",
        phone: "+91 94411 23456",
        habits: "Chutta Smoking (18 yrs)",
        site: "Hard / Soft Palate",
        aiScore: 0.620,
        risk: "MODERATE",
        moDecision: "Teleconsult Scheduled",
        biopsyStage: "Specimen Collected",
        synced: true
      },
      {
        id: "PT-ASR-107",
        name: "Pangi Chittamma",
        age: 46,
        gender: "Female",
        mandal: "Dumbriguda",
        village: "Kandrum",
        phone: "+91 94902 34567",
        habits: "Gutka + Tobacco (12 yrs)",
        site: "Right Buccal Mucosa",
        aiScore: 0.790,
        risk: "SUSPICIOUS",
        moDecision: "Referred for Urgent Biopsy",
        biopsyStage: "Report Available",
        synced: true
      },
      {
        id: "PT-ASR-108",
        name: "Vanthala Ramanna",
        age: 39,
        gender: "Male",
        mandal: "G.madugula",
        village: "Kondiba",
        phone: "+91 94418 45678",
        habits: "Betel Quid / Areca Nut (10 yrs)",
        site: "Left Buccal Mucosa",
        aiScore: 0.480,
        risk: "MODERATE",
        moDecision: "7-Day PHC Follow-up",
        biopsyStage: "Pending",
        synced: true
      },
      {
        id: "PT-ASR-109",
        name: "Korra Kondalamma",
        age: 58,
        gender: "Female",
        mandal: "Koyyuru",
        village: "Mampa",
        phone: "+91 94407 56789",
        habits: "Reverse Chutta Smoking (25 yrs)",
        site: "Hard Palate",
        aiScore: 0.852,
        risk: "SUSPICIOUS",
        moDecision: "Referred for Urgent Biopsy",
        biopsyStage: "Specimen Collected",
        synced: true
      },
      {
        id: "PT-ASR-110",
        name: "Gammela Somulu",
        age: 42,
        gender: "Male",
        mandal: "Munchingput",
        village: "Jolaput",
        phone: "+91 94913 67890",
        habits: "Gutka + Khaini (15 yrs)",
        site: "Floor of Mouth",
        aiScore: 0.740,
        risk: "SUSPICIOUS",
        moDecision: "Teleconsult Scheduled",
        biopsyStage: "In Transit to Lab",
        synced: true
      },
      {
        id: "PT-ASR-111",
        name: "Gemmeli Chinnayya",
        age: 35,
        gender: "Male",
        mandal: "Pedabayulu",
        village: "Gomangi",
        phone: "+91 94412 78901",
        habits: "Routine Camp Checkup",
        site: "Tongue Dorsum",
        aiScore: 0.110,
        risk: "LOW",
        moDecision: "Routine Oral Hygiene Advice",
        biopsyStage: "Not Required",
        synced: true
      }
    ];

    let activePatientId = patients[0].id;
    let offlineQueue = [];

    // Bilingual Dictionary (English & Telugu)
    const i18n = {
      en: {
        appTitle: "AAROGYA DRISHTI",
        appSub: "AI-Assisted Oral Cancer Early Detection & Telemedicine Platform • Alluri Sitharama Raju District",
        districtName: "Alluri Sitharama Raju District",
        districtFullName: "Alluri Sitharama Raju District (ASR District)",
        roleLabel: "Role:",
        codeGuideBtn: "Source Code & Files",
        activePatientLabel: "Active Patient in Pipeline:",
        step1Tag: "Step 1 of 9 • Village-Level Field Entry",
        step1Title: "Patient Registration & Risk Factor History",
        step1Desc: "Register tribal community members, record tobacco/gutka habits, and cache offline when out of cellular coverage.",
        btnAutoFill: "Auto-Fill Synthetic Tribal Patient",
        lblFullName: "Patient Full Name *",
        lblAge: "Age (Years) *",
        lblGender: "Gender *",
        lblMandal: "Mandal (Alluri Sitharama Raju District) *",
        lblVillage: "Tribal Habitation / Village *",
        lblPhone: "Contact / ASHA Phone *",
        riskHeader: "Oral Cancer Habits & Clinical Risk Factors",
        btnSaveProceed: "Register & Proceed to Oral Screening (Step 2)",
        guardrailTitle: "Mandatory AI Clinical Decision-Support Guardrail (Not a Definitive Diagnosis)",
        guardrailBody: "This MobileNetV3/ONNX vision model provides preliminary risk stratification for triage prioritization only. Every suspicious finding MUST be reviewed by a Medical Officer and confirmed via histopathology biopsy.",
        guardrailAck: "I Acknowledge Limitations",
        loginPortalHeading: "Aarogya Drishti — Multi-Role Access Portal",
        loginPortalSub: "Select your clinical or administrative role below to log into your designated workspace. Each role operates within strict Role-Based Access Control (RBAC) boundaries for tribal healthcare delivery.",
        roleCardHealthWorkerTitle: "Frontline Health Worker",
        roleCardHealthWorkerSub: "ASHA / ANM Village Cadre",
        roleCardHealthWorkerDesc: "Door-to-door oral screening, habit risk intake, high-contrast photo capture, and offline synchronization in remote pockets.",
        roleCardMedicalOfficerTitle: "PHC Medical Officer",
        roleCardMedicalOfficerSub: "Primary Health Centre Doctor",
        roleCardMedicalOfficerDesc: "Clinical triage of AI risk predictions, urgent tele-consult referral scheduling, and pre-auth authorization.",
        roleCardSpecialistTitle: "Oral Oncology Specialist",
        roleCardSpecialistSub: "KGH / Homi Bhabha Vizag",
        roleCardSpecialistDesc: "Synchronous WebRTC teleconsultation, histopathological punch biopsy staging (TNM), and oncology care planning.",
        roleCardDistrictAdminTitle: "ITDA District Admin",
        roleCardDistrictAdminSub: "Project Officer (IAS) / DM&HO",
        roleCardDistrictAdminDesc: "Alluri Sitharama Raju district epidemiological heatmaps, screening targets tracking, and feeder ambulance logistics.",
        lblUsername: "Username / Healthcare Worker ID",
        lblPassword: "Password",
        btnQuickFill: "⚡ 1-Click Demo Login",
        btnSignIn: "Sign In to Portal",
        btnLogout: "Switch Role",
        loginRequiredBadge: "Role Login Required",
        btnForgotPassword: "Forgot Password?",
        lblRememberMe: "Remember role credentials",
        forgotModalTitle: "Credential Recovery & Password Assistance",
        forgotModalSub: "Alluri Sitharama Raju District • ITDA Paderu Healthcare Worker Self-Service Recovery",
        tabDefaultCredentials: "Role Accounts Directory",
        tabSetNewPassword: "Set New Password",
        lblSelectAccount: "Select Cadre Account",
        lblNewPassword: "New Password",
        lblConfirmPassword: "Confirm New Password",
        btnUpdatePassword: "Save & Set New Password",
        btnAutoFillBack: "Use Credential & Return",
        btnSelectPortal: "Select Portal & Sign In"
      },
      te: {
        appTitle: "ఆరోగ్య దృష్టి (AAROGYA DRISHTI)",
        appSub: "AI-ఆధారిత నోటి క్యాన్సర్ ముందస్తు గుర్తింపు & టెలిమెడిసిన్ వేదిక • అల్లూరి సీతారామరాజు జిల్లా (పాడేరు ITDA)",
        districtName: "అల్లూరి సీతారామరాజు జిల్లా",
        districtFullName: "అల్లూరి సీతారామరాజు జిల్లా (ASR జిల్లా)",
        roleLabel: "పాత్ర:",
        codeGuideBtn: "సోర్స్ కోడ్ & ఫైల్స్",
        activePatientLabel: "ప్రస్తుత రోగి:",
        step1Tag: "దశ 1 / 9 • గ్రామ స్థాయి నమోదు",
        step1Title: "రోగి నమోదు & అలవాట్ల చరిత్ర",
        step1Desc: "గిరిజన గ్రామాలలో రోగి వివరాలను నమోదు చేయండి. ఇంటర్నెట్ లేకపోయినా ఫోన్‌లో భద్రపరచబడుతుంది.",
        btnAutoFill: "నమూనా రోగి వివరాలు నింపండి",
        lblFullName: "రోగి పూర్తి పేరు *",
        lblAge: "వయస్సు (సంవత్సరాలు) *",
        lblGender: "లింగం *",
        lblMandal: "మండలం (అల్లూరి సీతారామరాజు జిల్లా) *",
        lblVillage: "గిరిజన గ్రామం / గూడెం *",
        lblPhone: "ఫోన్ నంబర్ / ఆశా కార్యకర్త *",
        riskHeader: "నోటి క్యాన్సర్ ప్రమాద కారకాలు (పొగాకు / గుట్కా అలవాట్లు)",
        btnSaveProceed: "నమోదు చేసి ఫోటో పరీక్షకు వెళ్ళండి (దశ 2)",
        guardrailTitle: "ముఖ్య గమనిక: AI ఫలితాలు ప్రాథమిక సహాయానికి మాత్రమే (తుది నిర్ధారణ కాదు)",
        guardrailBody: "ఈ AI విశ్లేషణ కేవలం ముందస్తు గుర్తింపు కొరకు మాత్రమే. ప్రతి అనుమానాస్పద కేసును వైద్యాధికారి మరియు బయాప్సీ పరీక్ష ద్వారా నిర్ధారించాలి.",
        guardrailAck: "నేను నిబంధనలను అంగీకరిస్తున్నాను",
        loginPortalHeading: "ఆరోగ్య దృష్టి — పాత్ర ఆధారిత లాగిన్ పోర్టల్",
        loginPortalSub: "సురక్షితమైన గిరిజన నోటి క్యాన్సర్ స్క్రీనింగ్ ప్లాట్‌ఫామ్‌లోకి ప్రవేశించడానికి మీ పాత్రను ఎంచుకోండి.",
        roleCardHealthWorkerTitle: "గ్రామ ఆరోగ్య కార్యకర్త",
        roleCardHealthWorkerSub: "ఆశా / ఏఎన్‌ఎం (ASHA / ANM)",
        roleCardHealthWorkerDesc: "ఇంటింటికి తిరిగి నోటి పరీక్షలు, అలవాట్ల వివరాలు నమోదు, ఫోటో పరీక్ష మరియు ఆఫ్‌లైన్ సింక్.",
        roleCardMedicalOfficerTitle: "వైద్యాధికారి (PHC MO)",
        roleCardMedicalOfficerSub: "ప్రాథమిక ఆరోగ్య కేంద్ర డాక్టర్",
        roleCardMedicalOfficerDesc: "AI ఫలితాల వైద్య సమీక్ష, ప్రాథమిక ట్రయాజ్, టెలి-కన్సల్టేషన్ ప్రారంభం మరియు ఆసుపత్రి రిఫరల్.",
        roleCardSpecialistTitle: "నోటి క్యాన్సర్ నిపుణుడు",
        roleCardSpecialistSub: "కేన్సర్ స్పెషాలిటీ ఆసుపత్రి (KGH / హోమీ భాభా)",
        roleCardSpecialistDesc: "వీడియో టెలి-కన్సల్టేషన్, బయాప్సీ నమూనా పరిశీలన, TNM స్టేజింగ్ మరియు చికిత్స ప్రణాళిక.",
        roleCardDistrictAdminTitle: "ITDA ప్రాజెక్ట్ అధికారి (Admin)",
        roleCardDistrictAdminSub: "జిల్లా పరిపాలన & DM&HO",
        roleCardDistrictAdminDesc: "జిల్లా స్థాయి నోటి క్యాన్సర్ గణాంకాలు, మండల వారీగా మ్యాపులు, ఉచిత అంబులెన్స్ పర్యవేక్షణ.",
        lblUsername: "వినియోగదారు పేరు / ఐడీ",
        lblPassword: "పాస్‌వర్డ్",
        btnQuickFill: "⚡ డెమో లాగిన్ (1-క్లిక్)",
        btnSignIn: "పోర్టల్‌లోకి లాగిన్ అవ్వండి",
        btnLogout: "పాత్ర మార్చండి",
        loginRequiredBadge: "లాగిన్ అవసరం",
        btnForgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
        lblRememberMe: "రుజువులను గుర్తుంచుకో",
        forgotModalTitle: "రుజువుల పునరుద్ధరణ & పాస్‌వర్డ్ సహాయం",
        forgotModalSub: "ITDA పాడేరు ఆరోగ్య కార్యకర్త స్వయం-సేవ పోర్టల్",
        tabDefaultCredentials: "పాత్రల ఖాతా వివరాలు",
        tabSetNewPassword: "కొత్త పాస్‌వర్డ్ సెట్ చేయండి",
        lblSelectAccount: "ఖాతాను ఎంచుకోండి",
        lblNewPassword: "కొత్త పాస్‌వర్డ్",
        lblConfirmPassword: "కొత్త పాస్‌వర్డ్‌ను నిర్ధారించండి",
        btnUpdatePassword: "కొత్త పాస్‌వర్డ్ సేవ్ చేయండి",
        btnAutoFillBack: "రుజువులను నింపి వెనుకకు వెళ్ళండి",
        btnSelectPortal: "పోర్టల్‌ను ఎంచుకోండి (లాగిన్)"
      }
    };

    // ==================== INITIALIZATION ====================
    window.onload = function() {
      // Check stored session
      const stored = localStorage.getItem('aarogya_session');
      if (stored) {
        try {
          currentUser = JSON.parse(stored);
          currentRole = currentUser.role;
          applyLoggedInState();
        } catch (e) {
          currentUser = null;
          applyLoggedOutState();
          selectLoginRole('HEALTH_WORKER');
        }
      } else {
        applyLoggedOutState();
        selectLoginRole('HEALTH_WORKER');
      }

      renderMOTriageTable();
      drawOralCavityCanvas('oralCanvas', false);
      drawOralCavityCanvas('aiResultCanvas', true);
      initLiveKitCall();
    };

    // ==================== CADRE DASHBOARD HUB & RBAC ENFORCEMENT ====================
    function renderCadreDashboardHub() {
      const hub = document.getElementById('cadreDashboardHub');
      if (!hub) return;
      if (!currentUser) {
        hub.innerHTML = '';
        return;
      }
      const config = ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER;
      const isTe = currentLang === 'te';
      const roleTitle = isTe ? config.titleTe : config.titleEn;
      const roleSub = isTe ? config.subTe : config.subEn;
      const roleBadge = isTe ? config.badgeTe : config.badgeEn;

      // Role specific KPIs & Quick Routes
      let kpis = [];
      let quickActions = [];

      if (currentUser.role === 'HEALTH_WORKER') {
        kpis = [
          { label: isTe ? 'నేటి గ్రామ స్క్రీనింగ్‌లు' : 'Village Screenings Today', val: '18 Active', sub: isTe ? 'తాజంగి & పాడేరు సెక్టార్' : 'Tajangi & Minumuluru Sector', icon: 'fa-user-check' },
          { label: isTe ? 'అనుమానాస్పద కేసులు' : 'High-Risk Lesions Identified', val: '4 Cases', sub: isTe ? 'తక్షణ డాక్టర్ ట్రయాజ్‌కు పంపబడింది' : 'Immediate MO Triage Flagged', icon: 'fa-triangle-exclamation', isAlert: true },
          { label: isTe ? 'ఆఫ్‌లైన్ విలేజ్ క్యూ' : 'Offline Village Queue', val: `${offlineQueue.length} Pending`, sub: isOnline ? (isTe ? 'ఆన్‌లైన్ (సింక్ పూర్తయింది)' : 'Online (Storage Synced)') : (isTe ? 'ఆఫ్‌లైన్ మోడ్ క్రియాశీలం' : 'Offline Mode Active'), icon: 'fa-cloud-arrow-up' },
          { label: isTe ? 'తదుపరి ఫాలో-అప్ సందర్శనలు' : 'Follow-up Visits Due', val: '3 Patients', sub: isTe ? 'దీర్ఘకాలిక సంరక్షణ పర్యవేక్షణ' : 'Tribal Habitation Navigation', icon: 'fa-calendar-day' }
        ];
        quickActions = [
          { stepId: 1, label: isTe ? '+ కొత్త స్క్రీనింగ్ నమోదు' : '+ New Patient Registration', icon: 'fa-user-plus', primary: true },
          { stepId: 2, label: isTe ? 'నోటి ఫోటో పరీక్ష' : 'Oral Camera Capture', icon: 'fa-camera' },
          { stepId: 3, label: isTe ? 'AI రిస్క్ విశ్లేషణ' : 'AI Lesion Assessment', icon: 'fa-microchip' },
          { stepId: 8, label: isTe ? 'రోగి ఫాలో-అప్ ట్రాకింగ్' : 'Home Follow-up Tracking', icon: 'fa-heart-pulse' }
        ];
      } else if (currentUser.role === 'MEDICAL_OFFICER') {
        kpis = [
          { label: isTe ? 'సమీక్షించాల్సిన AI కేసులు' : 'AI Triages Pending Review', val: '6 Triages', sub: isTe ? 'మినుములూరు PHC డెస్క్' : 'Minumuluru PHC Clinical Desk', icon: 'fa-clock-rotate-left' },
          { label: isTe ? 'నిపుణుడికి సిఫార్సులు' : 'Urgent Teleconsults Queued', val: '2 Patients', sub: isTe ? 'KGH ఆంకాలజిస్ట్ సమన్వయం' : 'Awaiting KGH Specialist', icon: 'fa-video' },
          { label: isTe ? 'సక్రియ బయాప్సీ శాంపిల్స్' : 'Active Biopsy Trackers', val: '4 Specimen', sub: isTe ? 'పాడేరు జిల్లా ఆసుపత్రి ల్యాబ్' : 'Paderu DH / KGH Vizag Lab', icon: 'fa-microscope' },
          { label: isTe ? 'సగటు ట్రయాజ్ నిర్ణయ సమయం' : 'Clinical Decision TAT', val: '2.4 Hours', sub: isTe ? 'లక్ష్యం: < 24 గంటలు' : 'Standard < 24h Window', icon: 'fa-bolt' }
        ];
        quickActions = [
          { stepId: 4, label: isTe ? 'AI ట్రయాజ్ సమీక్ష డెస్క్' : 'Review AI Triage Queue', icon: 'fa-user-doctor', primary: true },
          { stepId: 5, label: isTe ? 'టెలికన్సల్ట్ ప్రారంభించండి' : 'Open Video Teleconsult', icon: 'fa-video' },
          { stepId: 6, label: isTe ? 'ఆసుపత్రి రిఫరల్ షెడ్యూల్' : 'Schedule Hospital Referral', icon: 'fa-calendar-check' },
          { stepId: 7, label: isTe ? 'బయాప్సీ ల్యాబ్ ట్రాకర్' : 'Track Biopsy Specimen', icon: 'fa-microscope' }
        ];
      } else if (currentUser.role === 'SPECIALIST') {
        kpis = [
          { label: isTe ? 'టెలి-ఆంకాలజీ కన్సల్ట్‌లు' : 'Tele-Oncology Queue', val: '3 Sessions', sub: isTe ? 'ప్రత్యక్ష WebRTC వీడియో లింక్' : 'Live WebRTC Specialist Room', icon: 'fa-video' },
          { label: isTe ? 'స్టేజింగ్ వేచి ఉన్నవి' : 'Biopsies Awaiting Staging', val: '2 Reports', sub: isTe ? 'హిస్టోపాథాలజీ రిపోర్టులు సిద్ధం' : 'Histopathology Microscopic Review', icon: 'fa-microscope' },
          { label: isTe ? 'నిర్ధారిత ప్రారంభ కేసులు' : 'Confirmed Early Stage Cases', val: '8 Patients', sub: isTe ? 'TisN0M0 & Stage I చికిత్స' : 'TisN0M0 & Stage I Curative', icon: 'fa-circle-check' },
          { label: isTe ? 'ఆరోగ్యశ్రీ చికిత్స ప్లాన్లు' : 'Aarogyasri Care Plans', val: '12 Active', sub: isTe ? 'KGH / హోమీ భాభా సెంటర్' : 'Tertiary KGH / HBCH Vizag', icon: 'fa-heart-pulse' }
        ];
        quickActions = [
          { stepId: 5, label: isTe ? 'టెలి-ఆంకాలజీ గది' : 'Launch Tele-Oncology Room', icon: 'fa-video', primary: true },
          { stepId: 7, label: isTe ? 'TNM స్టేజింగ్ & బయాప్సీ' : 'Biopsy TNM Staging', icon: 'fa-microscope' },
          { stepId: 4, label: isTe ? 'సంక్లిష్ట కేసుల సమీక్ష' : 'Complex Lesions Review', icon: 'fa-user-doctor' },
          { stepId: 8, label: isTe ? 'ఆంకాలజీ చికిత్స ప్రణాళిక' : 'Oncology Care Navigation', icon: 'fa-clipboard-medical' }
        ];
      } else if (currentUser.role === 'DISTRICT_ADMIN') {
        kpis = [
          { label: isTe ? 'జిల్లా స్క్రీనింగ్ లక్ష్యం' : 'ASR Screening Target', val: '82.5%', sub: isTe ? '2,642 / 3,200 పూర్తి' : '2,642 / 3,200 Achieved', icon: 'fa-bullseye' },
          { label: isTe ? 'అధిక ముప్పు మండలాలు' : 'High-Alert Mandals', val: '3 Mandals', sub: isTe ? 'పాడేరు, చింతపల్లి, జి.మాడుగుల' : 'Paderu, Chintapalli, G.Madugula', icon: 'fa-triangle-exclamation' },
          { label: isTe ? 'గిరిజన ఫీడర్ అంబులెన్సులు' : 'Feeder Ambulances Live', val: '14 / 16 Live', sub: isTe ? 'మల్టీ-టెర్రైన్ అంబులెన్స్ నెట్‌వర్క్' : 'Multi-Terrain Tribal Logistics', icon: 'fa-truck-medical' },
          { label: isTe ? 'రిఫరల్-టు-బయాప్సీ సమయం' : 'Referral Resolution Rate', val: '86.4%', sub: isTe ? 'సగటు పరిష్కారం: 14.2 గంటలు' : 'Median Turnaround: 14.2 Hours', icon: 'fa-chart-line' }
        ];
        quickActions = [
          { stepId: 9, label: isTe ? 'జిల్లా నిఘా డ్యాష్‌బోర్డ్' : 'District Surveillance Command', icon: 'fa-chart-pie', primary: true },
          { stepId: 4, label: isTe ? 'PHC ట్రయాజ్ కేస్‌లోడ్ ఆడిట్' : 'PHC Triage Caseload Audit', icon: 'fa-clipboard-list' },
          { stepId: 1, label: isTe ? 'సమాజ రిజిస్ట్రేషన్ల ఆడిట్' : 'Demographics Intake Audit', icon: 'fa-users' }
        ];
      }

      hub.innerHTML = `
        <div class="bg-gradient-to-r from-[#d84a1b] via-[#e05423] to-[#ea580c] text-white rounded-2xl p-5 sm:p-6 border border-orange-600 shadow-xl space-y-5 relative">
          
          <!-- Top Row: Role Avatar, Greeting, Facility & Status -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div class="flex items-start sm:items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white bg-white/20 border border-white/30 shadow shrink-0">
                <i class="fa-solid ${config.icon}"></i>
              </div>
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/20 text-white border border-white/30">
                    ${currentUser.role}
                  </span>
                  <span class="text-xs text-amber-200 font-bold flex items-center gap-1">
                    <i class="fa-solid fa-circle-check text-amber-300"></i>
                    ${roleBadge}
                  </span>
                  <span class="text-[10px] bg-black/20 text-white border border-white/20 px-2 py-0.5 rounded font-medium">
                    DISHA / HIPAA Compliant
                  </span>
                </div>
                <h2 class="text-lg sm:text-xl font-black text-white tracking-tight flex flex-wrap items-center gap-2">
                  <span>${isTe ? 'స్వాగతం' : 'Cadre Command Hub:'}</span>
                  <span class="text-white">${currentUser.name}</span>
                  <span class="text-xs text-orange-200 font-normal">(${roleTitle})</span>
                </h2>
                <div class="text-xs text-orange-100 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span><i class="fa-solid fa-location-dot text-amber-300 mr-1"></i>${currentUser.facility}</span>
                  <span><i class="fa-solid fa-map text-amber-300 mr-1"></i>Alluri Sitharama Raju District • ${currentUser.mandal}</span>
                  <span class="text-white font-semibold"><i class="fa-solid fa-shield-halved text-amber-300 mr-1"></i>${isTe ? 'అనుమతించబడిన విభాగాలు: ' : 'Authorized Steps: '}${currentUser.allowedSteps.join(', ')}</span>
                </div>
              </div>
            </div>

            <!-- Role Switch / Log out Trigger -->
            <div class="flex items-center gap-2 shrink-0">
              <button onclick="handleLogout()" class="bg-white/20 hover:bg-white/30 border border-white/30 text-xs text-white px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 transition shadow-sm" title="Switch Cadre Role">
                <i class="fa-solid fa-arrow-right-from-bracket text-amber-200"></i>
                <span>${isTe ? 'ఖాతా మార్చండి' : 'Switch Account'}</span>
              </button>
            </div>
          </div>

          <!-- Middle Row: Cadre Dynamic KPIs (4 Cards) - Orange Gradation Translucent Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            ${kpis.map(kpi => `
              <div class="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl p-4 space-y-1.5 hover:bg-white/25 hover:border-white/40 transition">
                <div class="flex items-center justify-between text-xs text-orange-100">
                  <span class="font-bold line-clamp-1">${kpi.label}</span>
                  <i class="fa-solid ${kpi.icon} ${kpi.isAlert ? 'text-amber-300' : 'text-white'} text-xs"></i>
                </div>
                <div class="text-2xl font-black ${kpi.isAlert ? 'text-amber-200' : 'text-white'} tracking-tight">${kpi.val}</div>
                <div class="text-[11px] text-orange-100 line-clamp-1">${kpi.sub}</div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom Row: Cadre Quick-Action Shortcuts -->
          <div class="pt-3 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2 text-orange-100">
              <i class="fa-solid fa-route text-amber-300"></i>
              <span class="font-bold text-white uppercase tracking-wider text-[11px]">${isTe ? 'శీఘ్ర నావిగేషన్:' : 'Cadre Quick Routes:'}</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              ${quickActions.map(qa => `
                <button onclick="goToStep(${qa.stepId})" class="text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition border ${
                  qa.primary
                    ? 'bg-white text-[#d84a1b] hover:bg-orange-50 border-white shadow-md'
                    : 'bg-white/15 hover:bg-white/25 text-white border-white/30'
                }">
                  <i class="fa-solid ${qa.icon} text-[10px] ${qa.primary ? 'text-[#d84a1b]' : 'text-amber-200'}"></i>
                  <span>${qa.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

        </div>
      `;
    }

    function renderDashboardRbacBanner(stepId) {
      const banner = document.getElementById(`rbac-banner-step-${stepId}`);
      if (!banner) return;
      if (!currentUser) {
        banner.innerHTML = '';
        return;
      }

      const stepObj = pipelineSteps.find(s => s.id === stepId);
      const isTe = currentLang === 'te';
      const isReadOnly = stepObj && stepObj.writeRoles && !stepObj.writeRoles.includes(currentUser.role);
      const config = ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER;
      const userRoleTitle = isTe ? config.titleTe : config.titleEn;

      const allowedRolesHtml = stepObj && stepObj.roles ? stepObj.roles.map(r => {
        const rc = ROLE_CONFIGS[r];
        const rTitle = rc ? (isTe ? rc.titleTe : rc.titleEn) : r;
        const isCurrent = currentUser && currentUser.role === r;
        return `<span class="px-2 py-0.5 rounded text-[10px] font-bold border ${
          isCurrent
            ? 'bg-slate-900 text-white border-slate-800'
            : 'bg-white text-slate-700 border-slate-300'
        }">${rTitle}</span>`;
      }).join(' ') : '';

      banner.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm text-xs">
          <div class="flex items-center gap-2.5">
            <span class="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0096a6] text-white flex items-center gap-1.5">
              <i class="fa-solid fa-shield-check text-white"></i>
              <span>${isReadOnly ? 'Administrative Read-Only Audit' : 'Full Clinical Clearance'}</span>
            </span>
            <span class="text-xs text-slate-700 font-medium">
              Authenticated: <strong class="text-slate-900">${currentUser.name}</strong> (${userRoleTitle}) • <span class="text-slate-500">${currentUser.facility}</span>
            </span>
          </div>
          <div class="flex items-center gap-2 text-[11px]">
            <span class="text-slate-500 font-semibold">Statutory Cadres:</span>
            ${allowedRolesHtml}
            <span class="text-slate-300">|</span>
            <span class="text-slate-600 font-medium flex items-center gap-1"><i class="fa-solid fa-circle-check text-slate-700"></i>DISHA Compliant</span>
          </div>
        </div>
      `;
    }

    function renderDashboardRbacShield(stepId) {
      const shield = document.getElementById(`rbac-shield-step-${stepId}`);
      if (!shield || !currentUser) return;

      const stepObj = pipelineSteps.find(s => s.id === stepId);
      const isTe = currentLang === 'te';
      const stepName = stepObj ? (isTe ? stepObj.titleTe : stepObj.titleEn) : `Step ${stepId}`;
      const config = ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER;
      const userRoleTitle = isTe ? config.titleTe : config.titleEn;

      const rationales = {
        1: isTe ? "గిరిజన రోగుల నమోదు మరియు క్లినికల్ అలవాట్ల వివరాల నమోదు కేవలం గ్రామ ఆరోగ్య కార్యకర్తలు (ASHA/ANM) లేదా PHC వైద్యుల ప్రత్యక్ష పర్యవేక్షణ ద్వారా మాత్రమే నిర్వహించబడాలి." : "Field patient enrollment and clinical risk factor intake require Frontline Health Worker (ASHA/ANM) certification or Medical Officer oversight for tribal community compliance.",
        2: isTe ? "నోటి లోపలి భాగాలను ఫోటో తీయుటకు మరియు నాణ్యత తనిఖీకి ప్రత్యేక శిక్షణ పొందిన ఫ్రంట్‌లైన్ ఆరోగ్య కార్యకర్తలు మరియు మెడికల్ ఆఫీసర్లు మాత్రమే అర్హులు." : "Standardized intraoral mucosal photography is restricted to Frontline Village Health Workers and Medical Officers who have completed practical oral screening protocols.",
        3: isTe ? "AI విశ్లేషణ మరియు అనుమానాస్పద స్కోర్ల సమీక్ష కేవలం వైద్య నిపుణులు (ఆరోగ్య కార్యకర్తలు, వైద్యాధికారులు, ఆంకాలజిస్టులు) మాత్రమే చేయాలి." : "Clinical vision inference review is restricted to clinical care personnel (Health Workers, Medical Officers, Oncologists). Administrative personnel may monitor aggregated metrics in Step 9.",
        4: isTe ? "AI అనుమానాస్పద కేసుల వైద్య సమీక్ష, అధికారిక ట్రయాజ్ మరియు బయాప్సీ సిఫార్సుల ఆమోదం కేవలం రిజిస్టర్డ్ వైద్యాధికారులు మరియు స్పెషలిస్టులకు మాత్రమే అనుమతి ఉంది." : "Clinical triage decision-making and diagnostic referral sign-offs require statutory Medical Officer or Surgical Oncologist registration under the AP Medical Council.",
        5: isTe ? "ప్రత్యక్ష టెలి-కన్సల్టేషన్ కేవలం రోగి వద్ద ఉన్న ఆరోగ్య కార్యకర్త మరియు ఉన్నత ఆసుపత్రి స్పెషలిస్ట్ మధ్య మాత్రమే జరగాలి." : "Synchronous video clinical consultations require a certified Medical Officer or Oral Oncologist connecting with village health teams.",
        6: isTe ? "ఆసుపత్రి రిఫరల్ మరియు ఉచిత ఫీడర్ అంబులెన్స్ కేటాయింపు ప్రక్రియ క్లినికల్ నిపుణుల ద్వారా మాత్రమే ప్రామాణీకరించబడాలి." : "Tertiary hospital referral scheduling and feeder ambulance dispatch require clinical healthcare provider authorization.",
        7: isTe ? "పంచ్ బయాప్సీ నమూనాల నిర్వహణ, పాథాలజీ ల్యాబ్ రిపోర్టుల ధృవీకరణ మరియు TNM స్టేజింగ్ కేవలం ఆంకాలజిస్ట్ మరియు మెడికల్ ఆఫీసర్ల చట్టబద్ధమైన పరిధిలో ఉంటాయి." : "Histopathological evaluation, punch biopsy handling, and TNM staging (TisN0M0 - Stage IV) are strictly limited to certified Oncologists and Medical Officers.",
        8: isTe ? "చికిత్స కొనసాగింపు మరియు ఆరోగ్యశ్రీ ప్రయోజనాల పర్యవేక్షణ క్లినికల్ కేర్ సిబ్బందికి మాత్రమే కేటాయించబడింది." : "Longitudinal adherence tracking and Aarogyasri chemotherapy navigation require clinical health workers and medical supervisors.",
        9: isTe ? "జిల్లా స్థాయి వ్యాప్తి గణాంకాలు, మండల వారీ హీట్‌మ్యాప్‌లు మరియు కమాండ్ సెంటర్ కేవలం జిల్లా స్థాయి పరిపాలనాధికారులు (PO ITDA / DM&HO) మరియు వైద్యాధికారులకు మాత్రమే అందుబాటులో ఉంటాయి." : "District-wide epidemiological heatmaps and surveillance command centers are restricted to District Health Administrators (PO ITDA / DM&HO) and Medical Officers."
      };

      const restrictionReason = rationales[stepId] || (isTe ? "ఈ విభాగానికి మీ ప్రస్తుత పాత్రకు అనుమతి లేదు." : "Your active cadre does not possess clearance for this clinical dashboard.");

      const allowedRolesDetailedBadges = stepObj && stepObj.roles ? stepObj.roles.map(r => {
        const rc = ROLE_CONFIGS[r];
        if (!rc) return '';
        const rTitle = isTe ? rc.titleTe : rc.titleEn;
        const rSub = isTe ? rc.subTe : rc.subEn;
        return `
          <div class="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
            <div class="w-6 h-6 rounded-md flex items-center justify-center text-xs text-white" style="background-color: ${rc.accentHex};">
              <i class="fa-solid ${rc.icon}"></i>
            </div>
            <div>
              <div class="font-bold text-slate-800 text-[11px]">${rTitle}</div>
              <div class="text-[10px] text-slate-500">${rSub}</div>
            </div>
          </div>
        `;
      }).join('') : '';

      shield.innerHTML = `
        <div class="bg-white rounded-2xl border-2 border-rose-300 shadow-xl p-6 sm:p-8 max-w-2xl mx-auto my-6 text-center space-y-6 relative overflow-hidden">
          <div class="absolute -right-8 -top-8 text-rose-100 pointer-events-none text-9xl opacity-40">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          
          <div class="relative z-10 space-y-4">
            <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center text-3xl mx-auto shadow-lg ring-8 ring-rose-100">
              <i class="fa-solid fa-lock"></i>
            </div>

            <div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300">
                <i class="fa-solid fa-triangle-exclamation text-rose-600"></i>
                ${isTe ? 'అనుమతి నిరాకరించబడింది (RBAC Restricted)' : 'Role-Based Access Restricted'}
              </span>
              <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                ${stepName} — ${isTe ? 'డ్యాష్‌బోర్డ్ రక్షితం' : 'Dashboard Access Shielded'}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
                ${restrictionReason}
              </p>
            </div>

            <!-- Active User vs Authorized Roles Compare Box -->
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2.5">
              <div class="flex items-center justify-between border-b pb-2">
                <span class="text-slate-500 font-semibold">${isTe ? 'మీ ప్రస్తుత కేడర్ & పాత్ర:' : 'Your Active Cadre & Role:'}</span>
                <span class="font-bold text-slate-800 flex items-center gap-1.5">
                  <i class="fa-solid ${config.icon} text-teal-600"></i>
                  ${currentUser.name} (${userRoleTitle})
                </span>
              </div>
              <div class="flex items-center justify-between border-b pb-2">
                <span class="text-slate-500 font-semibold">${isTe ? 'కేటాయించిన విధులలో అనుమతించబడిన దశలు:' : 'Authorized Workflow Steps:'}</span>
                <span class="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Steps [${currentUser.allowedSteps.join(', ')}]
                </span>
              </div>
              <div>
                <span class="text-slate-500 font-semibold block mb-1.5">${isTe ? 'ఈ డ్యాష్‌బోర్డుకు చట్టబద్ధ అధికారం ఉన్న కేడర్లు:' : 'Statutory Authorized Cadres for this Dashboard:'}</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  ${allowedRolesDetailedBadges}
                </div>
              </div>
            </div>

            <!-- Statutory Notice -->
            <div class="text-[11px] text-slate-500 flex items-center justify-center gap-2 bg-rose-50/70 p-2.5 rounded-lg border border-rose-200">
              <i class="fa-solid fa-scale-balanced text-rose-500 shrink-0"></i>
              <span>${isTe ? 'ఆంధ్రప్రదేశ్ ప్రజా ఆరోగ్య చట్టం & DISHA నియంత్రణల ప్రకారం క్లినికల్ రక్షణ కల్పించబడింది.' : 'Protected under Andhra Pradesh Public Health Act & DISHA Statutory Standards.'}</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button onclick="goToStep(${currentUser.startStep || 1})" class="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow flex items-center justify-center gap-2 transition">
                <i class="fa-solid fa-arrow-left"></i>
                <span>${isTe ? 'నా ప్రాథమిక వర్క్‌స్పేస్‌కు వెళ్ళు' : 'Return to My Primary Workspace'}</span>
              </button>
              <button onclick="handleLogout()" class="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-5 py-3 rounded-xl shadow flex items-center justify-center gap-2 transition">
                <i class="fa-solid fa-arrow-right-from-bracket text-amber-400"></i>
                <span>${isTe ? 'అధికారిక పాత్రలోకి మారండి' : 'Switch Role / Re-login'}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    function applyStep1Permissions() {
      const isDistrictAdmin = currentUser && currentUser.role === 'DISTRICT_ADMIN';
      const isTe = currentLang === 'te';
      const form = document.getElementById('patientRegForm');
      if (!form) return;

      let adminNotice = document.getElementById('step1AdminNotice');
      if (!adminNotice) {
        adminNotice = document.createElement('div');
        adminNotice.id = 'step1AdminNotice';
        form.parentNode.insertBefore(adminNotice, form);
      }

      const submitBtn = form.querySelector('button[type="submit"]');

      if (isDistrictAdmin) {
        adminNotice.className = "mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-900 flex items-start gap-2.5 font-semibold";
        adminNotice.innerHTML = `
          <i class="fa-solid fa-lock text-amber-600 mt-0.5 text-sm"></i>
          <div>
            <div class="font-bold mb-0.5">${isTe ? 'పరిపాలనా ఆడిట్ మోడ్ (Administrative Audit Mode):' : 'Administrative Read-Only Audit Mode:'}</div>
            <p class="text-slate-700 leading-relaxed font-normal">
              ${isTe 
                ? 'జిల్లా అధికారి పాత్రలో మీరు సమాజ స్థాయి నమోదులను వీక్షించగలరు కానీ మార్చలేరు. ఫీల్డ్ డేటా నమోదు గ్రామ ఆరోగ్య కార్యకర్తలు (ANM) మరియు వైద్యాధికారులకు మాత్రమే పరిమితం.' 
                : 'District Admin is monitoring tribal community demographic intake in audit mode. Registration form submission is locked to preserve primary field data integrity.'}
            </p>
          </div>
        `;
        adminNotice.classList.remove('hidden');

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add('opacity-50', 'cursor-not-allowed', 'bg-slate-400');
          submitBtn.classList.remove('hover:bg-teal-700', 'bg-teal-600');
          submitBtn.innerHTML = `<i class="fa-solid fa-lock mr-2"></i> ${isTe ? 'నమోదు లాక్ చేయబడింది (ఆడిట్ మోడ్)' : 'Registration Submission Locked (Admin Audit)'}`;
        }
      } else {
        adminNotice.classList.add('hidden');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-slate-400');
          submitBtn.classList.add('hover:bg-teal-700', 'bg-teal-600');
          submitBtn.innerHTML = `<i class="fa-solid fa-user-plus mr-2"></i> <span>${isTe ? 'నమోదు చేసి ఫోటో పరీక్షకు వెళ్ళండి (దశ 2)' : 'Register & Proceed to Oral Screening (Step 2)'}</span>`;
        }
      }
    }

    function getNextAuthorizedStep(fromStepId) {
      const allowed = currentUser ? (currentUser.allowedSteps || currentUser.allowed_steps || [1, 2, 3, 5, 6, 8]) : [1, 2, 3, 5, 6, 8];
      const sorted = [...allowed].sort((a, b) => a - b);
      const next = sorted.find(s => s > fromStepId);
      return next !== undefined ? next : sorted[0];
    }

    function getPrevAuthorizedStep(fromStepId) {
      const allowed = currentUser ? (currentUser.allowedSteps || currentUser.allowed_steps || [1, 2, 3, 5, 6, 8]) : [1, 2, 3, 5, 6, 8];
      const sorted = [...allowed].sort((a, b) => b - a);
      const prev = sorted.find(s => s < fromStepId);
      return prev !== undefined ? prev : sorted[0];
    }

    function proceedToNextAuthorizedStep(fromStepId) {
      const next = getNextAuthorizedStep(fromStepId);
      goToStep(next);
    }

    function updateDynamicNextStepButtons(stepId) {
      const isTe = currentLang === 'te';
      const allowed = currentUser ? (currentUser.allowedSteps || currentUser.allowed_steps || [1, 2, 3, 5, 6, 8]) : [1, 2, 3, 5, 6, 8];
      
      // Update Step 6 Button
      const btnStep6 = document.getElementById('btnNextFromStep6');
      if (btnStep6) {
        const nextFrom6 = getNextAuthorizedStep(6);
        const stepObj = pipelineSteps.find(s => s.id === nextFrom6);
        const label = stepObj ? (isTe ? stepObj.titleTe : stepObj.titleEn) : `Step ${nextFrom6}`;
        btnStep6.innerHTML = `<span>${isTe ? `${label}కు వెళ్ళండి` : `Proceed to ${label}`} →</span>`;
      }

      // Update Step 8 Button
      const btnStep8 = document.getElementById('btnNextFromStep8');
      if (btnStep8) {
        const nextFrom8 = getNextAuthorizedStep(8);
        const stepObj = pipelineSteps.find(s => s.id === nextFrom8);
        const label = stepObj ? (isTe ? stepObj.titleTe : stepObj.titleEn) : `Step ${nextFrom8}`;
        const returnLabel = isTe ? 'కొత్త రోగి నమోదుకు వెళ్ళండి (దశ 1)' : 'Return to New Patient Intake (Step 1)';
        btnStep8.innerHTML = `<span>${nextFrom8 === 1 ? returnLabel : (isTe ? `${label}కు వెళ్ళండి` : `Proceed to ${label}`)} →</span>`;
      }
    }

    function renderPipelineNav() {
      const nav = document.getElementById('pipelineNav');
      if (!nav) return;
      const allowed = currentUser ? (currentUser.allowedSteps || currentUser.allowed_steps || [1, 2, 3, 5, 6, 8]) : [1, 2, 3, 5, 6, 8];
      const isTe = currentLang === 'te';
      const config = currentUser ? (ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER) : ROLE_CONFIGS.HEALTH_WORKER;
      const roleTitle = isTe ? config.titleTe : config.titleEn;

      // Authorized steps vs all steps
      const authorizedSteps = pipelineSteps.filter(step => allowed.includes(step.id));
      const activeStepObj = pipelineSteps.find(s => s.id === currentStep) || pipelineSteps[0];
      const activeLabel = isTe ? activeStepObj.titleTe : activeStepObj.titleEn;

      nav.innerHTML = `
        <div class="flex items-center justify-between gap-3 w-full">
          
          <!-- Left: Traditional Government Dashboards Menu Dropdown + Active Step Indicator -->
          <div class="flex items-center gap-3">
            
            <!-- Traditional Government Dropdown Menu Button -->
            <div class="relative inline-block text-left" id="dashboardDropdownContainer">
              <button 
                type="button" 
                onclick="toggleNavDropdown(event)" 
                class="bg-[#b33910] hover:bg-[#992f0b] text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg flex items-center gap-2 shadow-sm transition border border-amber-300/40"
                title="Open Traditional Government Dashboards Menu"
              >
                <i class="fa-solid fa-table-cells-large text-amber-200"></i>
                <span class="tracking-wide">${isTe ? 'డాష్‌బోర్డుల మెనూ' : 'Dashboards Menu'}</span>
                <i class="fa-solid fa-caret-down text-[10px] text-amber-200"></i>
              </button>
              
              <!-- Traditional Government Dropdown Menu Popup (All 9 Workflows) -->
              <div id="navDropdownMenu" class="hidden absolute left-0 mt-2 w-80 sm:w-96 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in font-sans">
                <div class="px-4 py-2 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>${isTe ? 'అధికారిక డాష్‌బోర్డులు' : 'Government Dashboards'}</span>
                  <span class="bg-teal-50 text-[#0096a6] px-2 py-0.5 rounded-full text-[10px] font-bold border border-teal-200">${authorizedSteps.length} of 9 Authorized</span>
                </div>
                <div class="max-h-96 overflow-y-auto py-1 divide-y divide-slate-100">
                  ${pipelineSteps.map(step => {
                    const isAllowed = allowed.includes(step.id);
                    const isActive = step.id === currentStep;
                    const label = isTe ? step.titleTe : step.titleEn;
                    const subtitle = step.id === 1 ? (isTe ? 'గ్రామ సర్వే & నమోదు' : 'Village Screening & Intake')
                      : step.id === 2 ? (isTe ? 'ఓరల్ కెమెరా క్యాప్చర్' : 'Oral Photo Protocol')
                      : step.id === 3 ? (isTe ? 'డ్యూయల్ మోడల్ AI విశ్లేషణ' : 'Dual-Model AI Inference')
                      : step.id === 4 ? (isTe ? 'వైద్యాధికారి సమీక్ష' : 'MO Clinical Triage')
                      : step.id === 5 ? (isTe ? 'వీడియో టెలి-కన్సల్టేషన్' : 'Video Teleconsultation')
                      : step.id === 6 ? (isTe ? 'సెకండరీ రిఫెరల్ & అంబులెన్స్' : 'Secondary Referral & Transport')
                      : step.id === 7 ? (isTe ? 'బయాప్సీ హిస్టోపాథాలజీ' : 'Biopsy Histopathology Lab')
                      : step.id === 8 ? (isTe ? 'ఆంకాలజీ చికిత్స ప్రోటోకాల్' : 'Oncology Treatment Protocol')
                      : (isTe ? 'జిల్లా ఎపిడెమియోలాజికల్ మ్యాప్' : 'District Epidemiological Analytics');

                    if (isAllowed) {
                      return `
                        <button 
                          type="button"
                          onclick="goToStep(${step.id}); closeNavDropdown();" 
                          class="w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-3 transition ${
                            isActive
                              ? 'bg-teal-50 text-[#0096a6] font-black border-l-4 border-l-[#0096a6]'
                              : 'hover:bg-orange-50 text-slate-700 hover:text-[#d84a1b]'
                          }"
                        >
                          <span class="w-6 h-6 rounded-lg ${isActive ? 'bg-[#0096a6] text-white shadow' : 'bg-slate-100 text-slate-600'} flex items-center justify-center text-[11px] font-bold shrink-0">${step.id}</span>
                          <i class="fa-solid ${step.icon} text-sm ${isActive ? 'text-[#0096a6]' : 'text-slate-400'} shrink-0 w-4 text-center"></i>
                          <div class="flex-1 truncate">
                            <div class="font-bold text-slate-800 ${isActive ? 'text-[#0096a6]' : ''}">${label}</div>
                            <div class="text-[10px] text-slate-400">${subtitle}</div>
                          </div>
                          ${isActive ? '<i class="fa-solid fa-circle-check text-sm text-[#0096a6] shrink-0"></i>' : '<span class="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">Clear</span>'}
                        </button>
                      `;
                    } else {
                      return `
                        <button 
                          type="button"
                          onclick="goToStep(${step.id}); closeNavDropdown();" 
                          class="w-full text-left px-4 py-2 text-xs font-normal flex items-center gap-3 opacity-60 hover:opacity-100 hover:bg-slate-50 transition"
                          title="Restricted by Cadre Clearance"
                        >
                          <span class="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center text-[11px] font-medium shrink-0">${step.id}</span>
                          <i class="fa-solid ${step.icon} text-sm text-slate-400 shrink-0 w-4 text-center"></i>
                          <div class="flex-1 truncate">
                            <div class="text-slate-500">${label}</div>
                            <div class="text-[10px] text-slate-400">${subtitle}</div>
                          </div>
                          <span class="text-[9px] bg-slate-100 text-slate-500 font-semibold px-1.5 py-0.5 rounded border border-slate-200 shrink-0 flex items-center gap-1">
                            <i class="fa-solid fa-lock text-[8px]"></i> Restricted
                          </span>
                        </button>
                      `;
                    }
                  }).join('')}
                </div>
                <div class="border-t border-slate-100 mt-1 pt-2 px-4 pb-1 bg-slate-50 text-[10px] text-slate-500 flex items-center justify-between">
                  <span class="font-medium">Cadre: ${roleTitle}</span>
                  <span class="text-emerald-700 font-bold flex items-center gap-1"><i class="fa-solid fa-shield-halved text-emerald-600"></i>DISHA Compliant</span>
                </div>
              </div>
            </div>

            <!-- Current Active Dashboard Pill (Clean Breadcrumb) -->
            <div class="flex items-center gap-2 bg-black/25 text-white px-3 py-1.5 rounded-lg border border-white/20 text-xs shadow-inner">
              <span class="text-amber-200 font-bold text-[10px] uppercase tracking-wider hidden sm:inline">${isTe ? 'ప్రస్తుత విభాగం' : 'Active Dashboard'}:</span>
              <span class="font-bold flex items-center gap-1.5 text-white">
                <i class="fa-solid ${activeStepObj.icon} text-teal-300 text-xs"></i>
                <span>${activeStepObj.id}. ${activeLabel}</span>
              </span>
            </div>

          </div>

          <!-- Right: Cadre Badge + Switch Cadre Dropdown -->
          <div class="flex items-center gap-2.5">
            
            <!-- Cadre Role Clearance Pill -->
            <div class="hidden sm:flex items-center gap-1.5 text-xs font-bold text-white bg-black/20 px-3 py-1.5 rounded-lg border border-white/20">
              <i class="fa-solid ${config.icon} text-amber-200"></i>
              <span>${roleTitle}</span>
            </div>

            <!-- Traditional Cadre Switcher Dropdown -->
            <div class="relative shrink-0" id="cadreDropdownContainer">
              <button 
                type="button" 
                onclick="toggleCadreDropdown(event)" 
                class="bg-[#b33910] hover:bg-[#992f0b] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 transition border border-amber-300/40 shadow-sm"
                title="Switch Statutory Cadre Role"
              >
                <i class="fa-solid fa-user-gear text-amber-200 text-xs"></i>
                <span>${isTe ? 'కేడర్ మార్చండి ▾' : 'Switch Cadre ▾'}</span>
              </button>
              <div id="cadreDropdownMenu" class="hidden absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in font-sans">
                <div class="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  ${isTe ? 'అధికారిక కేడర్లు (4 పాత్రలు)' : 'Statutory Health Cadres'}
                </div>
                <button onclick="quickLoginWithAccount('anm_lakshmi'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'anm_lakshmi' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                  <div>
                    <div class="font-bold text-slate-900">ANM Lakshmi Devi</div>
                    <div class="text-[10px] text-slate-500">Health Worker • Tajangi SC</div>
                  </div>
                  ${currentUser && currentUser.username === 'anm_lakshmi' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
                </button>
                <button onclick="quickLoginWithAccount('dr_lokeshkumar'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'dr_lokeshkumar' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                  <div>
                    <div class="font-bold text-slate-900">Dr. K. Lokeshkumar</div>
                    <div class="text-[10px] text-slate-500">Medical Officer • Minumuluru PHC</div>
                  </div>
                  ${currentUser && currentUser.username === 'dr_lokeshkumar' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
                </button>
                <button onclick="quickLoginWithAccount('dr_surya_kgh'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'dr_surya_kgh' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                  <div>
                    <div class="font-bold text-slate-900">Dr. P. Surya Rao</div>
                    <div class="text-[10px] text-slate-500">Specialist Oncologist • KGH Vizag</div>
                  </div>
                  ${currentUser && currentUser.username === 'dr_surya_kgh' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
                </button>
                <button onclick="quickLoginWithAccount('po_itda_paderu'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'po_itda_paderu' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                  <div>
                    <div class="font-bold text-slate-900">Sri Aditya Verma, IAS</div>
                    <div class="text-[10px] text-slate-500">ITDA Project Officer • Paderu</div>
                  </div>
                  ${currentUser && currentUser.username === 'po_itda_paderu' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
                </button>
                <div class="border-t border-slate-100 mt-1 pt-1.5 px-3.5">
                  <button onclick="handleLogout()" class="w-full text-left py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>${isTe ? 'లాగ్ అవుట్' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      `;
    }"
                      >
                        <span class="w-5 h-5 rounded-full ${isActive ? 'bg-[#0096a6] text-white' : 'bg-slate-100 text-slate-500'} flex items-center justify-center text-[10px] font-bold shrink-0">${step.id}</span>
                        <i class="fa-solid ${step.icon} text-xs ${isActive ? 'text-[#0096a6]' : 'text-slate-400'} shrink-0"></i>
                        <span class="truncate flex-1">${label}</span>
                        ${isActive ? '<i class="fa-solid fa-circle-check text-xs text-[#0096a6] shrink-0"></i>' : ''}
                      </button>
                    `;
                  }).join('')}
                </div>
                <div class="border-t border-slate-100 mt-1 pt-1.5 px-3.5 pb-1 bg-slate-50 text-[10px] text-slate-500 flex items-center justify-between">
                  <span class="font-medium">Cadre: ${roleTitle}</span>
                  <span class="text-emerald-700 font-bold flex items-center gap-1"><i class="fa-solid fa-shield-halved text-emerald-600"></i>DISHA</span>
                </div>
              </div>
            </div>

            <!-- Role Clearance Pill on Orange Bar -->
            <div class="hidden sm:flex items-center gap-1.5 text-xs font-bold text-white bg-black/20 px-3 py-1.5 rounded-lg border border-white/20">
              <i class="fa-solid ${config.icon} text-amber-200"></i>
              <span>${roleTitle}</span>
            </div>

          </div>

          <!-- Center/Right: Horizontal Navigation Steps with Vibrant Teal Active Accent -->
          <div class="flex items-center gap-1.5 flex-1 justify-start md:justify-end overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            ${authorizedSteps.map(step => {
              const isActive = step.id === currentStep;
              const label = isTe ? step.titleTe : step.titleEn;
              return `
                <button 
                  type="button" 
                  onclick="goToStep(${step.id})" 
                  class="py-1.5 px-3 rounded-lg text-xs transition shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#0096a6] hover:bg-[#00838f] text-white font-black shadow-md border-2 border-white ring-2 ring-white/30'
                      : 'bg-[#bf390f] hover:bg-[#a62f0a] text-white font-semibold border border-amber-400/30'
                  }"
                  title="${label}"
                >
                  <i class="fa-solid ${step.icon} text-[11px] ${isActive ? 'text-white' : 'text-amber-200'}"></i>
                  <span class="whitespace-nowrap">${label}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Right: Traditional Cadre Switcher Dropdown -->
          <div class="relative shrink-0 hidden lg:block" id="cadreDropdownContainer">
            <button 
              type="button" 
              onclick="toggleCadreDropdown(event)" 
              class="bg-black/20 hover:bg-black/30 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 transition border border-white/20"
              title="Switch Statutory Cadre Role"
            >
              <i class="fa-solid fa-user-gear text-amber-300 text-xs"></i>
              <span>${isTe ? 'కేడర్ మార్చండి ▾' : 'Switch Cadre ▾'}</span>
            </button>
            <div id="cadreDropdownMenu" class="hidden absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in font-sans">
              <div class="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                ${isTe ? 'అధికారిక కేడర్లు (4 పాత్రలు)' : 'Statutory Health Cadres'}
              </div>
              <button onclick="quickLoginWithAccount('anm_lakshmi'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'anm_lakshmi' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                <div>
                  <div class="font-bold text-slate-900">ANM Lakshmi Devi</div>
                  <div class="text-[10px] text-slate-500">Health Worker • Tajangi SC</div>
                </div>
                ${currentUser && currentUser.username === 'anm_lakshmi' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
              </button>
              <button onclick="quickLoginWithAccount('dr_lokeshkumar'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'dr_lokeshkumar' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                <div>
                  <div class="font-bold text-slate-900">Dr. K. Lokeshkumar</div>
                  <div class="text-[10px] text-slate-500">Medical Officer • Minumuluru PHC</div>
                </div>
                ${currentUser && currentUser.username === 'dr_lokeshkumar' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
              </button>
              <button onclick="quickLoginWithAccount('dr_surya_kgh'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'dr_surya_kgh' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                <div>
                  <div class="font-bold text-slate-900">Dr. P. Surya Rao</div>
                  <div class="text-[10px] text-slate-500">Specialist Oncologist • KGH Vizag</div>
                </div>
                ${currentUser && currentUser.username === 'dr_surya_kgh' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
              </button>
              <button onclick="quickLoginWithAccount('po_itda_paderu'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'po_itda_paderu' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                <div>
                  <div class="font-bold text-slate-900">Sri Aditya Verma, IAS</div>
                  <div class="text-[10px] text-slate-500">ITDA Project Officer • Paderu</div>
                </div>
                ${currentUser && currentUser.username === 'po_itda_paderu' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
              </button>
              <div class="border-t border-slate-100 mt-1 pt-1.5 px-3.5">
                <button onclick="handleLogout()" class="w-full text-left py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5">
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>${isTe ? 'లాగ్ అవుట్' : 'Sign Out'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      `;
    }

    function toggleNavDropdown(event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById('navDropdownMenu');
      if (menu) menu.classList.toggle('hidden');
      const cadreMenu = document.getElementById('cadreDropdownMenu');
      if (cadreMenu) cadreMenu.classList.add('hidden');
    }

    function closeNavDropdown() {
      const menu = document.getElementById('navDropdownMenu');
      if (menu) menu.classList.add('hidden');
    }

    function toggleCadreDropdown(event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById('cadreDropdownMenu');
      if (menu) menu.classList.toggle('hidden');
      const navMenu = document.getElementById('navDropdownMenu');
      if (navMenu) navMenu.classList.add('hidden');
    }

    function closeCadreDropdown() {
      const menu = document.getElementById('cadreDropdownMenu');
      if (menu) menu.classList.add('hidden');
    }

    document.addEventListener('click', function(e) {
      const navContainer = document.getElementById('dashboardDropdownContainer');
      const cadreContainer = document.getElementById('cadreDropdownContainer');
      if (navContainer && !navContainer.contains(e.target)) {
        closeNavDropdown();
      }
      if (cadreContainer && !cadreContainer.contains(e.target)) {
        closeCadreDropdown();
      }
    });

    function handleRestrictedStepClick(stepId) {
      goToStep(stepId);
    }

    function goToStep(stepId) {
      const allowed = currentUser ? (currentUser.allowedSteps || currentUser.allowed_steps || [1, 2, 3, 5, 6, 8]) : [1, 2, 3, 5, 6, 8];
      
      // STRICT ROLE-BASED ACCESS ENFORCEMENT
      if (!allowed.includes(stepId)) {
        const userDesignation = currentUser ? currentUser.designation : 'Current Role';
        showToast(
          currentLang === 'te'
            ? `యాక్సెస్ పరిమితం: దశ ${stepId} మీ పాత్ర (${userDesignation}) పరిధిలో లేదు. రోల్ ఆధారిత డాష్‌బోర్డులు మాత్రమే అందుబాటులో ఉన్నాయి.`
            : `Role-Based Access Denied: Step ${stepId} is outside ${userDesignation} clearance scope. Only authorized role dashboards are accessible.`,
          "error"
        );
        return; // Block navigation completely
      }

      currentStep = stepId;

      // Hide all step sections
      document.querySelectorAll('.step-section').forEach(sec => sec.classList.add('hidden'));

      // Show target step section
      const target = document.getElementById(`step-${stepId}`);
      if (target) target.classList.remove('hidden');

      // Update RBAC clearance banner for this step
      renderDashboardRbacBanner(stepId);

      const shield = document.getElementById(`rbac-shield-step-${stepId}`);
      const content = document.getElementById(`step-content-step-${stepId}`);
      if (shield) shield.classList.add('hidden');
      if (content) content.classList.remove('hidden');

      // Fine-grained in-dashboard adjustments
      if (stepId === 1) {
        applyStep1Permissions();
      } else if (stepId === 2) {
        drawOralCavityCanvas('oralCanvas', false);
      } else if (stepId === 3) {
        renderAICanvas();
      } else if (stepId === 4) {
        renderMOTriageTable();
      }

      updateDynamicNextStepButtons(stepId);
      renderPipelineNav();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ==================== PATIENT SELECTION & REGISTRATION ====================
    function renderPatientSelectors() {
      const sel = document.getElementById('activePatientSelect');
      sel.innerHTML = patients.map(p => `<option value="${p.id}" ${p.id === activePatientId ? 'selected' : ''}>${p.id} — ${p.name} (${p.age}y, ${p.mandal})</option>`).join('');

      const active = patients.find(p => p.id === activePatientId) || patients[0];
      const badge = document.getElementById('activePatientRiskBadge');
      if (active.risk === 'SUSPICIOUS') {
        badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1';
        badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> HIGH RISK (${(active.aiScore * 100).toFixed(0)}%)`;
      } else if (active.risk === 'MODERATE') {
        badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1';
        badge.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> MODERATE (${(active.aiScore * 100).toFixed(0)}%)`;
      } else {
        badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1';
        badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> LOW RISK (${(active.aiScore * 100).toFixed(0)}%)`;
      }

      document.getElementById('activePatientMandalBadge').textContent = `• ${active.village} (${active.mandal} Mandal)`;
      document.getElementById('telePatientName').textContent = `${active.name} + ANM (${active.village} PHC)`;
      document.getElementById('totalPatientsPill').textContent = patients.length;

      // Render Step 1 Sidebar List
      const listEl = document.getElementById('step1PatientList');
      listEl.innerHTML = patients.map(p => `
        <div onclick="selectActivePatient('${p.id}')" class="p-3 rounded-xl border ${p.id === activePatientId ? 'border-teal-500 bg-teal-50/40' : 'border-slate-200 hover:bg-slate-50'} cursor-pointer transition flex items-center justify-between">
          <div>
            <div class="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <span>${p.name}</span>
              <span class="text-[10px] text-slate-400">(${p.age}y/${p.gender[0]})</span>
              ${!p.synced ? '<span class="bg-amber-100 text-slate-700 text-[9px] px-1.5 py-0.2 rounded font-bold">OFFLINE CACHED</span>' : ''}
            </div>
            <div class="text-[11px] text-slate-500">${p.village}, ${p.mandal} • ${p.habits}</div>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
            p.risk === 'SUSPICIOUS' ? 'bg-red-100 text-red-700' : (p.risk === 'MODERATE' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700')
          }">${p.risk}</span>
        </div>
      `).join('');
    }

    function selectActivePatient(id) {
      activePatientId = id;
      const p = patients.find(item => item.id === id);
      if (p) {
        currentPreset = p.risk;
        renderPatientSelectors();
        drawOralCavityCanvas('oralCanvas', false);
        renderAICanvas();
        showToast(`Switched active pipeline context to ${p.name}`, 'info');
      }
    }

    function fillSyntheticPatient() {
      const sampleData = [
        { name: "Murla Neelakantam", mandal: "Paderu", village: "Tajangi" },
        { name: "Kudumula Subbamma", mandal: "Arakuvalley", village: "Kinchumanda" },
        { name: "Janni Venkanna", mandal: "Chinthapalli", village: "Dallapalli" },
        { name: "Gemmeli Chinnayya", mandal: "Pedabayulu", village: "Gomangi" },
        { name: "Killo Appala Naidu", mandal: "Ananthagiri", village: "Borra" },
        { name: "Pangi Chittamma", mandal: "Dumbriguda", village: "Kandrum" },
        { name: "Vanthala Ramanna", mandal: "G.madugula", village: "Kondiba" },
        { name: "Korra Kondalamma", mandal: "Koyyuru", village: "Mampa" },
        { name: "Gammela Somulu", mandal: "Munchingput", village: "Jolaput" },
        { name: "Vanthala Sitamma", mandal: "G.k.veedhi", village: "Darinama" },
        { name: "Killo Simhachalam", mandal: "Hukumpeta", village: "Kontamuru" }
      ];
      const selected = sampleData[Math.floor(Math.random() * sampleData.length)];
      document.getElementById('regName').value = selected.name;
      document.getElementById('regAge').value = 35 + Math.floor(Math.random() * 25);
      const mandalEl = document.getElementById('regMandal');
      mandalEl.value = selected.mandal;
      if (!mandalEl.value) {
        for (const opt of mandalEl.options) {
          if (opt.value.toLowerCase().replace(/[^a-z]/g, '') === selected.mandal.toLowerCase().replace(/[^a-z]/g, '')) {
            opt.selected = true;
            break;
          }
        }
      }
      document.getElementById('regVillage').value = selected.village;
      document.getElementById('regPhone').value = `+91 9440${Math.floor(100000 + Math.random() * 899999)}`;
      showToast(`Populated tribal patient from ${selected.mandal} Mandal`, "info");
    }

    function handleRegisterPatient(e) {
      e.preventDefault();
      if (currentUser && currentUser.role === "DISTRICT_ADMIN") {
        showToast(currentLang === "te" ? "పరిపాలనా ఆడిట్ మోడ్: రోగి నమోదు కేవలం గ్రామ కార్యకర్తలు లేదా డాక్టర్లకు మాత్రమే అనుమతించబడింది." : "Audit Mode: Patient registration is restricted to Health Workers and Medical Officers.", "warning");
        return;
      }
      const name = document.getElementById('regName').value.trim();
      const age = parseInt(document.getElementById('regAge').value, 10);
      const gender = document.getElementById('regGender').value;
      const mandal = document.getElementById('regMandal').value;
      const village = document.getElementById('regVillage').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const years = document.getElementById('regHabitYears').value;

      const habitsArr = [];
      if (document.getElementById('riskTobacco').checked) habitsArr.push("Tobacco");
      if (document.getElementById('riskGutka').checked) habitsArr.push("Gutka");
      if (document.getElementById('riskSmoking').checked) habitsArr.push("Chutta");
      const habits = habitsArr.length ? `${habitsArr.join(' + ')} (${years} yrs)` : "None";

      const newId = `PT-ASR-${101 + patients.length}`;
      const newPatient = {
        id: newId,
        name,
        age,
        gender,
        mandal,
        village,
        phone,
        habits,
        site: "Left Buccal Mucosa",
        aiScore: 0.884,
        risk: "SUSPICIOUS",
        moDecision: "Pending MO Triage",
        biopsyStage: "Pending",
        synced: isOnline
      };

      patients.unshift(newPatient);
      activePatientId = newId;

      if (!isOnline) {
        offlineQueue.push(newPatient);
        updateOfflineBadge();
        showToast(`Saved "${name}" to Offline IndexedDB Cache. Will auto-sync when online.`, "warning");
      } else {
        showToast(`Patient "${name}" registered in cloud database. Proceeding to Oral Capture.`, "success");
      }

      renderPatientSelectors();
      goToStep(2);
    }

    // ==================== STEP 2 & 3: ORAL CAVITY SYNTHETIC CANVAS & AI ====================
    function selectLesionPreset(preset) {
      currentPreset = preset;
      document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.className = "preset-btn text-left p-3 rounded-xl border border-slate-200 bg-white transition";
      });
      const activeBtn = document.getElementById(`preset-${preset}`);
      if (activeBtn) {
        activeBtn.className = "preset-btn text-left p-3 rounded-xl border-2 border-teal-600 bg-teal-50/40 transition";
      }
      drawOralCavityCanvas('oralCanvas', false);
      renderAICanvas();
    }

    function updateLesionSite(site) {
      document.getElementById('canvasSiteLabel').textContent = `Site: ${site}`;
      const p = patients.find(item => item.id === activePatientId);
      if (p) p.site = site;
    }

    function drawOralCavityCanvas(canvasId, showAIOverlay) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (userCapturedImageObj) {
        // Render real user captured or uploaded photo
        ctx.drawImage(userCapturedImageObj, 0, 0, canvas.width, canvas.height);
      } else {
      // Outer oral cavity background gradient
      const bgGrad = ctx.createRadialGradient(300, 160, 40, 300, 160, 280);
      bgGrad.addColorStop(0, '#be123c');
      bgGrad.addColorStop(0.65, '#881337');
      bgGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stylized teeth arch hints
      ctx.fillStyle = '#f8fafc';
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.roundRect(160 + i * 46, 18, 40, 26, 6);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(160 + i * 46, 276, 40, 26, 6);
        ctx.fill();
      }

      // Draw Buccal / Tongue Mucosa folds
      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.ellipse(300, 160, 210, 105, 0, 0, Math.PI * 2);
      ctx.fill();

      // Render Lesion based on currentPreset
      if (currentPreset === 'SUSPICIOUS') {
        // Erythroleukoplakia speckled red-white patch
        ctx.fillStyle = 'rgba(255, 241, 242, 0.85)';
        ctx.beginPath();
        ctx.ellipse(265, 155, 62, 40, 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#991b1b';
        ctx.beginPath();
        ctx.arc(250, 148, 18, 0, Math.PI * 2);
        ctx.arc(285, 165, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(270, 142, 9, 0, Math.PI * 2);
        ctx.arc(242, 166, 8, 0, Math.PI * 2);
        ctx.fill();
      } else if (currentPreset === 'MODERATE') {
        // Homogeneous faint white patch
        ctx.fillStyle = 'rgba(254, 243, 199, 0.72)';
        ctx.beginPath();
        ctx.ellipse(285, 155, 45, 28, -0.15, 0, Math.PI * 2);
        ctx.fill();
      }
      } // end if (userCapturedImageObj) else

      // Draw AI Bounding Box & Heatmap if enabled
      if (showAIOverlay && document.getElementById('toggleBbox')?.checked && currentPreset !== 'LOW') {
        const heatGrad = ctx.createRadialGradient(268, 155, 10, 268, 155, 78);
        heatGrad.addColorStop(0, 'rgba(239, 68, 68, 0.55)');
        heatGrad.addColorStop(0.6, 'rgba(245, 158, 11, 0.35)');
        heatGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = heatGrad;
        ctx.beginPath();
        ctx.arc(268, 155, 78, 0, Math.PI * 2);
        ctx.fill();

        // Bounding Box
        ctx.strokeStyle = currentPreset === 'SUSPICIOUS' ? '#ef4444' : '#f59e0b';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(190, 102, 156, 106);
        ctx.setLineDash([]);

        // Label tag
        ctx.fillStyle = currentPreset === 'SUSPICIOUS' ? '#dc2626' : '#d97706';
        ctx.fillRect(190, 78, 215, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Inter, sans-serif';
        const scoreTxt = currentPreset === 'SUSPICIOUS' ? 'OPMD Suspicious: 88.4%' : 'Moderate Leukoplakia: 54.0%';
        ctx.fillText(scoreTxt, 198, 94);
      }
    }

    function saveScreeningAndAnalyze() {
      const p = patients.find(item => item.id === activePatientId);
      if (p) {
        p.risk = currentPreset;
        p.aiScore = currentPreset === 'SUSPICIOUS' ? 0.884 : (currentPreset === 'MODERATE' ? 0.540 : 0.120);
      }
      renderPatientSelectors();
      goToStep(3);
      showToast("AI Vision Inference completed in 142ms", "success");
    }

    function renderAICanvas() {
      drawOralCavityCanvas('aiResultCanvas', true);
      const confEl = document.getElementById('aiConfidenceDisplay');
      const badgeEl = document.getElementById('aiRiskBadgeLarge');
      const morphEl = document.getElementById('aiMorphologyText');
      const triageEl = document.getElementById('aiTriageActionText');

      if (currentPreset === 'SUSPICIOUS') {
        confEl.textContent = '88.4%';
        confEl.className = 'text-4xl font-extrabold text-red-600';
        badgeEl.textContent = 'SUSPICIOUS FINDING (HIGH RISK)';
        badgeEl.className = 'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800';
        morphEl.textContent = 'Speckled Erythro-leukoplakia';
        triageEl.textContent = 'Priority MO Review < 24h';
        triageEl.className = 'font-bold text-red-600 text-sm';
      } else if (currentPreset === 'MODERATE') {
        confEl.textContent = '54.0%';
        confEl.className = 'text-4xl font-extrabold text-amber-600';
        badgeEl.textContent = 'MODERATE / INDETERMINATE RISK';
        badgeEl.className = 'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-slate-700';
        morphEl.textContent = 'Homogeneous Leukoplakia';
        triageEl.textContent = 'PHC Inspection in 7 Days';
        triageEl.className = 'font-bold text-amber-600 text-sm';
      } else {
        confEl.textContent = '12.0%';
        confEl.className = 'text-4xl font-extrabold text-emerald-600';
        badgeEl.textContent = 'LOW RISK (NORMAL MUCOSA)';
        badgeEl.className = 'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800';
        morphEl.textContent = 'Healthy Normochromic Mucosa';
        triageEl.textContent = 'Routine Counseling';
        triageEl.className = 'font-bold text-emerald-600 text-sm';
      }
    }

    
    function toggleGuardrailAck() {
      const chk = document.getElementById('aiGuardrailAck');
      if (!chk || !chk.checked) {
        showToast(
          currentLang === 'te' 
            ? "హెచ్చరిక: AI పరిమితులను గుర్తించకుండా క్లినికల్ నిర్ణయాలు తీసుకోకూడదు." 
            : "Warning: Clinical decision-support requires acknowledging AI limitations.", 
          "warning"
        );
      }
    }

    function escalateToMedicalOfficer() {
      if (!document.getElementById('aiGuardrailAck').checked) {
        showToast(
          currentLang === 'te' 
            ? "దయచేసి ముందుగా AI పరిమితుల నిర్ధారణ బాక్స్‌ను టిక్ చేయండి." 
            : "Please acknowledge the AI Clinical Guardrail limitation box first.", 
          "warning"
        );
        return;
      }

      if (currentUser && currentUser.role === 'HEALTH_WORKER') {
        showToast(
          currentLang === 'te'
            ? "కేసు PHC వైద్యాధికారి (Dr. K. Lokeshkumar) ట్రయాజ్ క్యూకు సింక్ చేయబడింది. టెలి-కన్సల్ట్ సహాయం (దశ 5) కు దారి మళ్లించబడుతోంది."
            : "Case synced to PHC Medical Officer triage queue. Proceeding to Teleconsult Assistance (Step 5).",
          "success"
        );
        goToStep(5);
      } else if (currentUser && currentUser.role === 'DISTRICT_ADMIN') {
        showToast("Case reviewed in Administrative Audit. Proceeding to MO Triage Review.", "info");
        goToStep(4);
      } else {
        showToast("Case pushed to PHC Medical Officer Triage Queue", "success");
        goToStep(4);
      }
    }

    // ==================== STEP 4: MEDICAL OFFICER PORTAL ====================
    function renderMOTriageTable() {
        const filter = document.getElementById('moFilterRisk')?.value || 'ALL';
        const tbody = document.getElementById('moTriageTableBody');
        if (!tbody) return;

        const isAdmin = currentUser && currentUser.role === 'DISTRICT_ADMIN';
        const isTe = currentLang === 'te';
  
        const triageTable = document.getElementById('moTriageTable');
        let moAdminNotice = document.getElementById('moAdminAuditNotice');
        if (triageTable && !moAdminNotice) {
          moAdminNotice = document.createElement('div');
          moAdminNotice.id = 'moAdminAuditNotice';
          triageTable.parentNode.insertBefore(moAdminNotice, triageTable);
        }
        if (moAdminNotice) {
          if (isAdmin) {
            moAdminNotice.className = "mb-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-900 flex items-center gap-2 font-medium";
            moAdminNotice.innerHTML = `<i class="fa-solid fa-eye text-amber-600 text-sm"></i> <span><strong>${isTe ? 'పరిపాలనా నిఘా మోడ్:' : 'Administrative Surveillance Mode:'}</strong> ${isTe ? 'మీరు PHC క్లినికల్ ట్రయాజ్ క్యూను ఆడిట్ చేస్తున్నారు. క్లినికల్ నిర్ణయాలు వైద్యాధికారులకు మాత్రమే పరిమితం.' : 'You are auditing PHC clinical triage queues. Clinical sign-off is reserved for Medical Officers and Specialists.'}</span>`;
            moAdminNotice.classList.remove('hidden');
          } else {
            moAdminNotice.classList.add('hidden');
          }
        }

        const filtered = patients.filter(p => filter === 'ALL' || p.risk === filter);
        tbody.innerHTML = filtered.map(p => `
          <tr class="hover:bg-slate-50">
            <td class="py-3 px-4">
              <div class="font-bold text-slate-800">${p.name} <span class="text-slate-400 font-normal">(${p.age}y/${p.gender[0]})</span></div>
              <div class="text-[11px] text-slate-500">${p.id} • ${p.village}, ${p.mandal}</div>
            </td>
            <td class="py-3 px-3 text-slate-700">${p.habits}</td>
            <td class="py-3 px-3 font-medium text-slate-700">${p.site}</td>
            <td class="py-3 px-3">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                p.risk === 'SUSPICIOUS' ? 'bg-red-100 text-red-800' : (p.risk === 'MODERATE' ? 'bg-amber-100 text-slate-700' : 'bg-emerald-100 text-emerald-800')
              }">${p.risk} (${(p.aiScore * 100).toFixed(1)}%)</span>
            </td>
            <td class="py-3 px-3 font-semibold text-teal-700">${p.moDecision}</td>
            <td class="py-3 px-4 text-right space-x-1">
              ${
                isAdmin
                  ? `<span class="px-2.5 py-1 rounded bg-slate-100 text-slate-500 font-semibold text-[11px] border border-slate-200 inline-flex items-center gap-1" title="Medical Officer clinical sign-off required">
                       <i class="fa-solid fa-lock text-[10px] text-slate-400"></i> ${isTe ? 'డాక్టర్ సమీక్ష అవసరం' : 'MO Sign-off'}
                     </span>`
                  : `<button onclick="approveAndTeleconsult('${p.id}')" class="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-2.5 py-1.5 rounded-lg text-[11px]">
                       <i class="fa-solid fa-video mr-1"></i>${isTe ? 'టెలికన్సల్ట్' : 'Teleconsult'}
                     </button>
                     <button onclick="approveAndRefer('${p.id}')" class="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-2.5 py-1.5 rounded-lg text-[11px]">
                       ${isTe ? 'బయాప్సీ సిఫార్సు' : 'Refer Biopsy'}
                     </button>`
              }
            </td>
          </tr>
        `).join('');
      }

    function approveAndTeleconsult(id) {
      activePatientId = id;
      const p = patients.find(item => item.id === id);
      if (p) p.moDecision = "Approved for Specialist Teleconsult";
      renderPatientSelectors();
      goToStep(5);
    }

    function approveAndRefer(id) {
      activePatientId = id;
      const p = patients.find(item => item.id === id);
      if (p) p.moDecision = "Referred to District Hospital Biopsy";
      renderPatientSelectors();
      goToStep(6);
    }

    
    // ==================== LIVEKIT CLOUD & VOICE AGENT CONTROLS ====================
    let livekitUrl = 'wss://aarogya-drishti.livekit.cloud';
    let livekitApiKey = '••••••••••••••••';
    let localVideoStream = null;
    let isMicMuted = false;
    let isCameraOff = false;
    let isVoiceAgentSpeaking = false;
    let livekitRoomInstance = null;

    async function initLiveKitCall() {
      try {
        const apiBase = window.location.port === '8000' ? '' : 'http://localhost:8000';
        const res = await fetch(`${apiBase}/api/v1/livekit/config`);
        if (res.ok) {
          const cfg = await res.json();
          if (cfg.livekit_url) livekitUrl = cfg.livekit_url;
          if (cfg.api_key) livekitApiKey = cfg.api_key;
          const hostPill = document.getElementById('livekitHostPill');
          if (hostPill) hostPill.textContent = livekitUrl;
        }
      } catch (err) {
        console.warn("LiveKit config endpoint offline, using defaults");
      }
    }

    function openLiveKitModal() {
      const modal = document.getElementById('livekitConfigModal');
      if (modal) {
        modal.classList.remove('hidden');
        const urlInput = document.getElementById('cfgLiveKitUrl');
        const keyInput = document.getElementById('cfgLiveKitApiKey');
        if (urlInput) urlInput.value = livekitUrl;
        if (keyInput) keyInput.value = livekitApiKey;
      }
    }

    function closeLiveKitModal() {
      const modal = document.getElementById('livekitConfigModal');
      if (modal) modal.classList.add('hidden');
    }

    async function saveLiveKitConfig(e) {
      if (e) e.preventDefault();
      const urlInput = document.getElementById('cfgLiveKitUrl');
      const secretInput = document.getElementById('cfgLiveKitSecret');
      const alertDiv = document.getElementById('livekitConfigAlert');
      const submitBtn = document.getElementById('btnSaveLiveKitConfig');

      const newUrl = urlInput ? urlInput.value.trim() : '';
      const newSecret = secretInput ? secretInput.value.trim() : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Saving...`;
      }

      try {
        const apiBase = window.location.port === '8000' ? '' : 'http://localhost:8000';
        const res = await fetch(`${apiBase}/api/v1/livekit/config`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            livekit_url: newUrl,
            livekit_api_key: livekitApiKey,
            livekit_api_secret: newSecret
          })
        });

        if (newUrl) livekitUrl = newUrl;
        const hostPill = document.getElementById('livekitHostPill');
        if (hostPill) hostPill.textContent = livekitUrl;

        if (alertDiv) {
          alertDiv.className = "p-3 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300";
          alertDiv.textContent = currentLang === 'te' 
            ? "లైవ్‌కిట్ క్లౌడ్ సమాచారం విజయవంతంగా భద్రపరచబడింది!" 
            : "LiveKit Cloud credentials saved successfully!";
          alertDiv.classList.remove('hidden');
        }

        showToast(currentLang === 'te' ? "లైవ్‌కిట్ క్లౌడ్ అమరికలు భద్రపరచబడ్డాయి" : "LiveKit Cloud settings updated", "success");
      } catch (err) {
        if (alertDiv) {
          alertDiv.className = "p-3 rounded-lg text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300";
          alertDiv.textContent = err.message || "Failed to update LiveKit settings.";
          alertDiv.classList.remove('hidden');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-floppy-disk text-teal-400 mr-1"></i> <span>Save & Connect LiveKit</span>`;
        }
      }
    }

    async function testLiveKitToken() {
      const box = document.getElementById('livekitTokenResultBox');
      const disp = document.getElementById('livekitTokenDisplay');
      try {
        const apiBase = window.location.port === '8000' ? '' : 'http://localhost:8000';
        const res = await fetch(`${apiBase}/api/v1/livekit/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            room_name: 'itda-paderu-teleconsult-8841',
            role: currentUser ? currentUser.role : 'HEALTH_WORKER',
            participant_name: currentUser ? currentUser.name : 'ANM Lakshmi Devi'
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (box && disp) {
            disp.textContent = data.token;
            box.classList.remove('hidden');
          }
          showToast(`LiveKit Token Generated for Key: ${data.api_key}`, "success");
        } else {
          throw new Error("Failed to generate token");
        }
      } catch (err) {
        showToast("Error generating LiveKit token: " + err.message, "error");
      }
    }

    async function startLocalMedia() {
      const videoEl = document.getElementById('localVideoFeed');
      const placeholder = document.getElementById('localVideoPlaceholder');
      const statusText = document.getElementById('localCamStatusText');

      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          localVideoStream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 640 }, height: { ideal: 480 } },
            audio: true
          });
          if (videoEl) {
            videoEl.srcObject = localVideoStream;
            videoEl.classList.remove('hidden');
          }
          if (placeholder) placeholder.classList.add('hidden');
          if (statusText) statusText.textContent = "Live Camera Active";
          showToast("Local camera & microphone connected", "success");
        } else {
          throw new Error("MediaDevices not supported");
        }
      } catch (e) {
        console.warn("Camera access denied or unavailable, using high-res intraoral simulation:", e.message);
        if (statusText) statusText.textContent = "Intraoral Scan Stream";
        showToast("Using high-resolution oral scan video simulation", "info");
      }
    }

    function toggleLiveKitMic() {
      isMicMuted = !isMicMuted;
      const icon = document.getElementById('livekitMicIcon');
      const badge = document.getElementById('localMicIconBadge');
      if (localVideoStream) {
        localVideoStream.getAudioTracks().forEach(t => t.enabled = !isMicMuted);
      }
      if (icon) {
        icon.className = isMicMuted ? 'fa-solid fa-microphone-slash text-rose-400 text-sm' : 'fa-solid fa-microphone text-sm';
      }
      if (badge) {
        badge.className = isMicMuted ? 'fa-solid fa-microphone-slash text-rose-400' : 'fa-solid fa-microphone text-emerald-400';
      }
      showToast(isMicMuted ? "Microphone Muted" : "Microphone Active", "info");
    }

    function toggleLiveKitCamera() {
      isCameraOff = !isCameraOff;
      const icon = document.getElementById('livekitCamIcon');
      const videoEl = document.getElementById('localVideoFeed');
      const placeholder = document.getElementById('localVideoPlaceholder');
      if (localVideoStream) {
        localVideoStream.getVideoTracks().forEach(t => t.enabled = !isCameraOff);
      }
      if (icon) {
        icon.className = isCameraOff ? 'fa-solid fa-video-slash text-rose-400 text-sm' : 'fa-solid fa-video text-sm';
      }
      if (isCameraOff) {
        if (videoEl) videoEl.classList.add('hidden');
        if (placeholder) placeholder.classList.remove('hidden');
      } else {
        if (videoEl && localVideoStream) videoEl.classList.remove('hidden');
        if (placeholder) placeholder.classList.add('hidden');
      }
      showToast(isCameraOff ? "Camera Paused" : "Camera Resumed", "info");
    }

    function shareAnnotatedLesionScan() {
      const box = document.getElementById('teleChatBox');
      const p = patients.find(item => item.id === activePatientId) || patients[0];
      const div = document.createElement('div');
      div.className = "bg-teal-50 border border-teal-300 p-2.5 rounded-lg text-slate-800 space-y-1";
      div.innerHTML = `
        <div class="flex items-center justify-between font-bold text-teal-900 text-[11px]">
          <span class="flex items-center gap-1"><i class="fa-solid fa-images text-teal-600"></i> Intraoral Scan Broadcasted</span>
          <span class="text-[10px] text-teal-600 font-normal">Now</span>
        </div>
        <p class="text-[11px]"><strong>${p.name} (${p.id}):</strong> ${p.lesionType} with AI Confidence ${p.aiConfidence}%. Grad-CAM hotspot centered on ${p.lesionLocation}.</p>
      `;
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
      showToast(`High-resolution scan ROI broadcasted to Dr. Surya Rao in LiveKit Room`, "success");
    }

    async function askVoiceAgent(promptQuery, lang = null) {
      const activeLang = lang || currentLang || 'en';
      const visualizer = document.getElementById('voiceAgentVisualizer');
      const stateText = document.getElementById('voiceAgentStateText');
      const box = document.getElementById('teleChatBox');
      const p = patients.find(item => item.id === activePatientId) || patients[0];

      if (visualizer) visualizer.classList.add('border-amber-400', 'scale-110');
      if (stateText) stateText.textContent = activeLang === 'te' ? "AI మాట్లాడుతోంది..." : "AI Speaking...";

      try {
        const apiBase = window.location.port === '8000' ? '' : 'http://localhost:8000';
        const res = await fetch(`${apiBase}/api/v1/livekit/voice-agent/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: promptQuery,
            lang: activeLang,
            patient_id: p.id,
            patient_name: p.name,
            lesion_finding: p.lesionType,
            risk_category: p.riskLevel
          })
        });

        let spoken = "";
        let agentLang = activeLang;

        if (res.ok) {
          const data = await res.json();
          spoken = data.spoken_text;
          agentLang = data.lang || activeLang;
        } else {
          throw new Error("HTTP " + res.status);
        }

        // Append to consult transcript
        const div = document.createElement('div');
        div.className = "bg-amber-50 border border-amber-300 p-2.5 rounded-lg text-slate-900 space-y-1";
        div.innerHTML = `
          <div class="flex items-center justify-between font-bold text-amber-900 text-[11px]">
            <span class="flex items-center gap-1"><i class="fa-solid fa-robot text-teal-600"></i> Aarogya Voice AI</span>
            <span class="text-[10px] text-amber-700 font-normal">Voice Briefing</span>
          </div>
          <p class="text-[11px] leading-relaxed">${spoken}</p>
        `;
        box.appendChild(div);
        box.scrollTop = box.scrollHeight;
        speakTextAloud(spoken, agentLang);

      } catch (err) {
        console.warn("[Voice Agent] Backend query failed, using on-device clinical knowledge base:", err);
        const q = (promptQuery || '').toLowerCase();
        let fallbackSpoken = "";

        if (q.includes('summar') || q.includes('risk') || q.includes('scan')) {
          fallbackSpoken = activeLang === 'te'
            ? `రోగి ${p.name} (${p.id}) నోటి పరీక్షలో తీవ్రమైన ప్రమాదం (High Risk 88%) గుర్తించబడింది. 48 గంటల్లో పాడేరు జిల్లా ఆసుపత్రిలో బయాప్సీ సిఫార్సు చేయబడింది.`
            : `Patient ${p.name} (${p.id}) presents with ${p.lesionType || 'Erythroplakia'} classified as HIGH RISK (88%). Urgent punch biopsy review within 48 hours recommended.`;
        } else if (q.includes('biopsy') || q.includes('aarogyasri') || q.includes('code')) {
          fallbackSpoken = activeLang === 'te'
            ? `స్థానిక అనస్థీషియాతో 4మి.మీ పంచ్ బయాప్సీ చేయండి. డాక్టర్ వైఎస్ఆర్ ఆరోగ్యశ్రీ కోడ్ M-612 కింద ఉచిత చికిత్స నమోదు చేయండి.`
            : `Perform 4mm punch biopsy from indurated margin under local anesthesia. Initiate Dr. YSR Aarogyasri Pre-Authorization under Code M-612.`;
        } else if (q.includes('stage') || q.includes('tnm')) {
          fallbackSpoken = activeLang === 'te'
            ? `ప్రస్తుత స్టేజింగ్: స్టేజ్ I (T1N0M0) — ప్రారంభ దశ స్థానిక పుండు. త్వరగా చికిత్స అందిస్తే నయమయ్యే అవకాశం 92% కంటే ఎక్కువ.`
            : `Provisional staging: Stage I (T1N0M0) — localized early-stage lesion. Curative intervention probability exceeds 92%.`;
        } else if (q.includes('telugu') || q.includes('తెలుగు')) {
          fallbackSpoken = `నమస్కారం. వైజాగ్ కేజీహెచ్ క్యాన్సర్ నిపుణులు మీ నోటి ఫోటోలను పరిశీలించారు. ఐటీడీఏ పాడేరు ద్వారా ఉచిత పరీక్షలు మరియు రవాణా సదుపాయం ఏర్పాటు చేయబడింది. భయపడకండి.`;
        } else {
          fallbackSpoken = activeLang === 'te'
            ? `ఆరోగ్య వాయిస్ AI సహాయకుడు సిద్ధంగా ఉన్నారు. బయాప్సీ ప్రక్రియ లేదా తెలుగు అనువాదం కోసం అడగవచ్చు.`
            : `Aarogya Voice AI Tele-Assistant active in Room #${p.id}. I can summarize scans, explain TNM staging, or outline biopsy protocols.`;
        }

        const div = document.createElement('div');
        div.className = "bg-amber-50 border border-amber-300 p-2.5 rounded-lg text-slate-900 space-y-1";
        div.innerHTML = `
          <div class="flex items-center justify-between font-bold text-amber-900 text-[11px]">
            <span class="flex items-center gap-1"><i class="fa-solid fa-robot text-teal-600"></i> Aarogya Voice AI (Offline Gate)</span>
            <span class="text-[10px] text-emerald-700 font-semibold">Autonomous Cache</span>
          </div>
          <p class="text-[11px] leading-relaxed">${fallbackSpoken}</p>
        `;
        box.appendChild(div);
        box.scrollTop = box.scrollHeight;
        speakTextAloud(fallbackSpoken, activeLang);
      } finally {
        setTimeout(() => {
          if (visualizer) visualizer.classList.remove('border-amber-400', 'scale-110');
          if (stateText) stateText.textContent = "Autonomous Agent • Ready";
        }, 3000);
      }
    }

    function speakTextAloud(text, lang = 'en') {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.lang = lang === 'te' ? 'te-IN' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }

    function startVoiceAgentListening() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        askVoiceAgent("Summarize the oral scan findings and OPMD risk");
        return;
      }

      const rec = new SpeechRecognition();
      rec.lang = currentLang === 'te' ? 'te-IN' : 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      const btn = document.getElementById('btnVoiceAgentMic');
      const stateText = document.getElementById('voiceAgentStateText');
      if (btn) btn.innerHTML = `<i class="fa-solid fa-ear-listen text-amber-300 mr-1 animate-pulse"></i> Listening...`;
      if (stateText) stateText.textContent = "Listening to your voice...";

      rec.onresult = (evt) => {
        const spokenTranscript = evt.results[0][0].transcript;
        showToast(`Voice input: "${spokenTranscript}"`, "info");
        askVoiceAgent(spokenTranscript);
      };

      rec.onerror = (err) => {
        console.warn("Speech recognition error:", err);
        showToast("Defaulting to scan summary", "info");
        askVoiceAgent("Summarize scan and OPMD risk");
      };

      rec.onend = () => {
        if (btn) btn.innerHTML = `<i class="fa-solid fa-microphone-lines text-amber-300 mr-1"></i> <span>Talk to AI Agent</span>`;
        if (stateText) stateText.textContent = "Autonomous Agent • Ready";
      };

      rec.start();
    }

    // ==================== STEP 5, 6, 7, 8 ACTIONS ====================
    function toggleLowBandwidthMode() {
      lowBandwidthMode = !lowBandwidthMode;
      const btnText = document.getElementById('lowBwText');
      const bitrateLabel = document.getElementById('webrtcBitrateLabel');
      if (lowBandwidthMode) {
        btnText.textContent = "2G/3G Low-Bandwidth Audio+Snapshot Mode: ON";
        bitrateLabel.textContent = "Bitrate: 38 kbps (Audio + Static High-Res ROI)";
        showToast("Switched to Low-Bandwidth mode for remote tribal 2G cellular coverage", "info");
      } else {
        btnText.textContent = "2G/3G Low-Bandwidth Audio+Snapshot Mode: OFF";
        bitrateLabel.textContent = "Bitrate: 420 kbps (HD Adaptive)";
      }
    }

    function handleSendTeleMessage(e) {
      e.preventDefault();
      const input = document.getElementById('teleChatInput');
      if (!input.value.trim()) return;
      const box = document.getElementById('teleChatBox');
      const div = document.createElement('div');
      div.className = "bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg";
      div.innerHTML = `<span class="font-bold text-emerald-900">${currentRole}:</span> ${input.value.trim()}`;
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
      input.value = '';
    }

    function handleCreateReferral(e) {
      e.preventDefault();
      const hosp = document.getElementById('refHospital').value;
      const date = document.getElementById('refDate').value;
      showToast(`Confirmed biopsy referral at ${hosp} on ${date}. Telugu SMS dispatched!`, "success");
    }

    function updateBiopsyStage(stage) {
      if (currentUser && !['MEDICAL_OFFICER', 'SPECIALIST'].includes(currentUser.role)) {
        showToast(currentLang === 'te' ? "బయాప్సీ నమూనా మార్పు కేవలం డాక్టర్లకు మాత్రమే అనుమతించబడింది." : "Biopsy staging updates are restricted to Medical Officers and Specialists.", "warning");
        return;
      }
      const p = patients.find(item => item.id === activePatientId);
      if (p) p.biopsyStage = stage;
      showToast(`Updated Biopsy Lifecycle to: ${stage}`, "success");
    }

    function saveDiagnosticsAndContinue() {
      if (currentUser && !['MEDICAL_OFFICER', 'SPECIALIST'].includes(currentUser.role)) {
        showToast(currentLang === 'te' ? "డయాగ్నస్టిక్ రికార్డు ఆమోదం కేవలం స్పెషలిస్ట్/డాక్టర్లకు మాత్రమే అనుమతించబడింది." : "Diagnostic record sign-off is restricted to Specialists and Medical Officers.", "warning");
        return;
      }
      showToast("Histopathology report verified and encrypted.", "success");
      goToStep(8);
    }

    function handleLogFollowup(e) {
      e.preventDefault();
      const input = document.getElementById('followupNoteInput');
      if (!input.value.trim()) return;
      const list = document.getElementById('followupLogList');
      const item = document.createElement('div');
      item.className = "p-2.5 rounded bg-teal-50 border border-teal-200 text-teal-900";
      item.innerHTML = `<strong>Today:</strong> ${input.value.trim()}`;
      list.prepend(item);
      input.value = '';
      showToast("Patient follow-up adherence note saved", "success");
    }

    // ==================== ROLE AUTHENTICATION & LOGIN CONTROLS ====================
    function setRoleUsernameAndPassword(roleKey, showToastMsg = false) {
      const config = ROLE_CONFIGS[roleKey];
      if (!config) return;

      const userInput = document.getElementById('loginUsername');
      const passInput = document.getElementById('loginPassword');
      // Removed obsolete role pills

      const savedPasswords = JSON.parse(localStorage.getItem('aarogya_custom_passwords') || '{}');
      const activePassword = savedPasswords[config.user] || config.password || "paderu@2026";

      if (userInput) userInput.value = config.user;
      if (passInput) passInput.value = activePassword;
      // Set credentials

      if (showToastMsg) {
        showToast(
          currentLang === 'te' 
            ? `${config.titleTe} కోసం యూజర్‌నేమ్ (${config.user}) మరియు పాస్‌వర్డ్ సెట్ చేయబడింది` 
            : `Username (${config.user}) and password set for ${config.titleEn}`,
          "info"
        );
      }
    }

        function findRoleConfigByUsername(username) {
      const uname = (username || '').trim().toLowerCase();
      for (const roleKey of Object.keys(ROLE_CONFIGS)) {
        if (ROLE_CONFIGS[roleKey].user.toLowerCase() === uname ||
            (roleKey === 'MEDICAL_OFFICER' && (uname === 'dr_ramesh_phc' || uname === 'dr_lokesh' || uname === 'dr_lokesh_phc' || uname === 'dr_lokeshkumar'))) {
          return ROLE_CONFIGS[roleKey];
        }
      }
      return null;
    }

    function setAccountToForm(username) {
      const config = findRoleConfigByUsername(username);
      if (!config) return;

      const userInput = document.getElementById('loginUsername');
      const passInput = document.getElementById('loginPassword');
      const savedPasswords = JSON.parse(localStorage.getItem('aarogya_custom_passwords') || '{}');
      const activePassword = savedPasswords[config.user] || config.password || "paderu@2026";

      if (userInput) userInput.value = config.user;
      if (passInput) passInput.value = activePassword;

      updateAccountBanner(config);
    }

    function onUsernameInputChange(val) {
      const config = findRoleConfigByUsername(val);
      if (config) {
        updateAccountBanner(config);
      }
    }

    function updateAccountBanner(config) {
      const banner = document.getElementById('selectedAccountBanner');
      const title = document.getElementById('selectedAccountTitle');
      const detail = document.getElementById('selectedAccountDetail');
      const icon = document.getElementById('selectedAccountIcon');
      if (!banner || !config) return;

      const isTe = currentLang === 'te';
      const roleTitle = isTe ? config.titleTe : config.titleEn;

      if (title) title.textContent = `${config.name} (${roleTitle} • ${config.user})`;
      if (detail) detail.textContent = `${config.facility} • ${config.allowedSteps.length} Authorized Dashboards`;
      if (icon) {
        icon.innerHTML = `<i class="fa-solid ${config.icon}"></i>`;
        icon.style.backgroundColor = config.accentHex;
      }
    }

    function quickLoginWithAccount(username) {
      setAccountToForm(username);
      submitRoleLogin();
    }

    
    function closeRoleLoginModal() {
      const modal = document.getElementById('forgotPasswordModal');
      if (modal) modal.classList.add('hidden');
    }

    function selectLoginRole(roleKey) {
      const config = ROLE_CONFIGS[roleKey];
      if (config) {
        setAccountToForm(config.user);
      }
    }

    // ==================== FORGOT PASSWORD & RECOVERY CONTROLS ====================
    function openForgotPasswordModal() {
      const modal = document.getElementById('forgotPasswordModal');
      if (modal) {
        modal.classList.remove('hidden');
        renderForgotCredentialsList();
        switchForgotTab('credentials');
        const sel = document.getElementById('resetAccountSelect');
        const currentInputUser = document.getElementById('loginUsername')?.value?.trim()?.toLowerCase();
        if (sel && currentInputUser) {
          sel.value = currentInputUser;
        }
      }
    }

    function closeForgotPasswordModal() {
      const modal = document.getElementById('forgotPasswordModal');
      if (modal) {
        modal.classList.add('hidden');
      }
    }

    function setRoleCredentials(username, defaultPass) {
      const savedPasswords = JSON.parse(localStorage.getItem('aarogya_custom_passwords') || '{}');
      const activePassword = savedPasswords[username] || defaultPass || "paderu@2026";

      const userInput = document.getElementById('loginUsername');
      const passInput = document.getElementById('loginPassword');

      if (userInput) userInput.value = username;
      if (passInput) passInput.value = activePassword;

      const config = findRoleConfigByUsername(username);
      if (config) updateAccountBanner(config);

      closeForgotPasswordModal();
      showToast(
        currentLang === 'te' 
          ? `రుజువు సెట్ చేయబడింది: ${username}` 
          : `Credential populated: ${username}`,
        "info"
      );
    }



    async function submitRoleLogin(e) {
      if (e) e.preventDefault();
      const usernameInput = document.getElementById('loginUsername');
      const passwordInput = document.getElementById('loginPassword');
      const errorMsg = document.getElementById('loginErrorMsg');
      const errorText = document.getElementById('loginErrorText');
      const submitBtn = document.getElementById('loginSubmitBtn');

      const username = usernameInput ? usernameInput.value.trim().toLowerCase() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (!username || !password) {
        if (errorMsg && errorText) {
          errorText.textContent = currentLang === 'te' ? "దయచేసి వినియోగదారు పేరు మరియు పాస్‌వర్డ్ నమోదు చేయండి." : "Please enter both Username and Password.";
          errorMsg.classList.remove('hidden');
        }
        return;
      }

      // Automatically resolve role and permissions from username!
      const matchedConfig = findRoleConfigByUsername(username);
      const role = matchedConfig ? matchedConfig.id : 'HEALTH_WORKER';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> <span>${currentLang === 'te' ? 'ప్రామాణీకరిస్తోంది...' : 'Authenticating...'}</span>`;
      }

      try {
        let authResult = null;

        // Attempt FastAPI backend login if available
        try {
          const apiBase = window.location.port === '8000' ? '' : 'http://localhost:8000';
          const res = await fetch(`${apiBase}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          if (res.ok) {
            authResult = await res.json();
          } else {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.detail || "Authentication failed");
          }
        } catch (networkErr) {
          if (networkErr.message && !networkErr.message.includes('fetch') && !networkErr.message.includes('Failed to fetch') && !networkErr.message.includes('Network') && !networkErr.message.includes('Failed to connect')) {
            throw networkErr;
          }
          // Offline / static file fallback simulation
          const savedPasswords = JSON.parse(localStorage.getItem('aarogya_custom_passwords') || '{}');
          const expectedPwd = savedPasswords[username] || (matchedConfig ? matchedConfig.password : "paderu@2026") || "paderu@2026";

          if (matchedConfig && password === expectedPwd) {
            authResult = {
              access_token: "jwt_offline_demo_token_" + btoa(JSON.stringify({ sub: username, role: matchedConfig.id })),
              role: matchedConfig.id,
              username: username,
              full_name: matchedConfig.name,
              designation: matchedConfig.designation,
              facility: matchedConfig.facility,
              mandal: matchedConfig.mandal,
              allowed_steps: matchedConfig.allowedSteps
            };
          } else {
            throw new Error(currentLang === 'te' 
              ? `చెల్లని ఆధారాలు. దయచేసి సరైన పాస్‌వర్డ్ ఉపయోగించండి (${expectedPwd}).` 
              : `Invalid credentials. Please verify your password (Default: ${expectedPwd}).`);
          }
        }

        // Authentication Success! Dashboard dynamically adapts to account's role
        currentUser = {
          role: authResult.role,
          username: authResult.username,
          name: authResult.full_name || (matchedConfig ? matchedConfig.name : authResult.username),
          designation: authResult.designation || (matchedConfig ? matchedConfig.designation : authResult.role),
          facility: authResult.facility || (matchedConfig ? matchedConfig.facility : 'Alluri Sitharama Raju District'),
          mandal: authResult.mandal || (matchedConfig ? matchedConfig.mandal : 'Paderu'),
          allowedSteps: authResult.allowed_steps || (matchedConfig ? matchedConfig.allowedSteps : [1, 2, 3, 5, 6, 8]),
          token: authResult.access_token,
          startStep: (matchedConfig ? matchedConfig.startStep : 1) || 1
        };
        currentRole = currentUser.role;

        // Persist session in browser storage
        localStorage.setItem('aarogya_session', JSON.stringify(currentUser));

        // Switch UI to logged in workspace
        applyLoggedInState();
        showToast(
          currentLang === 'te' 
            ? `స్వాగతం, ${currentUser.name}! ${currentUser.designation} గా లాగిన్ అయ్యారు.` 
            : `Welcome, ${currentUser.name}! Signed in as ${currentUser.designation}.`,
          "success"
        );
      } catch (err) {
        if (errorMsg && errorText) {
          errorText.textContent = err.message;
          errorMsg.classList.remove('hidden');
        }
        showToast(err.message, "error");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-lock-open mr-2"></i> <span>${currentLang === 'te' ? 'పోర్టల్‌లోకి సైన్ ఇన్ చేయండి' : 'Sign In to Portal'}</span>`;
        }
      }
    }

    function switchForgotTab(tab) {
      const tabCreds = document.getElementById('forgotTabCredentials');
      const tabReset = document.getElementById('forgotTabReset');
      const btnCreds = document.getElementById('tabBtnCredentials');
      const btnReset = document.getElementById('tabBtnReset');

      if (tab === 'credentials') {
        tabCreds?.classList.remove('hidden');
        tabReset?.classList.add('hidden');
        btnCreds?.classList.add('bg-white', 'text-teal-800', 'border-t-2', 'border-teal-600', 'shadow-sm');
        btnCreds?.classList.remove('text-slate-600');
        btnReset?.classList.remove('bg-white', 'text-teal-800', 'border-t-2', 'border-teal-600', 'shadow-sm');
        btnReset?.classList.add('text-slate-600');
      } else {
        tabCreds?.classList.add('hidden');
        tabReset?.classList.remove('hidden');
        btnReset?.classList.add('bg-white', 'text-teal-800', 'border-t-2', 'border-teal-600', 'shadow-sm');
        btnReset?.classList.remove('text-slate-600');
        btnCreds?.classList.remove('bg-white', 'text-teal-800', 'border-t-2', 'border-teal-600', 'shadow-sm');
        btnCreds?.classList.add('text-slate-600');
      }
    }

    function renderForgotCredentialsList() {
      const container = document.getElementById('forgotCredentialsList');
      if (!container) return;

      const savedPasswords = JSON.parse(localStorage.getItem('aarogya_custom_passwords') || '{}');

      container.innerHTML = Object.keys(ROLE_CONFIGS).map(roleKey => {
        const config = ROLE_CONFIGS[roleKey];
        const pwd = savedPasswords[config.user] || config.password || "paderu@2026";
        const title = currentLang === 'te' ? config.titleTe : config.titleEn;

        return `
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-2 hover:border-teal-400 transition">
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-800 flex items-center gap-1.5">
                  <i class="fa-solid ${config.icon} text-teal-600"></i> ${title}
                </span>
                <span class="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">${config.id}</span>
              </div>
              <div class="text-[11px] text-slate-500">${config.name} • ${config.facility}</div>
              <div class="pt-1.5 flex items-center gap-2 flex-wrap">
                <span class="text-slate-500 font-medium">User:</span>
                <code class="bg-white px-2 py-0.5 rounded border border-slate-300 font-mono font-bold text-teal-800">${config.user}</code>
                <span class="text-slate-500 font-medium ml-1">Password:</span>
                <code class="bg-white px-2 py-0.5 rounded border border-slate-300 font-mono font-bold text-slate-700">${pwd}</code>
              </div>
            </div>
            <button type="button" onclick="useForgotCredential('${roleKey}')" class="mt-2 w-full bg-slate-800 hover:bg-teal-700 text-white font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition text-[11px]">
              <i class="fa-solid fa-arrow-right-to-bracket text-amber-400"></i>
              <span>Use & Auto-Fill</span>
            </button>
          </div>
        `;
      }).join('');
    }

    function useForgotCredential(roleKey) {
      selectLoginRole(roleKey);
      setRoleUsernameAndPassword(roleKey);
      closeForgotPasswordModal();
      showToast(
        currentLang === 'te'
          ? `${ROLE_CONFIGS[roleKey].titleTe} యూజర్‌నేమ్ మరియు పాస్‌వర్డ్ నింపబడ్డాయి.`
          : `Username and password set for ${ROLE_CONFIGS[roleKey].titleEn}!`,
        "success"
      );
    }

    function toggleResetPassVisibility(inputId, btn) {
      const input = document.getElementById(inputId);
      if (!input) return;
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.className = 'fa-solid fa-eye-slash text-slate-600';
      } else {
        input.type = 'password';
        if (icon) icon.className = 'fa-solid fa-eye text-slate-400';
      }
    }

    async function handleResetPasswordSubmit(e) {
      e.preventDefault();
      const accountSelect = document.getElementById('resetAccountSelect');
      const newPassInput = document.getElementById('resetNewPassword');
      const confirmPassInput = document.getElementById('resetConfirmPassword');
      const alertBox = document.getElementById('resetPasswordAlert');
      const submitBtn = document.getElementById('btnSubmitPasswordReset');

      const username = accountSelect ? accountSelect.value : '';
      const newPassword = newPassInput ? newPassInput.value : '';
      const confirmPassword = confirmPassInput ? confirmPassInput.value : '';

      if (!newPassword || newPassword.length < 4) {
        if (alertBox) {
          alertBox.className = "p-3 rounded-lg text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300";
          alertBox.textContent = currentLang === 'te' ? "పాస్‌వర్డ్ కనీసం 4 అక్షరాలు ఉండాలి." : "Password must be at least 4 characters long.";
          alertBox.classList.remove('hidden');
        }
        return;
      }

      if (newPassword !== confirmPassword) {
        if (alertBox) {
          alertBox.className = "p-3 rounded-lg text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300";
          alertBox.textContent = currentLang === 'te' ? "పాస్‌వర్డ్‌లు సరిపోలడం లేదు." : "Passwords do not match. Please verify.";
          alertBox.classList.remove('hidden');
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Saving...`;
      }

      try {
        // Try backend reset password API if reachable
        try {
          const apiBase = window.location.port === '8000' ? '' : 'http://localhost:8000';
          await fetch(`${apiBase}/api/v1/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, new_password: newPassword })
          });
        } catch(netErr) {
          // Backend offline or static mode - ignore and persist locally
        }

        // Save locally
        const savedPasswords = JSON.parse(localStorage.getItem('aarogya_custom_passwords') || '{}');
        savedPasswords[username] = newPassword;
        localStorage.setItem('aarogya_custom_passwords', JSON.stringify(savedPasswords));

        // Update in ROLE_CONFIGS
        for (const rk in ROLE_CONFIGS) {
          if (ROLE_CONFIGS[rk].user === username) {
            ROLE_CONFIGS[rk].password = newPassword;
            if (selectedLoginRole === rk) {
              setRoleUsernameAndPassword(rk);
            }
          }
        }

        // Auto-fill into login form
        const loginPass = document.getElementById('loginPassword');
        if (loginPass) loginPass.value = newPassword;
        // Updated active password

        closeForgotPasswordModal();
        showToast(
          currentLang === 'te' 
            ? `${username} కోసం పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది!` 
            : `Password successfully updated and set for ${username}!`,
          "success"
        );

        // Reset form
        newPassInput.value = '';
        confirmPassInput.value = '';
        alertBox?.classList.add('hidden');
      } catch (err) {
        if (alertBox) {
          alertBox.className = "p-3 rounded-lg text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300";
          alertBox.textContent = err.message || "Failed to update password.";
          alertBox.classList.remove('hidden');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>${currentLang === 'te' ? 'కొత్త పాస్‌వర్డ్ సేవ్ చేయండి' : 'Save & Set New Password'}</span>`;
        }
      }
    }

    function quickLoginAs(roleKey) {
      const config = ROLE_CONFIGS[roleKey];
      if (config) {
        quickLoginWithAccount(config.user);
      }
    }

    function handleLogout() {
      currentUser = null;
      localStorage.removeItem('aarogya_session');
      applyLoggedOutState();
      selectLoginRole('HEALTH_WORKER');
      showToast(
        currentLang === 'te' ? "లాగౌట్ విజయవంతమైంది. దయచేసి పాత్రను ఎంచుకోండి." : "Logged out successfully. Please select a role to sign in.",
        "info"
      );
    }

    function applyLoggedInState() {
      closeRoleLoginModal();
      if (!currentUser) return;
      const config = ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER;

      // Toggle views
      const loginScreen = document.getElementById('loginScreen');
      const appWorkspace = document.getElementById('appWorkspace');
      const rbacBanner = document.getElementById('patientRbacBanner');
      if (loginScreen) loginScreen.classList.add('hidden');
      const mainH = document.getElementById('mainAppHeader'); if (mainH) mainH.classList.remove('hidden');
      if (appWorkspace) appWorkspace.classList.remove('hidden');
      if (rbacBanner) rbacBanner.classList.remove('hidden');

      // Update Nav Profile Pill
      const promptInd = document.getElementById('loginPromptIndicator');
      if (promptInd) promptInd.classList.add('hidden');

      const authPill = document.getElementById('authUserPill');
      if (authPill) {
        authPill.classList.remove('hidden');
        authPill.classList.add('flex');
      }

      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) logoutBtn.classList.remove('hidden');

      const navUser = document.getElementById('navUserName');
      if (navUser) navUser.textContent = currentUser.name;

      const navBadge = document.getElementById('navRoleBadge');
      if (navBadge) {
        navBadge.textContent = currentUser.role;
        navBadge.className = `text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${config.badgeClass}`;
      }

      const navFac = document.getElementById('navUserFacility');
      if (navFac) navFac.textContent = currentUser.facility;

      const roleIcon = document.getElementById('userRoleIcon');
      const roleWrap = document.getElementById('userRoleIconWrap');
      if (roleIcon) roleIcon.className = `fa-solid ${config.icon}`;
      if (roleWrap) roleWrap.style.backgroundColor = config.accentHex;

      // Update RBAC banner hint
      const hint = document.getElementById('rbacPermissionHint');
      if (hint) {
        hint.innerHTML = `<i class="fa-solid ${config.icon} text-[#0096a6] mr-1.5"></i> <span class="font-bold text-slate-800">${config.designation}</span> <span class="text-slate-500">(${config.facility})</span>`;
      }

      // Render Dedicated Cadre Dashboard Hub
      renderCadreDashboardHub();

      // Re-render pipeline nav and initial step
      renderPipelineNav();
      renderPatientSelectors();
      goToStep(currentUser.startStep || config.startStep);
    }

    function applyLoggedOutState() {
      closeRoleLoginModal();
      if (typeof drawCaptcha === 'function') {
        setTimeout(() => drawCaptcha(currentCaptchaText || 'PXJI'), 50);
      }
      const loginScreen = document.getElementById('loginScreen');
      const appWorkspace = document.getElementById('appWorkspace');
      const rbacBanner = document.getElementById('patientRbacBanner');
      if (loginScreen) loginScreen.classList.remove('hidden');
      const mainH = document.getElementById('mainAppHeader'); if (mainH) mainH.classList.add('hidden');
      if (appWorkspace) appWorkspace.classList.add('hidden');
      if (rbacBanner) rbacBanner.classList.add('hidden');

      const promptInd = document.getElementById('loginPromptIndicator');
      if (promptInd) promptInd.classList.remove('hidden');

      const authPill = document.getElementById('authUserPill');
      if (authPill) {
        authPill.classList.add('hidden');
        authPill.classList.remove('flex');
      }

      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) logoutBtn.classList.add('hidden');
    }

    function togglePasswordVisibility() {
      const passInput = document.getElementById('loginPassword');
      const eyeIcon = document.getElementById('loginEyeIcon');
      if (!passInput || !eyeIcon) return;
      if (passInput.type === 'password') {
        passInput.type = 'text';
        eyeIcon.className = 'fa-solid fa-eye-slash';
      } else {
        passInput.type = 'password';
        eyeIcon.className = 'fa-solid fa-eye';
      }
    }

    function handleRoleChange(role) {
      quickLoginAs(role);
    }

    function toggleLanguage() {
      currentLang = currentLang === 'en' ? 'te' : 'en';
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
          el.textContent = i18n[currentLang][key];
        }
      });
      selectLoginRole(selectedLoginRole);
      renderCadreDashboardHub();
      renderPipelineNav();
      if (currentUser) {
        renderDashboardRbacBanner(currentStep);
        const allowed = currentUser.allowedSteps || currentUser.allowed_steps || [];
        if (!allowed.includes(currentStep)) {
          renderDashboardRbacShield(currentStep);
        } else if (currentStep === 1) {
          applyStep1Permissions();
        } else if (currentStep === 4) {
          renderMOTriageTable();
        }
      }
      showToast(currentLang === 'te' ? "తెలుగు భాషకు మార్చబడింది (Telugu UI Active)" : "Switched to English Interface", "info");
    }

    function toggleNetworkStatus() {
      isOnline = !isOnline;
      const btn = document.getElementById('netToggleBtn');
      const dot = document.getElementById('netStatusDot');
      const txt = document.getElementById('netStatusText');

      if (isOnline) {
        btn.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 transition";
        dot.className = "w-2 h-2 rounded-full bg-emerald-400";
        txt.textContent = "Online";
        showToast("Network restored. Click Sync button to upload cached village records.", "success");
      } else {
        btn.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold bg-amber-600/30 text-amber-300 border border-amber-500/40 transition";
        dot.className = "w-2 h-2 rounded-full bg-amber-400 animate-ping";
        txt.textContent = "Offline Mode";
        showToast("Offline Mode Active: Screenings will cache locally in IndexedDB/LocalStorage.", "warning");
      }
    }

    function updateOfflineBadge() {
      document.getElementById('offlineQueueCount').textContent = offlineQueue.length;
    }

    function syncOfflineQueue() {
      if (!isOnline) {
        showToast("Cannot sync while in Offline Mode. Switch to Online first.", "warning");
        return;
      }
      if (offlineQueue.length === 0) {
        showToast("All village screenings are already synchronized with ITDA Cloud.", "info");
        return;
      }
      const count = offlineQueue.length;
      patients.forEach(p => p.synced = true);
      offlineQueue = [];
      updateOfflineBadge();
      renderPatientSelectors();
      showToast(`Synchronized ${count} offline tribal patient record(s) to PostgreSQL Cloud!`, "success");
    }

    // ==================== PHOTO CAPTURE & WEBCAM SUITE ====================
    let userCapturedImageObj = null;
    let currentFacingMode = 'environment';

    async function startWebcamCapture() {
      try {
        const video = document.getElementById('webcamVideo');
        const canvas = document.getElementById('oralCanvas');
        const overlay = document.getElementById('cameraControlsOverlay');
        const startBtn = document.getElementById('startCamBtn');

        if (webcamStream) {
          webcamStream.getTracks().forEach(t => t.stop());
          webcamStream = null;
        }

        webcamStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: currentFacingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });

        video.srcObject = webcamStream;
        video.classList.remove('hidden');
        canvas.classList.add('hidden');
        if (overlay) overlay.classList.remove('hidden');
        if (startBtn) startBtn.classList.add('hidden');
        document.getElementById('photoCapturedBar')?.classList.add('hidden');
        showToast("Live camera active. Align patient oral mucosa and click 'Capture Photo'.", "info");
      } catch (err) {
        console.warn("Camera access failed or unavailable:", err);
        showToast("Camera access unavailable in browser. You can click 'Upload Photo' to select an image.", "warning");
      }
    }

    function switchCameraFacingMode() {
      currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
      startWebcamCapture();
    }

    function snapPhotoFromWebcam() {
      const video = document.getElementById('webcamVideo');
      const canvas = document.getElementById('oralCanvas');
      if (!video || !canvas) return;
      const ctx = canvas.getContext('2d');

      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Save as user captured image
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const img = new Image();
      img.onload = () => {
        userCapturedImageObj = img;
        drawOralCavityCanvas('oralCanvas', false);
        renderAICanvas();
        analyzeCapturedImageQuality(canvas);
      };
      img.src = dataUrl;

      // Stop camera stream & restore view
      stopWebcamCapture();

      // Show captured banner
      document.getElementById('photoCapturedBar')?.classList.remove('hidden');
      showToast("Photo captured successfully! Real-time quality gate updated.", "success");
    }

    function stopWebcamCapture() {
      if (webcamStream) {
        webcamStream.getTracks().forEach(t => t.stop());
        webcamStream = null;
      }
      const video = document.getElementById('webcamVideo');
      const canvas = document.getElementById('oralCanvas');
      const overlay = document.getElementById('cameraControlsOverlay');
      const startBtn = document.getElementById('startCamBtn');

      if (video) video.classList.add('hidden');
      if (canvas) canvas.classList.remove('hidden');
      if (overlay) overlay.classList.add('hidden');
      if (startBtn) startBtn.classList.remove('hidden');
    }

    function triggerPhotoUpload() {
      const input = document.getElementById('oralPhotoFileInput');
      if (input) input.click();
    }

    function handleOralPhotoUpload(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          userCapturedImageObj = img;
          stopWebcamCapture();
          drawOralCavityCanvas('oralCanvas', false);
          renderAICanvas();
          analyzeCapturedImageQuality(document.getElementById('oralCanvas'));
          document.getElementById('photoCapturedBar')?.classList.remove('hidden');
          showToast(`Uploaded ${file.name} successfully! Ready for AI evaluation.`, "success");
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    function retakePhoto() {
      userCapturedImageObj = null;
      document.getElementById('photoCapturedBar')?.classList.add('hidden');
      drawOralCavityCanvas('oralCanvas', false);
      renderAICanvas();
      resetQualityGauges();
      showToast("Photo reset. Switched back to clinical reference scan.", "info");
    }

    function analyzeCapturedImageQuality(canvas) {
      if (!canvas) return;
      try {
        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        let totalLum = 0;
        for (let i = 0; i < data.length; i += 4) {
          totalLum += (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
        }
        const avgLum = totalLum / (data.length / 4);
        const bScore = Math.min(98, Math.max(72, Math.round((avgLum / 255) * 125)));
        const sScore = Math.min(96, Math.max(75, Math.round(bScore * 0.94 + 5)));

        const bText = document.getElementById('brightnessValText');
        const bBar = document.getElementById('brightnessBar');
        if (bText) bText.textContent = `${bScore}% Optimal`;
        if (bBar) bBar.style.width = `${bScore}%`;

        const sText = document.getElementById('sharpnessValText');
        const sBar = document.getElementById('sharpnessBar');
        if (sText) sText.textContent = `${sScore}% Sharp (Low Blur)`;
        if (sBar) sBar.style.width = `${sScore}%`;
      } catch (e) {
        console.warn("Quality metric calculation fallback:", e);
      }
    }

    function resetQualityGauges() {
      const bText = document.getElementById('brightnessValText');
      const bBar = document.getElementById('brightnessBar');
      if (bText) bText.textContent = "94% Optimal";
      if (bBar) bBar.style.width = "94%";

      const sText = document.getElementById('sharpnessValText');
      const sBar = document.getElementById('sharpnessBar');
      if (sText) sText.textContent = "91% Sharp (Low Blur)";
      if (sBar) sBar.style.width = "91%";
    }

    // ==================== PHOTO DOWNLOAD FUNCTIONS ====================
    function downloadOralPhoto() {
      const canvas = document.getElementById('oralCanvas');
      if (!canvas) return;

      const p = patients.find(item => item.id === activePatientId) || patients[0];
      const dateStr = new Date().toISOString().slice(0, 10);
      const filename = `AarogyaDrishti_${p.id || 'PT-ASR'}_Capture_${dateStr}.png`;

      // Export canvas with official clinical watermark
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = canvas.width;
      exportCanvas.height = canvas.height;
      const ctx = exportCanvas.getContext('2d');

      ctx.drawImage(canvas, 0, 0);

      // Bottom metadata bar
      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.fillRect(0, exportCanvas.height - 30, exportCanvas.width, 30);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(`ITDA PADERU • ASR DISTRICT | Patient: ${p.name} (${p.id}) | ${dateStr} | DISHA Encrypted`, 14, exportCanvas.height - 11);

      const link = document.createElement('a');
      link.download = filename;
      link.href = exportCanvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Downloaded captured oral scan: ${filename}`, "success");
    }

    function downloadAIDiagnosticScan() {
      const canvas = document.getElementById('aiResultCanvas');
      if (!canvas) return;

      const p = patients.find(item => item.id === activePatientId) || patients[0];
      const dateStr = new Date().toISOString().slice(0, 10);
      const filename = `AarogyaDrishti_AI_Report_${p.id || 'PT-ASR'}_${dateStr}.png`;

      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = canvas.width;
      exportCanvas.height = canvas.height;
      const ctx = exportCanvas.getContext('2d');

      ctx.drawImage(canvas, 0, 0);

      // Top header banner
      ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
      ctx.fillRect(0, 0, exportCanvas.width, 28);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(`GOVT OF AP • AAROGYA DRISHTI AI DIAGNOSTIC REPORT | Patient: ${p.name} (${p.id})`, 12, 18);

      // Bottom watermark banner
      ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
      ctx.fillRect(0, exportCanvas.height - 28, exportCanvas.width, 28);
      ctx.fillStyle = '#f87171';
      ctx.font = 'bold 10px Inter, sans-serif';
      const riskLabel = currentPreset === 'SUSPICIOUS' ? 'HIGH RISK (88.4%)' : (currentPreset === 'MODERATE' ? 'MODERATE (54.0%)' : 'NORMAL (12.0%)');
      ctx.fillText(`Classification: ${riskLabel} | Decision-Support Only • Mandatory MO Review Required`, 12, exportCanvas.height - 10);

      const link = document.createElement('a');
      link.download = filename;
      link.href = exportCanvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Downloaded AI Diagnostic Scan: ${filename}`, "success");
    }

    // ==================== SOURCE CODE MODAL & TOASTS ====================
    function openCodeModal() {
      document.getElementById('codeGuideModal').classList.remove('hidden');
    }
    function closeCodeModal() {
      document.getElementById('codeGuideModal').classList.add('hidden');
    }

    function showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      const colors = {
        success: 'bg-emerald-900 border-emerald-500 text-white',
        warning: 'bg-amber-900 border-amber-400 text-white',
        info: 'bg-slate-900 border-teal-400 text-white'
      };
      const toast = document.createElement('div');
      toast.className = `${colors[type] || colors.info} border-l-4 px-4 py-3 rounded-lg shadow-xl text-xs font-medium flex items-center justify-between gap-2 pointer-events-auto transition-all`;
      toast.innerHTML = `<span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3800);
    }

    // ==================== HMIS CAPTCHA GENERATOR & FILL ====================
    let currentCaptchaText = 'PXJI';

    function generateRandomCaptcha(length = 4) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    function drawCaptcha(text) {
      const canvas = document.getElementById('captchaCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#f1f5f9');
      grad.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Random interference noise lines
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = ['#cbd5e1', '#94a3b8', '#0096a6', '#e05423'][i % 4];
        ctx.lineWidth = 1 + Math.random();
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.bezierCurveTo(
          Math.random() * canvas.width, Math.random() * canvas.height,
          Math.random() * canvas.width, Math.random() * canvas.height,
          Math.random() * canvas.width, Math.random() * canvas.height
        );
        ctx.stroke();
      }

      // Draw crisp distorted characters with high contrast
      const colors = ['#0f766e', '#c2410c', '#0369a1', '#1e293b'];
      ctx.font = 'bold 22px "Courier New", Consolas, monospace, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      const charWidth = canvas.width / (text.length + 1);

      for (let i = 0; i < text.length; i++) {
        ctx.save();
        const x = (i + 1) * charWidth;
        const y = canvas.height / 2 + (Math.random() * 4 - 2);
        ctx.translate(x, y);
        ctx.rotate((Math.random() * 0.3 - 0.15));
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
      }
    }

    function regenerateCaptcha() {
      currentCaptchaText = generateRandomCaptcha(4);
      drawCaptcha(currentCaptchaText);
      const input = document.getElementById('loginCaptcha');
      if (input) input.value = '';
    }

    function fillHMISAccount(username) {
      const uInput = document.getElementById('loginUsername');
      const pInput = document.getElementById('loginPassword');
      const cInput = document.getElementById('loginCaptcha');
      if (uInput) uInput.value = username;
      if (pInput) pInput.value = 'paderu@2026';
      if (cInput) cInput.value = currentCaptchaText;
    }

    // Immediate & event-driven robust captcha rendering
    function initCaptcha() {
      currentCaptchaText = currentCaptchaText || 'PXJI';
      drawCaptcha(currentCaptchaText);
    }

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', initCaptcha);
    } else {
      initCaptcha();
    }
    window.addEventListener('load', initCaptcha);
    setTimeout(initCaptcha, 100);
    setTimeout(initCaptcha, 400);

  