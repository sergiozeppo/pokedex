import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="error-container">
      <img
        className="broken-pokeball"
        src="/assets/img/broken-pokeball.png"
        alt=""
      />

      <h2>Not Found.</h2>

      <Link to="/">
        <button className="reset-button">Return</button>
      </Link>
    </div>
  );
}
