import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, EntryFormValues } from "../types";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import { Box, Alert } from '@mui/material';
import AddEntryForm from "./AddEntryForm";
import PatientInfo from "./PatientInfo";
import axios from 'axios';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>();

  const getDiagnosisNameByCode = async (code: string): Promise<string> => {
    const diagnosis = await diagnosisService.getDiagnosisByCode(code);
    return diagnosis.name || '';
  };

  useEffect(() => {
    if (!id) return;
  
    let isMounted = true; // To prevent setting state after unmounting
  
    const fetchPatientData = async () => {
      try {
        const patient = await patientService.getPatientById(id);
        if (!isMounted) return;
        setPatient(patient);
  
        const allDiagnosisCodes = patient.entries
          .flatMap((entry) => entry.diagnosisCodes || [])
          .filter((code, index, array) => array.indexOf(code) === index);
  
        const diagnoses = await Promise.all(
          allDiagnosisCodes.map(async (code) => {
            const name = await getDiagnosisNameByCode(code);
            return { code, name };
          })
        );
  
        const diagnosisMap = diagnoses.reduce((acc, { code, name }) => {
          acc[code] = name;
          return acc;
        }, {} as Record<string, string>);
  
        if (!isMounted) return;
        setDiagnoses(diagnosisMap);
      } catch (error) {
        console.error("Error fetching patient or diagnoses:", error);
      }
    };
    fetchPatientData();
  
    return () => {
      isMounted = false; // Clean-up to avoid memory leaks
    };
  }, [id]);
  

  if (!patient) {
    return <div>Loading...</div>;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const newEntry = await patientService.addEntry(values, patient.id);
      const newEntryList = [...patient.entries, newEntry];
      setPatient({...patient, entries: newEntryList});
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
      <Box display="flex" flexDirection="row" gap={3}>
        <Box flex={8}>
          <PatientInfo patient={patient} diagnoses={diagnoses}/>
        </Box>
        <Box flex={4}>
          <AddEntryForm onSubmit={submitNewEntry} />
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Box>

  );
};

export default PatientPage;
