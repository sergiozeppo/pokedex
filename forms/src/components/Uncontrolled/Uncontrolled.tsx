import { Link } from 'react-router';
import { COUNTRIES_LIST } from '../../constants/constants';

export default function Uncontrolled() {
  return (
    <>
      <p>Uncontrolled form</p>
      <form>
        <label htmlFor="name">
          Name <input type="text" name="name" id="name" />
        </label>
        <label htmlFor="age">
          Age <input type="text" name="age" />
        </label>
        <label htmlFor="email">
          Email <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
          Password <input type="password" name="password" id="password" />
        </label>
        <label htmlFor="repeat-password">
          Password
          <input type="password" name="repeat-password" id="repeat-password" />
        </label>
        <label htmlFor="male">
          Male
          <input type="radio" name="gender" id="male" />
        </label>
        <label htmlFor="female">
          Female
          <input type="radio" name="gender" id="female" />
        </label>
        <label htmlFor="countries">
          Choose country
          <select id="countries">
            {COUNTRIES_LIST.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="accept-tc">
          <input type="checkbox" id="accept-tc" />
          Accept T&C
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="back">
        <Link to="/ ">Back to main</Link>
      </div>
    </>
  );
}
