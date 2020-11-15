import express from 'express';
import { Request, Response } from 'express';
import patientData from '../data/patients.json';
import { NonSensitiveDiaryEntry } from '../types';

const patientRouter = express.Router();
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

patientRouter.get('/', (_req: Request, res: Response) => {

    const patients = getNonSensitiveEntries();
    res.send(patients);
});

export default patientRouter;