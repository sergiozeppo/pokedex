import { Route } from './+types/home';
import ClientApp from './ClientApp';
import { fetchData } from './services/server';
import { Pokemon } from './types/types';

export async function loader({ request }: Route.LoaderArgs) {
  {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const page = Number(searchParams.get('page')) || 1;
    const query = searchParams.get('q') || '';
    const data: Pokemon[] = await fetchData();
    return {
      data,
      page,
      query,
    };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data, page, query } = loaderData;

  return (
    <ClientApp
      serverData={data}
      initialPage={page}
      initialQuery={query || ''}
    />
  );
}
