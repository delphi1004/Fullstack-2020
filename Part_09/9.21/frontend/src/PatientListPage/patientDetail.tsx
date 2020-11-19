import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Gender, Patient } from "../types";
import { Icon } from "semantic-ui-react";
import { setPatientDetail } from "../state/patientReducer";
import { AppState } from '../state/store';

const PatientDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const diagnoses = useSelector((state: AppState) => state.diagnosisReducer.diagnoses);
    const patient = useSelector((state: AppState) => state.patientReducer.patient);

    React.useEffect(() => {
        const fetchPatientDetail = async () => {
            try {
                if (patient.id !== id) {
                    const { data: patientDetail } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );

                    dispatch(setPatientDetail(patientDetail));
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchPatientDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getGenderIcon = () => {
        switch (patient.gender) {
            case Gender.Male: return <Icon name='mars' />;
            case Gender.Female: return <Icon name='venus' />;
            case Gender.Other: return <Icon name='genderless' />;
            default: return <Icon name='question' />;
        }
    }

    return (
        <div>
            <h2>{patient.name}  {getGenderIcon()} </h2>
            <h4 >ssn : {patient.ssn}</h4>
            <h4 style={{ marginTop: 10 }}>occupation : {patient.occupation}</h4>
            <h2>entries</h2>
            <hr style={{ marginLeft: 0, width: 900 }} />
            {patient.entries && patient.entries.map(entry => (
                <div key={entry.id}>
                    <p>{entry.date} <i>{entry.description}</i></p>
                    <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnosis, index) =>
                            <li
                                key={index} style={{ marginBottom: 5 }}>{diagnosis}&nbsp;&nbsp;&nbsp;&nbsp;
                                {diagnoses[diagnosis] && diagnoses[diagnosis].name}
                            </li>
                        )}
                    </ul>
                </div>
    ))
}
        </div >
    );
};

export default PatientDetail;
