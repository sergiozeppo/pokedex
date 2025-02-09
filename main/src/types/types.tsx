import { PokemonTypeObject } from '../utils/usePokemonBackground/usePokemonBackground';

export type ButtonProps = {
  className: string;
  title: string;
  children?: React.ReactNode;
  onClick: () => void;
};

export type SearchBarProps = {
  className?: string;
  type?: string;
  placeholder?: string;
  onSearch: (searchQuery: string) => void;
  searchQuery: string;
  onInputChange: (searchQuery: string) => void;
};

export type Pokemon = {
  name: string;
  url?: string;
};

export interface PokemonData {
  stats: BaseStat[];
  moves: Move[];
  height: number;
  weight: number;
  id: number;
  name: string;
  abilities: Ability[];
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonTypeObject[];
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Move {
  move: {
    name: string;
  };
}

export interface BaseStat {
  base_stat: number;
}

export enum PokemonType {
  GRASS = 'grass',
  FIRE = 'fire',
  WATER = 'water',
  PSYCHIC = 'psychic',
  POISON = 'poison',
  BUG = 'bug',
  FLYING = 'flying',
  ELECTRIC = 'electric',
  GHOST = 'ghost',
  NORMAL = 'normal',
  STEEL = 'steel',
  ROCK = 'rock',
  DARK = 'dark',
  DRAGON = 'dragon',
  FAIRY = 'fairy',
  FIGHTING = 'fighting',
  GROUND = 'ground',
  ICE = 'ice',
}

export interface PokemonColorPair {
  primary: string;
  secondary: string;
}

export const TYPE_COLOR_MAP: Record<PokemonType, PokemonColorPair> = {
  [PokemonType.GRASS]: { primary: '#74CB48', secondary: '#e3f5da' },
  [PokemonType.FIRE]: { primary: '#F57D31', secondary: '#fde5d6' },
  [PokemonType.WATER]: { primary: '#6493EB', secondary: '#e0e9fb' },
  [PokemonType.PSYCHIC]: { primary: '#FB5584', secondary: '#fedde6' },
  [PokemonType.POISON]: { primary: '#A43E9E', secondary: '#E4C5E2' },
  [PokemonType.BUG]: { primary: '#A7B723', secondary: '#edf1d3' },
  [PokemonType.FLYING]: { primary: '#A891EC', secondary: '#EEE9FB' },
  [PokemonType.ELECTRIC]: { primary: '#F9CF30', secondary: '#fef5d6' },
  [PokemonType.GHOST]: { primary: '#70559B', secondary: '#e2ddeb' },
  [PokemonType.NORMAL]: { primary: '#AAA67F', secondary: '#eeede5' },
  [PokemonType.STEEL]: { primary: '#B7B9D0', secondary: '#f1f1f6' },
  [PokemonType.ROCK]: { primary: '#B69E31', secondary: '#F0ECD6' },
  [PokemonType.DARK]: { primary: '#75574C', secondary: '#D6CDC9' },
  [PokemonType.DRAGON]: { primary: '#7037FF', secondary: '#D4C3FF' },
  [PokemonType.FAIRY]: { primary: '#E69EAC', secondary: '#FAECEE' },
  [PokemonType.FIGHTING]: { primary: '#C12239', secondary: '#ECBDC4' },
  [PokemonType.GROUND]: { primary: '#DEC16B', secondary: '#F8F3E1' },
  [PokemonType.ICE]: { primary: '#9AD6DF', secondary: '#EBF7F9' },
};
