import express, { Request, Response, NextFunction }  from 'express';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils/patientor_utils';
import errorMiddleware from '../utils/common_utils';
import { NewPatient, Patient, Diagnosis, EntryWithoutId, Entry } from '../types';

const router = express.Router();
router.use(errorMiddleware);

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getPatientById(String(req.params.id));
    if (patient) {
      res.send(patient); 
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});


const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

router.post('/:id/entries', (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry>) => {
  const { id } = req.params;
    const entry = req.body;
    const diagnosisCodes = parseDiagnosisCodes(entry);
    const completeEntry = { ...entry, diagnosisCodes };
    const addedEntry = patientService.addEntry(id, completeEntry);
    res.json(addedEntry);
});

export default router;