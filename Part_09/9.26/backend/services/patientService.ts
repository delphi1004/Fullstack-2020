import { patientEntries } from '../data/patients';
import { PublicPatient, Patient, Entry } from '../types';

const getNonSensitiveEntries = (): PublicPatient[] => {

    return patientEntries.map(patient => getNonSensitiveEntry(patient));
};

const getNonSensitiveEntry = (srcPatient: Patient): PublicPatient => {

    const nonSensitivePatient =
    {
        id: srcPatient.id,
        name: srcPatient.name,
        dateOfBirth: srcPatient.dateOfBirth,
        gender: srcPatient.gender,
        occupation: srcPatient.occupation,
        entries: srcPatient.entries
    };

    return nonSensitivePatient;
};

const addPatient = (newPatient: Patient): PublicPatient => {

    patientEntries.push(newPatient);
    const addedPatient = getNonSensitiveEntry(newPatient);

    return addedPatient;
};

const addPatientEntries = (id: string, entries: Array<Entry>) => {

    const foundPatient = patientEntries.find(patient => patient.id === id);

    if (foundPatient) {
        entries.forEach(entry => {
            foundPatient.entries?.push(entry);
        });
    } else {
        throw new Error(`can't find the user ${id}`);
    }
};

const getSinglePatient = (patientID: string): Patient | undefined => {

    const foundPatient = patientEntries.find(patient => patient.id === patientID);
    return foundPatient;
};

export default {
    getNonSensitiveEntries,
    addPatient,
    addPatientEntries,
    getSinglePatient
};