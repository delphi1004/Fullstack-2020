import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { EntryType, Gender, Patient } from "../types";
import { Icon, Button } from "semantic-ui-react";
import { addPatientEntry, setPatientDetail } from "../state/patientReducer";
import { AppState } from '../state/store';
import EntryDetail from './entryDetail';
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";
import { AddEntryModal } from "../AddPatientModal";

const PatientDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    const dispatch = useDispatch();
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
    };

    const submitNewEntry = async (entry: EntryFormValues) => {
        try {

            if(entry.type === EntryType.HealthCheck){
                entry.healthCheckRating = parseInt(entry.healthCheckRating.toString());
            }
  
            const wrappedValues = [entry].flat();
            const { data: newEntry } = await axios.post(
                `${apiBaseUrl}/patients/${patient.id}/entries`,
                { entries: wrappedValues }
            );

            console.log("entry added " , newEntry);
            
            dispatch(addPatientEntry(newEntry));
        } catch (e) {
            console.error(e.response.data.error);
            setError(e.response.data.error);
        }finally{
            closeModal();
        }
    };

    return (
        <div>
            <h2>{patient.name}  {getGenderIcon()} </h2>
            <h4 >ssn : {patient.ssn}</h4>
            <h4 style={{ marginTop: 10 }}>occupation : {patient.occupation}</h4>
            <hr style={{ marginLeft: 0, marginTop: 10, width: 900 }} />
            <h2>entries
            <Button icon style={{ marginLeft: 10, marginTop: 0 }} onClick={() => openModal()}>
                    <Icon name='add' />
                </Button>
            </h2>

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />

            {patient.entries && patient.entries.map(entry => (
                <div key={entry.id}>
                    <EntryDetail entry={entry} />
                </div>
            ))}
        </div >
    );
};

export default PatientDetail;
