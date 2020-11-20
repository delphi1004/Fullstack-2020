import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { patientsReducer } from './patientsReducer';
import { patientReducer } from './patientReducer';
import { diagnosisReducer } from './diagnosisReducer';

const reducers = combineReducers({
    patientsReducer: patientsReducer,
    patientReducer: patientReducer,
    diagnosisReducer:diagnosisReducer
});

const Store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);

export default Store;
export type AppState = ReturnType<typeof reducers>;