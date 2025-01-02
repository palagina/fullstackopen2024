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
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Entry {
  id: string;
}