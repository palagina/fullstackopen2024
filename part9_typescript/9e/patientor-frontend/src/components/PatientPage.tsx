import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry, HealthCheckRating } from "../types";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import { Card, Grid, Icon } from '@mui/material';

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

  const getEntryTypeIcon = (type: string): string => {
    switch (type) {
      case 'HealthCheck':
        return 'medical_information';
      case 'Hospital':
        return 'home_health';
      case 'OccupationalHealthcare':
        return 'medical_services';
      default:
        return 'home';
    }
  };

  const getHealthCheckRatingColor = (rating: HealthCheckRating): string => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.CriticalRisk:
        return 'red';
      default:
        return '';
    }
  };

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <Grid container spacing={2}>
        {patient.entries.map((entry: Entry, index) => (
          <Grid key={index} item md={12}>
            <Card variant="outlined" sx={{ padding: 2 }}>
              <p>{entry.date} <Icon>{getEntryTypeIcon(entry.type)}</Icon></p>
              <p><i>{entry.description}</i></p>
              <ul>
                {entry.diagnosisCodes?.map((code: string) => (
                  <li key={code}>
                    {code}: {diagnoses[code] || 'Loading...'}
                  </li>
                ))}
              </ul>
              {entry.type === "HealthCheck" && (
                <Icon sx={{ color: getHealthCheckRatingColor(entry.healthCheckRating) }} >favorite</Icon>
              )}
              {entry.specialist ? <p>Diagnose by {entry.specialist}</p> : null}
            </Card>
          </Grid>
      ))}</Grid>
    </div>
  );
};

export default PatientPage;
