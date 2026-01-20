import { Routes, Route } from 'react-router';
import Controlled from './views/Controlled/Controlled';
import Main from './views/Main/Main';
import Uncontrolled from './views/Uncontrolled/Uncontrolled';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="uncontrolled" element={<Uncontrolled />} />
        <Route path="controlled" element={<Controlled />} />
      </Routes>
    </>
  );
}

export default App;
