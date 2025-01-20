import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAllDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );
  return data;
};

const getDiagnosisByCode = async (code: string): Promise<Diagnosis>  => {
  const response = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${code}`);
  return response.data;
};


export default {
  getAllDiagnoses,
  getDiagnosisByCode
};

