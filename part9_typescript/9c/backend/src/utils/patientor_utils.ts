import { NewPatient, Gender } from '../types/patientorTypes';

const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
      const newEntry: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
      };
  
      return newEntry;
    }
  
    throw new Error('Incorrect data: some fields are missing');
  };

  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const parseString = (prop: unknown): string => {
    if (!prop || !isString(prop)) {
      throw new Error('Incorrect or missing a required property');
    }
    return prop;
  };

  const parseDateOfBirth = (dob: unknown): string => {
    if (!dob || !isString(dob)) {
      throw new Error('Incorrect or missing comment');
    }
    return dob;
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

  const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

  export default toNewPatient;
