import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types/patientorTypes';


const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};