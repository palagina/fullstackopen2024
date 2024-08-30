import patients from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatient } from '../types/patientorTypes';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ ssn: _ssn, ...nonSensitivePatientData }) => {
    return nonSensitivePatientData;
  });
};

const addPatient = (entry: NewPatient): Patient  => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid() as string;
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