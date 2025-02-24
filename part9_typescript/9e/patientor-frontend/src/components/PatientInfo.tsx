// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { Entry, HealthCheckRating, Patient } from "../types";
// import patientService from "../services/patients";
// import diagnosisService from "../services/diagnoses";
import { Card, Grid, Icon} from '@mui/material';

interface Props {
  patient: Patient,
  diagnoses: Record<string, string>
}


const PatientInfo = ({ patient, diagnoses } : Props ) => {
  
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

export default PatientInfo;
