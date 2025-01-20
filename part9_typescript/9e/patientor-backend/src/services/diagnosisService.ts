import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';


const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getDiagnosisByCode = (code: string): Diagnosis | undefined => {
  return diagnoses.find(diagnosis => diagnosis.code === code);
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  getDiagnosisByCode,
  addDiagnose
};