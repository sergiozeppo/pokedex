import { Outlet } from 'react-router-dom';
import CardList from '../../components/CardList/CardList';
import './Main.css';
import Modal from '../../components/Modal/Modal';

function Main() {
  return (
    <main className="main-container">
      <div className="content-wrapper">
        <CardList />
        <Outlet />
        <Modal />
      </div>
    </main>
  );
}

export default Main;
