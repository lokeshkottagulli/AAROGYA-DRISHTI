-- HIPAA / DISHA Anonymized Synthetic Tribal Patients for ITDA Paderu Evaluation

INSERT INTO patients (
    id, full_name, age, gender, mandal, village, phone,
    tobacco_chewing, gutka_areca, reverse_chutta_smoking, habit_duration_years,
    chief_complaints, consent_obtained, synced_from_offline
) VALUES
('PT-ASR-101', 'Korrailingam Padala', 48, 'Male', 'Paderu', 'Minumuluru', '+91 94401 82310', TRUE, TRUE, FALSE, 16, 'Non-healing speckled red-white patch on left inner cheek for 4 weeks', TRUE, TRUE),
('PT-ASR-102', 'Siveri Bangaramma', 54, 'Female', 'Chintapalli', 'Lammasingi', '+91 94408 11920', FALSE, FALSE, TRUE, 22, 'Palatal mucosal ulceration with burning sensation due to reverse chutta smoking', TRUE, TRUE),
('PT-ASR-103', 'Pangi Somanna', 37, 'Male', 'Araku Valley', 'Sunkarametta', '+91 94912 44501', FALSE, TRUE, FALSE, 9, 'Mild fibrous bands and restricted mouth opening', TRUE, TRUE),
('PT-ASR-104', 'Vanthala Sitamma', 31, 'Female', 'G.K. Veedhi', 'Darinama', '+91 94415 77832', FALSE, FALSE, FALSE, 0, 'Routine community camp oral checkup', TRUE, TRUE),
('PT-ASR-105', 'Killo Simhachalam', 44, 'Male', 'Hukumpeta', 'Kontamuru', '+91 94409 65112', TRUE, TRUE, FALSE, 14, 'Indurated sublingual patch on floor of mouth', TRUE, TRUE),
('PT-ASR-106', 'Killo Appala Naidu', 51, 'Male', 'Ananthagiri', 'Borra Caves', '+91 94411 23456', TRUE, FALSE, TRUE, 18, 'Palatal red patch with soreness on eating spicy food', TRUE, TRUE),
('PT-ASR-107', 'Pangi Chittamma', 46, 'Female', 'Dumbriguda', 'Kandrum', '+91 94902 34567', TRUE, TRUE, FALSE, 12, 'Verrucous leukoplakia on right buccal mucosa', TRUE, TRUE),
('PT-ASR-108', 'Vanthala Ramanna', 39, 'Male', 'G.madugula', 'Kondiba', '+91 94418 45678', FALSE, TRUE, FALSE, 10, 'Burning sensation in buccal mucosa with blanching', TRUE, TRUE),
('PT-ASR-109', 'Korra Kondalamma', 58, 'Female', 'Koyyuru', 'Mampa', '+91 94407 56789', FALSE, FALSE, TRUE, 25, 'Palatal lesion caused by chronic reverse chutta smoking', TRUE, TRUE),
('PT-ASR-110', 'Gammela Somulu', 42, 'Male', 'Munchingput', 'Jolaput', '+91 94913 67890', TRUE, TRUE, FALSE, 15, 'Ulcerated lesion on floor of mouth under tongue', TRUE, TRUE),
('PT-ASR-111', 'Gemmeli Chinnayya', 35, 'Male', 'Pedabayulu', 'Gomangi', '+91 94412 78901', FALSE, FALSE, FALSE, 0, 'Voluntary oral screening at PHC weekly camp', TRUE, TRUE);

