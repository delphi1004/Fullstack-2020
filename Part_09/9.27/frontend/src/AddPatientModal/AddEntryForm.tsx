import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, EntryTypeOption, HealthCheckOption, DiagnosisSelection } from "../AddPatientModal/FormField";
import { EntryType, HealthCheckRating, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry } from "../types";
import { AppState } from '../state/store';
import { EntryValidator } from './entryValidator';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id"> | Omit<OccupationalHealthCareEntry, "id"> | Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" }
];

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "0 Healthy" },
  { value: HealthCheckRating.LowRisk, label: "1 LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "2 HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "3 CriticalRisk" }
];

const healthCheckInitialValues: EntryFormValues =
{
  type: EntryType.HealthCheck,
  date: "",
  description: "",
  specialist: "",
  diagnosisCodes: [],
  healthCheckRating: HealthCheckRating.Healthy
};

const HospitalInitialValues: EntryFormValues =
{
  type: EntryType.Hospital,
  date: "",
  description: "",
  specialist: "",
  diagnosisCodes: [],
  discharge: {
    date: "",
    criteria: ""
  }
};

const occupationalInitialValues: EntryFormValues =
{
  type: EntryType.OccupationalHealthcare,
  date: "",
  description: "",
  specialist: "",
  diagnosisCodes: [],
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: ""
  }
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [currentEntryType, setcurrentEntryType] = useState(EntryType.HealthCheck);
  const diagnoses = useSelector((state: AppState) => state.diagnosisReducer.diagnoses);
  const [entryInitialValues, SetInitialValues] = useState<EntryFormValues>(healthCheckInitialValues);

  const EntryForm = () => {

    if (entryInitialValues === healthCheckInitialValues) {
      return (
        <SelectField
          label="Health check rating"
          name="healthCheckRating"
          options={healthCheckOptions}
        />
      );
    }

    if (entryInitialValues === HospitalInitialValues) {
      return (
        <div>
          <Field
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria"
            placeholder="dischargecriteria"
            name="discharge.criteria"
            component={TextField}
          />
        </div>
      );
    }

    if (entryInitialValues === occupationalInitialValues) {
      return (
        <div>
          <Field
            label="Employer name"
            placeholder="employerName"
            name="employerName"
            component={TextField}
          />
          <Field
            label="sick leave start date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="sick leave end date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </div>
      );
    }
  };

  return (
    <Formik
      initialValues={entryInitialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validate={values => {
        if (currentEntryType !== values.type) {
          setcurrentEntryType(values.type);
          if (typeof values.type === "string") {
            switch (parseInt(values.type)) {
              case EntryType.HealthCheck: SetInitialValues(healthCheckInitialValues); break;
              case EntryType.Hospital: SetInitialValues(HospitalInitialValues); break;
              case EntryType.OccupationalHealthcare: SetInitialValues(occupationalInitialValues); break;
              default: break;
            }
          }
        }
        return EntryValidator(values);
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              type={currentEntryType}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            {EntryForm()}

            <Grid style={{ marginTop: 20 }}>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik >
  );
};

export default AddEntryForm;
