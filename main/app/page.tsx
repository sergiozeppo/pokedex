import { fetchData } from '../src/services/server';
import { Pokemon } from '../src/types/types';
import ClientApp from './clientApp';

export const metadata = {
  title: 'Pokémon List',
  description: 'List of all Pokémon',
};

export default async function AppPage() {
  const data: Pokemon[] = await fetchData();
  return <ClientApp serverData={data} />;
}
