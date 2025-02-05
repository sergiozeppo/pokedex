import CardList from '../../components/CardList/CardList';
import './Main.css';
import { Pokemon } from '../../types/types';

type MainProps = {
  pokemons: Pokemon[];
};

function Main({ pokemons }: MainProps) {
  return (
    <main>
      <CardList pokemons={pokemons} />
    </main>
  );
}

export default Main;
