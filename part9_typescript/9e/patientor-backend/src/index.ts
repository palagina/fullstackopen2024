/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
//import { ErrorRequestHandler } from 'express';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(status).json({
    error: {
      message,
      ...(err.details && { details: err.details }),
    },
  });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});