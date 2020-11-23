import { Patient, Gender, Entry } from "../types";

export const setPatientDetail = (patient: Patient) => {
    return {
        type: "SET_PATIENT_DETAIL",
        payload: patient
    } as const;
};

export const addPatientEntry = (entry: Array<Entry>) => {
    return {
        type: "ADD_PATIENT_ENTRY",
        payload: entry
    } as const;
};

type Action =
    | ReturnType<typeof setPatientDetail>
    | ReturnType<typeof addPatientEntry>;

type PatientState = {
    patient: Patient;
};

const initialState: PatientState = {
    patient: {
        id: "",
        name: "",
        occupation: "",
        ssn: "",
        gender: Gender.Other,
        dateOfBirth: "",
        entries: []
    }
};

export const patientReducer = (state: PatientState = initialState, action: Action): PatientState => {

    switch (action.type) {
        case "SET_PATIENT_DETAIL":
            return {
                patient: action.payload
            };

        case "ADD_PATIENT_ENTRY":

            action.payload.forEach(entry =>{
                state.patient.entries.push(entry);
            });

            return {
                ...state,
            };

        default:
            return state;
    }
};
