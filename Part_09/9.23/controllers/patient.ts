/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { toNewPatient, toNewPatientEntry } from '../data/patients';
import PatientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {

    try {
        const patients = PatientService.getNonSensitiveEntries();
        if (patients.length > 0) {
            res.send(patients);
        } else {
            res.status(404).end();
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
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

patientRouter.post('/', (req: Request, res: Response, next: NextFunction) => {

    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = PatientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        next(error);
    }
});

patientRouter.post('/:id/entries', (req: Request, res: Response, next: NextFunction) => {

    try {
        const entries = toNewPatientEntry(req.body.entries);
        const updatedPatient = PatientService.addPatientEntries(req.params.id, entries);
        res.send(updatedPatient);
    } catch (error) {
        next(error);
    }
});

export default patientRouter;