import { Routes, Route } from 'react-router';
import Controlled from './components/Controlled/Controlled';
import Main from './components/Main/Main';
import Uncontrolled from './components/Uncontrolled/Uncontrolled';
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
