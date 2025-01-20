import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Record<string, string>>({});

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


  return (
    <div>
      <h1>{patient.name}</h1>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <div>{patient.entries.map((entry: Entry, index) => (
        <div key={index}>
          <p>{entry.date}: <i>{entry.description}</i></p>
          <ul>
            {entry.diagnosisCodes?.map((code: string) => (
              <li key={code}>
                {code}: {diagnoses[code] || 'Loading...'}
              </li>
            ))}
          </ul>
        </div>
      ))}</div>
    </div>
  );
};

export default PatientPage;
