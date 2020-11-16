/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { toNewPatientEntry } from '../data/patientEntries';
import PatientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {

    try {
        const patients = PatientService.getNonSensitiveEntries();
        res.send(patients);
    } catch (error) {
        next(error);
    }
});

patientRouter.post('/', (req: Request, res: Response, next: NextFunction) => {

    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = PatientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error) {
        next(error);
    }
});

export default patientRouter;