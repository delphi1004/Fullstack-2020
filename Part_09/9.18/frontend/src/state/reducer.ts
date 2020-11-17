import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | ReturnType<typeof setPatientList>
  | ReturnType<typeof addPatient>
  | ReturnType<typeof setPatientDetail>;

export const setPatientList = (patients: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  } as const;
}

export const addPatient = (patient: Patient) => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  } as const;
}

export const setPatientDetail = (patient: Patient) => {
  return {
    type: "SET_PATIENT_DETAIL",
    payload: patient
  } as const;
}

export const reducer = (state: State, action: Action): State => {

  console.log(action, state);

  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DETAIL":
      return {
        ...state,
        patient: action.payload
      };

    default:
      return state;
  }
};
