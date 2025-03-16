import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { RootState } from '../../store/store';

export default function Main() {
  const formSubmits = useSelector((state: RootState) => state.formData);

  return (
    <>
      <main>
        {formSubmits.length === 0 ? (
          <p>No forms submitted yet</p>
        ) : (
          <ul>
            {formSubmits.map((formSubmit, index) => (
              <li key={index}>
                <img src={formSubmit.picture} alt={formSubmit.name} />
                <dl>
                  <div key={formSubmit.name}>
                    <dt>{formSubmit.name}</dt>
                    <dd>{formSubmit.age.toString()}</dd>
                    <dt>{formSubmit.email}</dt>
                    <dd>{formSubmit.country}</dd>
                    <dt>{formSubmit.gender}</dt>
                    <dd>{formSubmit.password}</dd>
                    <dd>{formSubmit.confirmPassword}</dd>
                    <dd>{formSubmit.picture}</dd>
                    <dd>{formSubmit.terms}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </main>
      <div className="links-wrapper">
        <Link to="/uncontrolled" className="form-link">
          Uncontrolled
        </Link>
        <Link to="/controlled" className="form-link">
          React Hook Form
        </Link>
      </div>
    </>
  );
}
