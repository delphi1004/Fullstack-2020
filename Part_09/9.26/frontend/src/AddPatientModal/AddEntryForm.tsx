import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, EntryTypeOption, HealthCheckOption, DiagnosisSelection } from "../AddPatientModal/FormField";
import { EntryType, HealthCheckRating, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry } from "../types";
import { AppState } from '../state/store';
import moment from "moment";

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

type initialEntries = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry;

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [currentEntryType, setcurrentEntryType] = useState(0);
  const diagnoses = useSelector((state: AppState) => state.diagnosisReducer.diagnoses);
  const [initialValues, SetInitialValues] = useState<EntryFormValues>(healthCheckInitialValues);

  const EntryForm = () => {

    if (initialValues === healthCheckInitialValues) {
      return (
        <SelectField
          label="Health check rating"
          name="healthCheckRating"
          options={healthCheckOptions}
        />
      );
    }

    if (initialValues === HospitalInitialValues) {
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

    if (currentEntryType === EntryType.OccupationalHealthcare) {
      return (
        <div>
          <h3>OccupationalHealthcare</h3>
        </div>
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!(values.type in EntryType)) {
          errors.type = requiredError;
        }
        if (!moment(values.date, 'YYYY-MM-DD', true).isValid()) {
          errors.date = "invalid date format";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }

        if (currentEntryType !== values.type) {
          setcurrentEntryType(values.type);
          if (typeof values.type === "string") {
            switch (parseInt(values.type)) {
              case EntryType.HealthCheck: console.log('change to HealthCheck'); SetInitialValues(healthCheckInitialValues); break;
              case EntryType.Hospital: console.log('change to Hospital'); SetInitialValues(HospitalInitialValues); break;
              default: break;
            }
          }
        }
        return errors;
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
    </Formik>
  );
};

export default AddEntryForm;
