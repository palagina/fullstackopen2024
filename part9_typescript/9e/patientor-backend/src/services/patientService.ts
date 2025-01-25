import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, ...nonSensitivePatientData }) => {
    return nonSensitivePatientData;
  });
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient  => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry  => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };

  const patientIndex = patients.findIndex((patient) => patient.id === patientId);
  patients[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatientData,
  addPatient,
  addEntry
};