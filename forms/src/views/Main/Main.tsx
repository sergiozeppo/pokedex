import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { RootState } from '../../store/store';
import Card from '../../components/Card/Card';

export default function Main() {
  const formSubmits = useSelector((state: RootState) => state.formData);

  return (
    <div>
      <div className="header">
        <h1>React Forms</h1>
        <div className="links-wrapper">
          <Link to="/uncontrolled" className="form-link">
            Uncontrolled
          </Link>
          <Link to="/controlled" className="form-link">
            React Hook Form
          </Link>
        </div>
      </div>

      <main>
        {formSubmits.length === 0 ? (
          <p className="no-form-message">No forms submitted yet</p>
        ) : (
          <div className="results-container">
            {formSubmits.map((formSubmit, index) => (
              <Card
                key={index}
                className={`result-card ${index === 0 ? 'new' : ''}`}
                name={formSubmit.name}
                age={formSubmit.age}
                email={formSubmit.email}
                password={formSubmit.password}
                gender={formSubmit.gender}
                country={formSubmit.country}
                terms={formSubmit.terms}
                picture={formSubmit.picture}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
