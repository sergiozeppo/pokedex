import { Routes, Route, Navigate } from 'react-router';
import CardDetails from '../../views/CardDetails/CardDetails';
import Main from '../../views/Main/Main';
import NotFound from '../../views/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="pokemon/:name" element={<CardDetails />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
