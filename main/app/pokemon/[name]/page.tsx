import { notFound } from 'next/navigation';
import { fetchPokemonOutletDetails } from '../../../src/services/server';

import PokemonLayout from './PokemonLayout';
import ClientCardDetails from './ClientCardDetails';

export async function generateMetadata(
  props: {
    params: Promise<{ name: string }>;
  }
) {
  const params = await props.params;
  try {
    const data = await fetchPokemonOutletDetails(params.name);
    return {
      title: `${data.name} Details`,
      description: `Detailed information about ${data.name}`,
    };
  } catch {
    return {
      title: 'Pokémon Not Found',
      description: 'Requested Pokémon does not exist',
    };
  }
}

export default async function PokemonDetailsPage(
  props: {
    params: Promise<{ name: string }>;
  }
) {
  const params = await props.params;
  try {
    const { name } = params;
    const data = await fetchPokemonOutletDetails(name);

    return (
      <PokemonLayout>
        <ClientCardDetails pokemonData={data} />
      </PokemonLayout>
    );
  } catch {
    notFound();
  }
}