INSERT INTO screenings (
    patient_id, anatomical_site, image_url, brightness_score, sharpness_score,
    ai_risk_score, ai_prediction_label, lesion_morphology, guardrail_acknowledged,
    mo_clinical_decision, mo_reviewed_by
) VALUES
('PT-ASR-101', 'Left Buccal Mucosa', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-101.jpg', 0.94, 0.91, 0.884, 'SUSPICIOUS', 'Speckled Erythro-leukoplakia', TRUE, 'Referred for Urgent Biopsy', 'dr_ramesh_phc'),
('PT-ASR-102', 'Hard / Soft Palate', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-102.jpg', 0.92, 0.89, 0.812, 'SUSPICIOUS', 'Palatal Erythroplakia (Chutta Induced)', TRUE, 'Teleconsult Scheduled', 'dr_ramesh_phc'),
('PT-ASR-103', 'Lateral Border of Tongue', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-103.jpg', 0.95, 0.93, 0.540, 'MODERATE', 'Homogeneous Leukoplakia', TRUE, '7-Day PHC Follow-up', 'dr_ramesh_phc'),
('PT-ASR-104', 'Right Buccal Mucosa', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-104.jpg', 0.96, 0.94, 0.140, 'LOW', 'Healthy Normochromic Mucosa', TRUE, 'Routine Oral Hygiene Advice', 'dr_ramesh_phc'),
('PT-ASR-105', 'Floor of Mouth', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-105.jpg', 0.91, 0.90, 0.765, 'SUSPICIOUS', 'Ulceroproliferative Sublingual Patch', TRUE, 'Biopsy Confirmed Stage I', 'dr_ramesh_phc'),
('PT-ASR-106', 'Hard / Soft Palate', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-106.jpg', 0.93, 0.90, 0.620, 'MODERATE', 'Palatal Dysplasia (Chutta Induced)', TRUE, 'Teleconsult Scheduled', 'dr_ramesh_phc'),
('PT-ASR-107', 'Right Buccal Mucosa', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-107.jpg', 0.94, 0.92, 0.790, 'SUSPICIOUS', 'Verrucous Leukoplakia', TRUE, 'Referred for Urgent Biopsy', 'dr_ramesh_phc'),
('PT-ASR-108', 'Left Buccal Mucosa', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-108.jpg', 0.95, 0.91, 0.480, 'MODERATE', 'Oral Submucous Fibrosis (Grade II)', TRUE, '7-Day PHC Follow-up', 'dr_ramesh_phc'),
('PT-ASR-109', 'Hard Palate', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-109.jpg', 0.92, 0.89, 0.852, 'SUSPICIOUS', 'Reverse Smoker Palatal Keratosis', TRUE, 'Referred for Urgent Biopsy', 'dr_ramesh_phc'),
('PT-ASR-110', 'Floor of Mouth', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-110.jpg', 0.91, 0.91, 0.740, 'SUSPICIOUS', 'Sublingual Erythroplakia', TRUE, 'Teleconsult Scheduled', 'dr_ramesh_phc'),
('PT-ASR-111', 'Tongue Dorsum', 's3://ap-health-itda-paderu-oral-scans/PT-ASR-111.jpg', 0.97, 0.95, 0.110, 'LOW', 'Healthy Normochromic Mucosa', TRUE, 'Routine Oral Hygiene Advice', 'dr_ramesh_phc');

INSERT INTO referrals (
    id, patient_id, receiving_hospital, appointment_date, transport_mode, sms_status
) VALUES
('REF-2026-901', 'PT-ASR-101', 'District Hospital Paderu (Oral Oncology Wing)', '2026-10-30', 'Girijana Free Feeder Ambulance Booked', 'DELIVERED'),
('REF-2026-902', 'PT-ASR-102', 'King George Hospital (KGH) Visakhapatnam', '2026-11-02', 'Girijana Free Feeder Ambulance Booked', 'DELIVERED'),
('REF-2026-903', 'PT-ASR-105', 'Homi Bhabha Cancer Hospital & Research Centre, Vizag', '2026-10-28', 'APSRTC Free Patient Bus Pass', 'DELIVERED');

INSERT INTO biopsies (
    patient_id, lifecycle_stage, histopathology_impression, tnm_staging, pathologist_name
) VALUES
('PT-ASR-101', 'Report Available', 'Sections show stratified squamous epithelium exhibiting architectural dysplasia extending to upper third, consistent with Severe Epithelial Dysplasia / Carcinoma in-situ.', 'Stage 0 / TisN0M0', 'Dr. M. Praveen, MD (Pathology)'),
('PT-ASR-102', 'Specimen Collected', 'Incisional punch biopsy collected at Chintapalli CHC; in transit to KGH Histopathology Lab.', 'Pending', 'Dr. M. Praveen, MD (Pathology)'),
('PT-ASR-105', 'Staging Confirmed', 'Well-differentiated Squamous Cell Carcinoma with <2mm depth of invasion. Margins clear.', 'Stage I (T1N0M0)', 'Dr. M. Praveen, MD (Pathology)');

INSERT INTO treatment_followups (
    patient_id, aarogyasri_approved, tobacco_cessation_counseled, day_30_mucosal_recheck, followup_note, logged_by_role
) VALUES
('PT-ASR-101', TRUE, TRUE, FALSE, 'Dr. YSR Aarogyasri pre-auth approved; laser excision scheduled and Week-2 tobacco cessation counseling completed at Minumuluru.', 'HEALTH_WORKER'),
('PT-ASR-105', TRUE, TRUE, TRUE, 'Post-excision Day-30 mucosal re-capture shows complete healing with zero recurrence. Patient abstaining from gutka.', 'MEDICAL_OFFICER');
