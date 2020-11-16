import patientData from '../data/patients.json';
import { NonSensitiveDiaryEntry } from '../types';

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (name: string, ssn: string, dateOfBirth: string, occupation: string, gender: string): NonSensitiveDiaryEntry => {

    const id: string = (Math.random() * 10000).toString();

    const newPatient = {
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    }

    patientData.push(newPatient);

    const addedPatient =
    {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }

    return addedPatient;
}

export default {
    getNonSensitiveEntries,
    addPatient
};