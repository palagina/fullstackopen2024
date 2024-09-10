import { z } from 'zod';
import { NewPatientSchema } from '../utils/patientor_utils';
export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}