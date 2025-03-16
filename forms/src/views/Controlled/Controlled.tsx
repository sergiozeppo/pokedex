import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { validationSchema } from '../../constants/validation-schema';
import { pictureToBase64 } from '../../utils/pictureToBase64';
import { saveForm } from '../../store/reducers/formsSlice';
import { useEffect, useState } from 'react';
import {
  checkPassStrength,
  getStrengthColor,
} from '../../utils/checkPassStrength';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { PICTURE_FILE_TYPES } from '../../constants/rules';

type FormValues = InferType<typeof validationSchema>;

export default function ControlledForm() {
  const countries = useSelector((state: RootState) => state.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      terms: undefined,
      gender: 'male',
      picture: undefined,
    },
  });

  const password = watch('password');
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    if (password) {
      setStrength(checkPassStrength(password));
    }
  }, [password]);

  const onSubmit = async (data: FormValues) => {
    try {
      const pictureBase64 = await pictureToBase64(data.picture as File);
      const submitData = { ...data, picture: pictureBase64 };
      dispatch(saveForm(submitData));
      navigate('/', { state: true });
    } catch (error) {
      console.error('Error processing form:', error);
    }
  };

  return (
    <>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <label htmlFor="name">
          <span>Name</span>
          <input {...register('name')} type="text" id="name" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </label>

        <label htmlFor="age">
          Age
          <input
            {...register('age', { valueAsNumber: true })}
            type="number"
            id="age"
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </label>

        <label htmlFor="email">
          Email
          <input {...register('email')} type="email" id="email" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </label>

        <label htmlFor="password">
          Password
          <input {...register('password')} type="password" id="password" />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </label>

        <div className="strength-meter">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`bar ${index < strength ? getStrengthColor(strength) : ''}`}
            ></div>
          ))}
        </div>

        <label htmlFor="confirm">
          Confirm Password
          <input {...register('confirm')} type="password" id="confirm" />
          {errors.confirm && <p className="error">{errors.confirm.message}</p>}
        </label>

        <div className="gender">
          <div className="gender-wrapper">
            {['male', 'female', 'other'].map((gender) => (
              <label key={gender} htmlFor={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
                <input
                  {...register('gender')}
                  type="radio"
                  id={gender}
                  value={gender}
                />
              </label>
            ))}
          </div>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>

        <label className="picture-label" htmlFor="picture">
          Choose a picture
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                id="picture"
                accept={PICTURE_FILE_TYPES.join(', ')}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
            )}
          />
          {errors.picture && <p className="error">{errors.picture.message}</p>}
        </label>

        <label htmlFor="country">
          Country
          <input {...register('country')} list="country-list" id="country" />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && <p className="error">{errors.country.message}</p>}
        </label>

        <label htmlFor="terms">
          Accept Terms & Conditions
          <input {...register('terms')} type="checkbox" id="terms" />
          {errors.terms && <p className="error">{errors.terms.message}</p>}
        </label>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
      <div className="links-wrapper">
        <div className="form-link">
          <Link to="/">Back to main</Link>
        </div>
      </div>
    </>
  );
}
