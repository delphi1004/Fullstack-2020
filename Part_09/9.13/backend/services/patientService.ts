import { patientEntries } from '../data/patientEntries';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {

    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (newPatient: PatientEntry): NonSensitivePatientEntry => {

    patientEntries.push(newPatient);

    const addedPatient =
    {
        id: newPatient.id,
        name: newPatient.name,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        occupation: newPatient.occupation
    }

    return addedPatient;
}

export default {
    getNonSensitiveEntries,
    addPatient
};