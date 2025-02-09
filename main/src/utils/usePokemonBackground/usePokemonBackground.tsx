import { useMemo } from 'react';
import {
  PokemonColorPair,
  PokemonType,
  TYPE_COLOR_MAP,
} from '../../types/types';

export interface PokemonTypeObject {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export function usePokemonBackground(
  types: PokemonTypeObject[]
): PokemonColorPair[] {
  return useMemo(() => {
    return types.map((typeObj) => {
      const typeName = typeObj?.type?.name.toLowerCase();
      return (
        TYPE_COLOR_MAP[typeName as PokemonType] || {
          primary: '#ccc',
          secondary: '#eee',
        }
      );
    });
  }, [types]);
}
