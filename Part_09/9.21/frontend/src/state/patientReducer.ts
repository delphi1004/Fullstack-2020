import { Patient, Gender } from "../types";

type Action = ReturnType<typeof setPatientDetail>;

export const setPatientDetail = (patient: Patient) => {
    return {
        type: "SET_PATIENT_DETAIL",
        payload: patient
    } as const;
}

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
                ...state,
                patient: action.payload
            };

        default:
            return state;
    }
};
