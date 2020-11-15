import express from 'express';
import { Request, Response } from 'express';
import diagnoseData from '../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const diagnoseRouter = express.Router();
const diagnoses: Array<DiagnoseEntry> = diagnoseData;

diagnoseRouter.get('/', (_req: Request, res: Response) => {    
    res.send(diagnoses);
});

export default diagnoseRouter;