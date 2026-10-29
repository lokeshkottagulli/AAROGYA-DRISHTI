-- PostgreSQL DDL Schema for Aarogya Drishti (ITDA Paderu - ASR District)

DROP TABLE IF EXISTS treatment_followups CASCADE;
DROP TABLE IF EXISTS biopsies CASCADE;
DROP TABLE IF EXISTS referrals CASCADE;
DROP TABLE IF EXISTS screenings CASCADE;
DROP TABLE IF EXISTS patients CASCADE;

CREATE TABLE patients (
    id VARCHAR(32) PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    age INTEGER NOT NULL CHECK (age BETWEEN 10 AND 110),
    gender VARCHAR(20) NOT NULL,
    mandal VARCHAR(64) NOT NULL,
    village VARCHAR(100) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    tobacco_chewing BOOLEAN DEFAULT FALSE,
    gutka_areca BOOLEAN DEFAULT FALSE,
    reverse_chutta_smoking BOOLEAN DEFAULT FALSE,
    habit_duration_years INTEGER DEFAULT 0,
    chief_complaints TEXT,
    consent_obtained BOOLEAN DEFAULT TRUE,
    synced_from_offline BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_patients_mandal ON patients(mandal);

CREATE TABLE screenings (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(32) NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    anatomical_site VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    brightness_score REAL DEFAULT 0.94,
    sharpness_score REAL DEFAULT 0.91,
    ai_risk_score REAL NOT NULL,
    ai_prediction_label VARCHAR(32) NOT NULL,
    lesion_morphology VARCHAR(120),
    guardrail_acknowledged BOOLEAN DEFAULT TRUE,
    mo_clinical_decision VARCHAR(150) DEFAULT 'Pending MO Triage',
    mo_reviewed_by VARCHAR(80),
    screened_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_screenings_patient ON screenings(patient_id);
CREATE INDEX idx_screenings_risk_label ON screenings(ai_prediction_label);

CREATE TABLE referrals (
    id VARCHAR(32) PRIMARY KEY,
    patient_id VARCHAR(32) NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    receiving_hospital VARCHAR(160) NOT NULL,
    appointment_date VARCHAR(32) NOT NULL,
    transport_mode VARCHAR(120) DEFAULT 'Girijana Free Feeder Ambulance Booked',
    sms_status VARCHAR(32) DEFAULT 'DELIVERED',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_referrals_patient ON referrals(patient_id);

CREATE TABLE biopsies (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(32) NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    lifecycle_stage VARCHAR(64) NOT NULL,
    histopathology_impression TEXT,
    tnm_staging VARCHAR(64),
    pathologist_name VARCHAR(120) DEFAULT 'Dr. M. Praveen, MD (Pathology)',
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_biopsies_patient ON biopsies(patient_id);

CREATE TABLE treatment_followups (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(32) NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    aarogyasri_approved BOOLEAN DEFAULT TRUE,
    tobacco_cessation_counseled BOOLEAN DEFAULT TRUE,
    day_30_mucosal_recheck BOOLEAN DEFAULT FALSE,
    followup_note TEXT NOT NULL,
    logged_by_role VARCHAR(50) DEFAULT 'HEALTH_WORKER',
    logged_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_followups_patient ON treatment_followups(patient_id);
