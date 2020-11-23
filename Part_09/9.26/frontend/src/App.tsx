import React from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";
import { setPatientList } from "./state/patientsReducer";
import { setDiagnosesList } from "./state/diagnosisReducer";
import PatientListPage from "./PatientListPage";
import PatientDetail from './PatientListPage/patientDetail';

const App: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setPatientList(patientListFromApi));
        dispatch(setDiagnosesList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div style={{ paddingLeft: 0, paddingTop: 50 }}>
      <Router >
        <Container >
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patient/:id" render={() => <PatientDetail />} />
            <Route exact path="/" component={PatientListPage} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
