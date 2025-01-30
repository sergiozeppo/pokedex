export type ButtonProps = {
  className: string;
  title: string;
  children?: React.ReactNode;
  onClick: () => void;
};

export type SearchBarProps = {
  className: string;
  type: string;
  placeholder: string;
  onSearch: (searchQuery: string) => void;
  searchQuery: string;
  onInputChange: (searchQuery: string) => void;
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

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
