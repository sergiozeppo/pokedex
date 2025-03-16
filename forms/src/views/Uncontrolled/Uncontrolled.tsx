import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { validationSchema } from '../../constants/validation-schema';
import { pictureToBase64 } from '../../utils/pictureToBase64';
import { saveForm } from '../../store/reducers/formsSlice';
import { useState } from 'react';
import {
  checkPassStrength,
  getStrengthColor,
} from '../../utils/checkPassStrength';

export default function Uncontrolled() {
  const countries = useSelector((state: RootState) => state.countries);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const handlePasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(checkPassStrength(newPassword));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formEntries: Record<string, unknown> = Object.fromEntries(
      formData.entries()
    );

    formEntries.age = Number(formEntries.age) || 0;
    formEntries.terms = formData.get('terms') === 'on';
    formEntries.picture = formData.get('picture') || null;
    const fileInput = formData.get('picture');
    formEntries.picture =
      fileInput instanceof File && fileInput.size > 0 ? fileInput : null;

    try {
      const result = validationSchema.parse(formEntries);

      if (result.picture instanceof File) {
        pictureToBase64(result.picture)
          .then((base64) => {
            const submitData = { ...result, picture: base64 };
            dispatch(saveForm(submitData));
            console.log(submitData);
            navigator('/', { state: true });
          })
          .catch((error) => console.error('Error processing image:', error));
      } else {
        console.error('Invalid file input');
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <>
      <h2>Uncontrolled form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name <input type="text" name="name" id="name" />
        </label>

        <label htmlFor="age">
          Age <input type="text" name="age" id="age" />
        </label>

        <label htmlFor="email">
          Email <input type="email" name="email" id="email" />
        </label>

        <label htmlFor="password">
          Password{' '}
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlePasswordStrength}
          />
        </label>

        <div className="strength-meter">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`bar ${index < strength ? getStrengthColor(strength) : ''}`}
            ></div>
          ))}
        </div>

        <label htmlFor="confirmPassword">
          Confirm Password
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </label>

        <div className="gender">
          <div className="gender-wrapper">
            <label htmlFor="male">
              Male
              <input
                className="gender-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
              />
            </label>
            <label htmlFor="female">
              Female
              <input
                className="gender-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
              />
            </label>
            <label htmlFor="other">
              Other
              <input
                className="gender-input"
                type="radio"
                name="gender"
                id="other"
                value="other"
              />
            </label>
          </div>
        </div>

        <label className="picture-label" htmlFor="picture">
          Choose a picture
          <input type="file" name="picture" id="picture" />
        </label>

        <label htmlFor="country">
          Country
          <input list="country-list" name="country" id="country" />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </label>

        <label htmlFor="terms">
          Accept Terms & Conditions
          <input type="checkbox" name="terms" id="terms" />
        </label>

        <button type="submit">Submit</button>
      </form>
      <div className="links-wrapper">
        <div className="form-link">
          <Link to="/ ">Back to main</Link>
        </div>
      </div>
    </>
  );
}
