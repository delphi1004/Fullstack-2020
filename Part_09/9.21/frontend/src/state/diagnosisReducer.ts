import { Diagnosis } from "../types";

type Action = ReturnType<typeof setDiagnosesList>;

export const setDiagnosesList = (diagnosis: Diagnosis[]) => {
    return {
        type: "SET_DIAGNOSIS",
        payload: diagnosis
    } as const;
}

export type DiagnosisState = {
    diagnoses: { [code: string]: Diagnosis }
};

const initialState: DiagnosisState = {
    diagnoses: {}
};

export const diagnosisReducer = (state: DiagnosisState = initialState, action: Action): DiagnosisState => {

   // console.log(action , state)

    switch (action.type) {
        case "SET_DIAGNOSIS":
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (acc, diagnosis) => ({ ...acc, [diagnosis.code]: diagnosis }),
                        {}
                    ),
                    ...state.diagnoses
                }
            };

        default:
            return state;
    }
};
