import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../components/ErrorBoundary/ErrorBoundary.css';
import '../../App.css';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== '/404') {
      navigate('/404', { replace: true });
    }
  }, [navigate]);

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
