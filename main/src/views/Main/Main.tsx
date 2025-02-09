import { Link, Outlet } from 'react-router';
import CardList from '../../components/CardList/CardList';
import './Main.css';
import { Pokemon } from '../../types/types';

type MainProps = {
  pokemons: Pokemon[];
  isFetching: boolean;
};

function Main({ pokemons, isFetching }: MainProps) {
  return (
    <Link to="/">
      <main className="main-container">
        <div className="content-wrapper">
          <CardList pokemons={pokemons} isFetching={isFetching} />
          <Outlet />
        </div>
      </main>
    </Link>
  );
}

export default Main;
