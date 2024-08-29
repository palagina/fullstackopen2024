import patients from '../../data/patients';
import { Patient, NonSensitivePatientData } from '../types/patientorTypes';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ ssn: _ssn, ...nonSensitivePatientData }) => {
    return nonSensitivePatientData;
  });
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient
};