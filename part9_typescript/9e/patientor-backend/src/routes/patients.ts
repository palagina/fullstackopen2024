import express, { Request, Response, NextFunction }  from 'express';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils/patientor_utils';
import errorMiddleware from '../utils/common_utils';
import { NewPatient, Patient } from '../types';

const router = express.Router();
router.use(errorMiddleware);

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
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

export default router;