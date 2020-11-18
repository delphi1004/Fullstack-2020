// eslint-disable-next-line @typescript-eslint/no-empty-interface

export enum Gender {
  Male,
  Female,
  Other
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

interface SickLeave{
  startDate:string;
  endDate:string;
}

interface Discharge{
  date:string;
  criteria:string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type:"OccupationalHealthcare";
  employerName:string;
  sickLeave?:SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type:"Hospital";
  discharge?:Discharge;
}

export type EntryType =  Array<HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: EntryType;
}

export type PublicPatient = Omit<Patient, 'ssn'>;


