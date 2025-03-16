import { z } from 'zod';
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

export const validationSchema = z
  .object({
    name: z
      .string()
      .regex(
        FIRST_UPPERCASE_LETTER,
        'Name must start with an uppercase letter'
      ),
    age: z
      .number()
      .positive('Age must be > 0')
      .refine((age) => age <= AGE_MAX, 'Age must be truthful'),
    email: z.string().refine((value) => EMAIL.test(value), {
      message: 'Invalid email format. Example: example@domain.com',
    }),
    password: z
      .string()
      .regex(NUMBER, 'Must include a number')
      .regex(UPPERCASE_LETTER, 'Must include an uppercase letter')
      .regex(LOWERCASE_LETTER, 'Must include a lowercase letter')
      .regex(SPECIAL_CHARACTER, 'Must include a special character'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    gender: z.enum(['male', 'female', 'other']),
    picture: z
      .custom<File>((file) => file instanceof File, 'Invalid file input')
      .refine((file) => file && PICTURE_FILE_TYPES.includes(file.type), {
        message: 'Only PNG and JPEG are allowed',
      })
      .refine((file) => file && file.size <= IMAGE_MAX_SIZE, {
        message: 'Filesize should be less than 2MB',
      }),
    country: z
      .string()
      .nonempty('Country is required')
      .refine((value) => COUNTRIES_LIST.includes(value), {
        message: 'Should be a country from the list',
      }),
    terms: z
      .boolean()
      .refine((val) => val === true, 'You must accept the terms'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

export type inferred = z.infer<typeof validationSchema>;
