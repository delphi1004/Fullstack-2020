import { Patient, Gender, EntryType, Entry, HealthCheckEntry, HospitalEntry, BaseEntry, HealthCheckRating, OccupationalHealthCareEntry } from '../types';

const patients: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: Gender.Male,
    occupation: 'New york city cop',
    entries: [
      {
        id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
        date: '2015-01-02',
        type: EntryType.Hospital,
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      },
    ],
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-777A',
    gender: Gender.Male,
    occupation: 'Cop',
    entries: [
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-08-05',
        type: EntryType.OccupationalHealthcare,
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
      },
    ],
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    ssn: '250470-555L',
    gender: Gender.Male,
    occupation: 'Technician',
    entries: [],
  },
  {
    id: 'd2773822-f723-11e9-8f0b-362b9e155667',
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    ssn: '050174-432N',
    gender: Gender.Female,
    occupation: 'Forensic Pathologist',
    entries: [
      {
        id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
        date: '2019-10-20',
        specialist: 'MD House',
        type: EntryType.HealthCheck,
        description: 'Yearly control visit. Cholesterol levels back to normal.',
        healthCheckRating: 0,
      },
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-09-10',
        specialist: 'MD House',
        type: EntryType.OccupationalHealthcare,
        employerName: 'FBI',
        description: 'Prescriptions renewed.',
      },
      {
        id: '37be178f-a432-4ba4-aac2-f86810e36a15',
        date: '2018-10-05',
        specialist: 'MD House',
        type: EntryType.HealthCheck,
        description:
          'Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.',
        healthCheckRating: 1,
      },
    ],
  },
  {
    id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '090471-8890',
    gender: Gender.Male,
    occupation: 'Digital evangelist',
    entries: [
      {
        id: '54a8746e-34c4-4cf4-bf72-bfecd039be9a',
        date: '2019-05-01',
        specialist: 'Dr Byte House',
        type: EntryType.HealthCheck,
        description: 'Digital overdose, very bytestatic. Otherwise healthy.',
        healthCheckRating: 0,
      },
    ],
  },
];

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseID = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error(`Incorrect or missing ID: ${id}`);
  }

  return id;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const parseDateOfBirth = (birthDay: any): string => {
  if (!birthDay || !isDate(birthDay)) {
    throw new Error(`Incorrect or missing date of birth: ${birthDay}`);
  }

  return birthDay;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

const parseBaseEntry = (entry: BaseEntry) => {

  if (!entry.id || !isString(entry.id)) {
    entry.id = (Math.random() * 10000).toString();
  }

  if (!entry.description || !isString(entry.description)) {
    throw new Error(`Incorrect or missing patient's entry description: ${entry.description}`);
  }

  if (!entry.date || !isDate(entry.date)) {
    throw new Error(`Incorrect or missing patient's entry date: ${entry.date}`);
  }

  if (!entry.specialist || !isString(entry.specialist)) {
    throw new Error(`Incorrect or missing patient's entry specialist: ${entry.specialist}`);
  }

  if (entry.diagnosisCodes !== undefined) {
    entry.diagnosisCodes.forEach(code => {
      if (!isString(code)) {
        throw new Error(`Incorrect or missing patient's entry diagnosis code: ${code}`);
      }
    });
  }

  return entry;
};

const parseHealthCheckEntry = (entry: HealthCheckEntry) => {

  parseBaseEntry(entry);

  console.log('****', entry, typeof entry.type);

  if (!(entry.healthCheckRating in HealthCheckRating)) {
    throw new Error(`Incorrect or missing patient's entry health check rate: ${entry.healthCheckRating}`);
  }
};

const parseHospitalCheckEntry = (entry: HospitalEntry) => {

  parseBaseEntry(entry);

  console.log('****', entry);

  if (entry.discharge !== undefined) {

    if (entry.discharge.date && !isDate(entry.discharge.date)) {
      throw new Error(`Incorrect or missing discharge date: ${entry.discharge.date}`);
    }

    if (!entry.discharge.criteria && !isString(entry.discharge.criteria)) {
      throw new Error(`Incorrect or missing discharge criteria: ${entry.discharge.criteria}`);
    }
  }
};

const parseOccupationalHealthcare = (entry: OccupationalHealthCareEntry) => {

  parseBaseEntry(entry);

  if (!entry.employerName || !isString(entry.employerName)) {
    throw new Error(`Incorrect or missing patient's employer name: ${entry.employerName}`);
  }

  if (entry.sickLeave) {
    if (!isDate(entry.sickLeave.startDate) && entry.sickLeave.startDate.length > 0) {
      throw new Error(`Incorrect patient's start date of sick leave: ${entry.sickLeave.startDate}`);
    }

    if (!isDate(entry.sickLeave.endDate) && entry.sickLeave.endDate.length > 0) {
      throw new Error(`Incorrect patient's end date of sick leave: ${entry.sickLeave.startDate}`);
    }
  }
};

const parseEntryFieldType = (patientEntry: Array<Entry>): Array<Entry> => {

  if (patientEntry) {
    patientEntry.forEach(entry => {
      if (typeof entry.type === 'string') {
        entry.type = parseInt(entry.type);
      }
      if (entry.type in EntryType) {
        switch (entry.type) {
          case EntryType.HealthCheck: parseHealthCheckEntry(entry); break;
          case EntryType.OccupationalHealthcare: parseOccupationalHealthcare(entry); break;
          case EntryType.Hospital: parseHospitalCheckEntry(entry); break;
        }
      } else {
        throw new Error("missing or wrong entry type");
      }
    })
  }

  return patientEntry;
};

export const toNewPatient = (object: any): Patient => {

  return {
    id: parseID((Math.random() * 10000).toString()),
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntryFieldType(object.entries),
  };
};

export const toNewPatientEntry = (entries: any): Array<Entry> => {
  return parseEntryFieldType(entries);
};

export const patientEntries: Patient[] = patients.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

module.exports = {
  patientEntries,
  toNewPatient,
  toNewPatientEntry
};