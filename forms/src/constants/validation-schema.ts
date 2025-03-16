import * as yup from 'yup';
import {
  AGE_MAX,
  EMAIL,
  FIRST_UPPERCASE_LETTER,
  IMAGE_MAX_SIZE,
  LOWERCASE_LETTER,
  NUMBER,
  PICTURE_FILE_TYPES,
  SPECIAL_CHARACTER,
  UPPERCASE_LETTER,
} from './rules';
import { COUNTRIES_LIST } from './constants';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(FIRST_UPPERCASE_LETTER, 'Name must start with an uppercase letter')
    .required(),

  age: yup
    .number()
    .positive('Age must be > 0')
    .max(AGE_MAX, 'Age must be truthful')
    .required(),

  email: yup
    .string()
    .matches(EMAIL, 'Invalid email format. Example: example@domain.com')
    .required(),

  password: yup
    .string()
    .matches(NUMBER, 'Must include a number')
    .matches(UPPERCASE_LETTER, 'Must include an uppercase letter')
    .matches(LOWERCASE_LETTER, 'Must include a lowercase letter')
    .matches(SPECIAL_CHARACTER, 'Must include a special character')
    .required(),

  confirm: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'The passwords did not match'),

  gender: yup.string().oneOf(['male', 'female', 'other']).required(),

  picture: yup
    .mixed<File>()
    .test(
      'file-required',
      'File is required',
      (value) => value instanceof File && value.size > 0
    )
    .test(
      'file-type',
      'Invalid file type',
      (value) =>
        value instanceof File && PICTURE_FILE_TYPES.includes(value.type)
    )
    .test(
      'file-size',
      'File too large',
      (value) => value instanceof File && value.size <= IMAGE_MAX_SIZE
    )
    .required('Required'),

  country: yup
    .string()
    .required('Country is required')
    .oneOf(COUNTRIES_LIST, 'Should be a country from the list'),

  terms: yup.boolean().isTrue('You must accept the terms').required(),
});

export type InferredType = yup.InferType<typeof validationSchema>;
