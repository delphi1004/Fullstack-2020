import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Gender, Patient } from "../types";
import { Icon } from "semantic-ui-react";


const PatientDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient }, dispatch] = useStateValue();

    React.useEffect(() => {
        const fetchPatientDetail = async () => {
            try {
                if (patient.id !== id) {
                    const { data: patientDetail } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch({ type: "SET_PATIENT_DETAIL", payload: patientDetail });
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
            <h3>ssn : {patient.ssn}</h3>
            <h3>occupation : {patient.occupation}</h3>
        </div>
    );
};

export default PatientDetail;
