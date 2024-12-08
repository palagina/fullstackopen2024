import express, { Request, Response, NextFunction } from 'express';
import diaryService from '../services/diaryService';
import { NewEntrySchema } from '../utils/diary_utils';
import { NewDiaryEntry, DiaryEntry } from '../types/diaryTypes';
import errorMiddleware from '../utils/common_utils';

const router = express.Router();
router.use(errorMiddleware);

router.get('/', (_req, res) => {
    res.send(diaryService.getEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  const addedEntry = diaryService.addDiary(req.body);
  res.json(addedEntry);
});

export default router;