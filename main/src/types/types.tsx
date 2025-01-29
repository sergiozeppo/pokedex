import { ChangeEvent } from 'react';

export type ButtonProps = {
  className: string;
  title: string;
  children?: React.ReactNode;
  onClick: () => void;
};

export type SearchBarProps = {
  className: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type Pokemon = {
  name: string;
  url: string;
};

export interface PokemonData {
  id: number;
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
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
