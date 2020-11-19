import React from "react";
import {useSelector } from 'react-redux';
import { Entry, HealthCheckRating } from "../types";
import { Icon, Card } from "semantic-ui-react";
import { assertNever } from "assert-never";
import { AppState } from '../state/store';

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
    const diagnoses = useSelector((state: AppState) => state.diagnosisReducer.diagnoses);

    const getTypeIcon = () => {
        switch (entry.type) {
            case "HealthCheck": return <Icon name='doctor' size="large" />;
            case "OccupationalHealthcare": return <Icon name='stethoscope' size="large" />;
            case "Hospital": return <Icon name='doctor' size="large" />;
            default: assertNever(entry);
        }
    };

    const getEmployerName = () => {
        if (entry.type === "OccupationalHealthcare") {
            return entry.employerName;
        } else {
            return null;
        }
    };

    const getHealthIcon = () => {
        if (entry.type === "HealthCheck") {
            switch (entry.healthCheckRating) {
                case HealthCheckRating.CriticalRisk: return <Icon name='heart' size="large" color="red" />;
                case HealthCheckRating.Healthy: return <Icon name='heart' size="large" color="green" />;
                case HealthCheckRating.HighRisk: return <Icon name='heart' size="large" color="purple" />;
                case HealthCheckRating.LowRisk: return <Icon name='heart' size="large" color="yellow" />;
                default: return null;
            }
        } else {
            return null;
        }
    };

    return (
        <Card style={{ width: 800, marginTop: 20 }}>
            <Card.Content>
                <h3>{entry.date} {getTypeIcon()} {getEmployerName()}</h3>
                <Card.Meta>
                    <span >{entry.description}</span>
                </Card.Meta>
                <Card.Meta style={{ marginTop: 10 }}>
                    {getHealthIcon()}
                </Card.Meta>
                <ul>
                    {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnosis, index) =>
                        <li
                            key={index} style={{ marginBottom: 5 }}>{diagnosis}&nbsp;&nbsp;&nbsp;&nbsp;
                            {diagnoses[diagnosis] && diagnoses[diagnosis].name}
                        </li>
                    )}
                </ul>
            </Card.Content>
        </Card>

        // return (
        //     <div>
        //         {/* <h2>{patient.name}  {getGenderIcon()} </h2>
        //         <h4 >ssn : {patient.ssn}</h4>
        //         <h4 style={{ marginTop: 10 }}>occupation : {patient.occupation}</h4>
        //         <h2>entries</h2>
        //         <hr style={{ marginLeft: 0, width: 900 }} />
        //         {patient.entries && patient.entries.map(entry => (
        //             <div key={entry.id}>
        //                 <p>{entry.date} <i>{entry.description}</i></p>
        //                 <ul>
        //                     {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnosis, index) =>
        //                         <li
        //                             key={index} style={{ marginBottom: 5 }}>{diagnosis}&nbsp;&nbsp;&nbsp;&nbsp;
        //                             {diagnoses[diagnosis] && diagnoses[diagnosis].name}
        //                         </li>
        //                     )}
        //                 </ul>
        //             </div>
        //         ))
        //         } */}
        //     </div >
    );
};

export default EntryDetail;
