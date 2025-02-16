import { Outlet } from 'react-router';
import CardList from '../../components/CardList/CardList';
import './Main.css';
import { Pokemon } from '../../types/types';
import Modal from '../../components/Modal/Modal';

type MainProps = {
  pokemons: Pokemon[];
  isFetching: boolean;
};

function Main({ pokemons, isFetching }: MainProps) {
  return (
    <main className="main-container">
      <div className="content-wrapper">
        <CardList pokemons={pokemons} isFetching={isFetching} />
        <Outlet />
        <Modal />
      </div>
    </main>
  );
}

export default Main;
