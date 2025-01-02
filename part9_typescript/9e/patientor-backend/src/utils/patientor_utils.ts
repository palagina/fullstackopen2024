import { Gender, NewPatient } from '../types/patientorTypes';
import { z } from "zod";

export const EntrySchema = z.object({
  id: z.string(),
  // date: z.string().date(),
  // type: z.string(),
  // description: z.string(),
  // specialist: z.string(),
  // diagnosisCodes: z.array(z.string()).optional(),
});

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});



export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

