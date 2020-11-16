import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
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
        const { name, ssn, dateOfBirth, occupation, gender } = req.body;
        const addedPatient = PatientService.addPatient(name, ssn, dateOfBirth, occupation, gender);
        res.json(addedPatient);
    } catch (error) {
        next(error);
    }
});

export default patientRouter;