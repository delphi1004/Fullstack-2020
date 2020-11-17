/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { toNewPatientEntry } from '../data/patientEntries';
import PatientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {

    try {
        const patients = PatientService.getNonSensitiveEntries();
        if (patients.length > 0) {
            res.send(patients);
        } else {
            res.status(404).end()
        }
    } catch (error) {
        next(error);
    }
});

patientRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {

    try {
        const patient = PatientService.getSinglePatient(req.params.id);
        if (patient !== undefined) {
            res.send(patient);
        } else {
            res.status(404).end()
        }
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