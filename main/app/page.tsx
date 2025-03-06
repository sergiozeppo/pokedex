import { fetchData } from '../src/services/server';
import { Pokemon } from '../src/types/types';
import ClientApp from './clientApp';

export const metadata = {
  title: 'Pokémon List',
  description: 'List of all Pokémon',
};

export default async function AppPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const data: Pokemon[] = await fetchData();
  const page = Number(searchParams.page) || 1;
  const query = (searchParams.q as string) || '';

  return (
    <ClientApp serverData={data} initialPage={page} initialQuery={query} />
  );
}
