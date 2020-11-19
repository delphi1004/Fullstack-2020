import { Patient } from "../types";

export const setPatientList = (patients: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  } as const;
};

export const addPatient = (patient: Patient) => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  } as const;
};

type Action =
  | ReturnType<typeof setPatientList>
  | ReturnType<typeof addPatient>;


type PatientsState = {
  patients: { [id: string]: Patient };
};

const initialState: PatientsState = {
  patients: {}
};

export const patientsReducer = (state: PatientsState = initialState, action: Action): PatientsState => {

  //console.log(action, state);

  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (acc, patient) => ({ ...acc, [patient.id]: patient }),
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

    default:
      return state;
  }
};
