import { Link } from 'react-router';

export default function Uncontrolled() {
  return (
    <>
      <p>Uncontrolled form</p>
      <div className="back">
        <Link to="/ ">Back to main</Link>
      </div>
    </>
  );
}
