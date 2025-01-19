import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../../types";
import patientService from "../../services/patients";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const patient = await patientService.getPatientById(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, []);

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
            {entry.diagnosisCodes?.map((code: string, index) => (
              <li key={index}>{code}</li>
            ))}
          </ul>
        </div>
      ))}</div>
    </div>
  );
};

export default PatientPage;
