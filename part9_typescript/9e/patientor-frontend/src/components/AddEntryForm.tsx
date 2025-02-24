import { useState, SyntheticEvent } from "react";
import {  TextField, Button, InputLabel, MenuItem, Select, SelectChangeEvent, Box } from '@mui/material';
import { EntryFormValues, HealthCheckRating, HealthCheckFormValues } from "../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState('ssss');
  const [date, setDate] = useState('2025.02.24');
  const [specialist, setSpecialist] = useState('sssss');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState('S03.5');

  const onHealthCheckRatingChange = (event: SelectChangeEvent) => {
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const codesArray = diagnosisCodes.split(', ');
    const newEntry: HealthCheckFormValues = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes: codesArray
    };
    onSubmit(newEntry);
    resetForm();
  };

  const resetForm = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDiagnosisCodes('');
  };

  return (
    <div>
      <h1>New Health Check entry</h1>

      <form onSubmit={addEntry}>
        <Box mb={2}> {/* Adds bottom margin */}
          <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </Box>

        <Box mb={2}>
          <InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
          <Select value={healthCheckRating.toString()} fullWidth onChange={onHealthCheckRatingChange}>
            {Object.values(HealthCheckRating)
              .filter(value => typeof value === "number")
              .map(value => (
                <MenuItem key={value} value={value.toString()}>
                  {HealthCheckRating[value as HealthCheckRating]}
                </MenuItem>
              ))}
          </Select>
        </Box>

        <Box mb={2}>
          <TextField
            label="Diagnosis codes"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />
        </Box>
        <Button
          style={{
            float: "right",
          }}
          type="submit"
          variant="contained"
        >
          Add
        </Button>

        <Button
            style={{
              float: "left",
            }}
            variant="contained"
            color="secondary"
            onClick={resetForm}
          >
            Cancel
          </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;