import { Link } from 'react-router';

export default function Main() {
  return (
    <div className="links-wrapper">
      <Link to="/uncontrolled" className="form-link">
        Uncontrolled
      </Link>
      <Link to="/controlled" className="form-link">
        React Hook Form
      </Link>
    </div>
  );
}
