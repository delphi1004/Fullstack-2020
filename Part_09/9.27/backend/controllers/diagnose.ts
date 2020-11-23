import express from 'express';
import { Request, Response } from 'express';
import diagnoseData from '../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoseRouter = express.Router();
const diagnoses: Array<Diagnosis> = diagnoseData;

diagnoseRouter.get('/', (_req: Request, res: Response) => {    
    res.send(diagnoses);
});

export default diagnoseRouter;