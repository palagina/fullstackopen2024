import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosisService.getDiagnoses());
});


router.get('/:code', (req, res) => {
  try {
    const diagnosis = diagnosisService.getDiagnosisByCode(String(req.params.code));
    if (diagnosis) {
      res.send(diagnosis);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;