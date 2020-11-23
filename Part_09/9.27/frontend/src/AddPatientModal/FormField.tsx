import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, Gender, EntryType, HealthCheckRating } from "../types";

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

// structure of a single option
export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

export type HealthCheckOption = {
  value: HealthCheckRating;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: Array<GenderOption | EntryTypeOption | HealthCheckOption>;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options
}: SelectFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );

/*
  for exercises 9.27.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  type,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  type: number;
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const [clearSelection, setClearSelection] = useState<boolean>(true);

  useEffect(() => {
    setClearSelection(true);
  }, [type]);

  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const onFocus = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
  ) => {
    setClearSelection(false);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      {!clearSelection &&
        <Dropdown
          fluid
          multiple
          search
          selection
          searchInput={{ autoFocus: true }}
          options={stateOptions}
          onChange={onChange}
        />
      }
      {clearSelection &&
        <Dropdown
          fluid
          multiple
          search
          selection
          options={stateOptions}
          onFocus = {onFocus}
          value = {[""]}
        />
      }
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
