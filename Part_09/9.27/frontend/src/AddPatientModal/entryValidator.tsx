import { EntryType } from "../types";
import { EntryFormValues } from './AddEntryForm';
import moment from "moment";

export const EntryValidator = (values: EntryFormValues) => {

  const requiredError = "Field is required";
  const errors: { [field: string]: string | {} } = {};
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

  if (values.type === EntryType.Hospital) {
    if (values.discharge.date) {
      if (!moment(values.discharge.date, 'YYYY-MM-DD', true).isValid()) {
        errors.discharge = { date: "invalid discharge date format" };
      }
    }
  }

  if (values.type === EntryType.OccupationalHealthcare) {

    if (values.sickLeave && (values.sickLeave.startDate.length > 0 || values.sickLeave.endDate.length > 0)) {
      let messageStartDate = "";
      let messageEndDate = "";

      if (!moment(values.sickLeave.startDate, 'YYYY-MM-DD', true).isValid()) {
        messageStartDate = "invalid sick leave start date format";
      }

      if (!moment(values.sickLeave.endDate, 'YYYY-MM-DD', true).isValid()) {
        messageEndDate = "invalid sick leave end date format";
      }

      if (messageStartDate || messageEndDate) {
        errors.sickLeave = { startDate: messageStartDate, endDate: messageEndDate };
      }
    }

    if (!values.employerName) {
      errors.employerName = requiredError;
    }
  }
  return { ...errors };
};