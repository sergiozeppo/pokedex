import { fetchData } from '../src/services/server';
import { Pokemon } from '../src/types/types';
import ClientApp from './clientApp';

export const metadata = {
  title: 'Pokémon List',
  description: 'List of all Pokémon',
};

export default async function AppPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data: Pokemon[] = await fetchData();
  const page = Number(searchParams.page) || 1;

  return <ClientApp serverData={data} initialPage={page} />;
}
