// eslint-disable-next-line @typescript-eslint/no-empty-interface

export enum Gender {
  Male = 0,
  Female,
  Other
}

export enum EntryType {
  Hospital = 0,
  OccupationalHealthcare,
  HealthCheck,
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge?: Discharge;
}

export type Entry = HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: number;
  dateOfBirth?: string;
  entries: Array<Entry>;
}

export type PublicPatient = Omit<Patient, 'ssn'>;


