import { patientEntries } from '../data/patients';
import { PublicPatient, Patient } from '../types';

const getNonSensitiveEntries = (): PublicPatient[] => {

    return patientEntries.map(patient => getNonSensitiveEntry(patient));
}

const getNonSensitiveEntry = (srcPatient: Patient): PublicPatient => {

    const nonSensitivePatient =
    {
        id: srcPatient.id,
        name: srcPatient.name,
        dateOfBirth: srcPatient.dateOfBirth,
        gender: srcPatient.gender,
        occupation: srcPatient.occupation,
        entries:srcPatient.entries
    }

    return nonSensitivePatient;
};

const addPatient = (newPatient: Patient): PublicPatient => {
    
    patientEntries.push(newPatient);
    const addedPatient = getNonSensitiveEntry(newPatient);

    return addedPatient;
}

const getSinglePatient = (patientID: string): Patient | undefined => {

    const foundPatient = patientEntries.find(patient => patient.id === patientID)

    return foundPatient;
}

export default {
    getNonSensitiveEntries,
    addPatient,
    getSinglePatient
};