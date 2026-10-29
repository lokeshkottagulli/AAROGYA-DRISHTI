from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
)
from sqlalchemy.orm import relationship
from database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(String(32), primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(20), nullable=False)
    mandal = Column(String(64), nullable=False, index=True)
    village = Column(String(100), nullable=False)
    phone = Column(String(32), nullable=False)
    tobacco_chewing = Column(Boolean, default=False)
    gutka_areca = Column(Boolean, default=False)
    reverse_chutta_smoking = Column(Boolean, default=False)
    habit_duration_years = Column(Integer, default=0)
    chief_complaints = Column(Text, nullable=True)
    consent_obtained = Column(Boolean, default=True)
    synced_from_offline = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    screenings = relationship("Screening", back_populates="patient", cascade="all, delete-orphan")
    referrals = relationship("Referral", back_populates="patient", cascade="all, delete-orphan")
    biopsies = relationship("BiopsyDiagnostic", back_populates="patient", cascade="all, delete-orphan")
    followups = relationship("TreatmentFollowUp", back_populates="patient", cascade="all, delete-orphan")


class Screening(Base):
    __tablename__ = "screenings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(String(32), ForeignKey("patients.id", ondelete="CASCADE"), nullable=False, index=True)
    anatomical_site = Column(String(100), nullable=False)
    image_url = Column(String(255), nullable=True)
    brightness_score = Column(Float, default=0.94)
    sharpness_score = Column(Float, default=0.91)
    ai_risk_score = Column(Float, nullable=False)
    ai_prediction_label = Column(String(32), nullable=False, index=True)
    lesion_morphology = Column(String(120), nullable=True)
    guardrail_acknowledged = Column(Boolean, default=True)
    mo_clinical_decision = Column(String(150), default="Pending MO Triage")
    mo_reviewed_by = Column(String(80), nullable=True)
    screened_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="screenings")


class Referral(Base):
    __tablename__ = "referrals"

    id = Column(String(32), primary_key=True, index=True)
    patient_id = Column(String(32), ForeignKey("patients.id", ondelete="CASCADE"), nullable=False, index=True)
    receiving_hospital = Column(String(160), nullable=False)
    appointment_date = Column(String(32), nullable=False)
    transport_mode = Column(String(120), default="Girijana Free Feeder Ambulance Booked")
    sms_status = Column(String(32), default="DELIVERED")
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="referrals")


class BiopsyDiagnostic(Base):
    __tablename__ = "biopsies"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(String(32), ForeignKey("patients.id", ondelete="CASCADE"), nullable=False, index=True)
    lifecycle_stage = Column(String(64), nullable=False)
    histopathology_impression = Column(Text, nullable=True)
    tnm_staging = Column(String(64), nullable=True)
    pathologist_name = Column(String(120), default="Dr. M. Praveen, MD (Pathology)")
    updated_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="biopsies")


class TreatmentFollowUp(Base):
    __tablename__ = "treatment_followups"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(String(32), ForeignKey("patients.id", ondelete="CASCADE"), nullable=False, index=True)
    aarogyasri_approved = Column(Boolean, default=True)
    tobacco_cessation_counseled = Column(Boolean, default=True)
    day_30_mucosal_recheck = Column(Boolean, default=False)
    followup_note = Column(Text, nullable=False)
    logged_by_role = Column(String(50), default="HEALTH_WORKER")
    logged_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="followups")
