import patients from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatientEntry } from '../types/patientorTypes';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ ssn: _ssn, ...nonSensitivePatientData }) => {
    return nonSensitivePatientData;
  });
};

const addPatient = (entry: NewPatientEntry): Patient  => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient
};