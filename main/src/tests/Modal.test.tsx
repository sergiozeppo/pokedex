import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';
import Modal from '../components/Modal/Modal';
import { RootState, setupStore } from '../store';
import { clearSelectedPokemons } from '../store/reducers/selectedPokemonsSlice';

const pokemon1 = {
  id: 1,
  name: 'pikachu',
  abilities: ['static'],
  imageUrl: 'pikachu.png',
};

const pokemon2 = {
  id: 2,
  name: 'bulbasaur',
  abilities: ['overgrow'],
  imageUrl: 'bulbasaur.png',
};

const pokemon3 = {
  id: 3,
  name: 'charmander',
  abilities: ['blaze'],
  imageUrl: 'charmander.png',
};

const pokemon4 = {
  id: 4,
  name: 'squirtle',
  abilities: ['torrent'],
  imageUrl: 'squirtle.png',
};

const renderWithStore = (preloadedState?: Partial<RootState>) => {
  const store = setupStore(preloadedState);
  return {
    store,
    ...render(
      <Provider store={store}>
        <Modal />
      </Provider>
    ),
  };
};

describe('Modal Component', () => {
  test('renders null when no pokemons are selected', () => {
    const { container } = renderWithStore({ selectedPokemonsSlice: [] });
    expect(container.firstChild).toBeNull();
  });

  test('renders modal with one pokemon selected', () => {
    renderWithStore({ selectedPokemonsSlice: [pokemon1] });
    expect(screen.getByText(/1 pokémon/i)).toBeInTheDocument();
    expect(screen.getByText(/Here he is:/i)).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  test('renders modal with 2 or 3 pokemons selected in reverse order with "Here they are:"', () => {
    renderWithStore({ selectedPokemonsSlice: [pokemon1, pokemon2] });
    expect(screen.getByText(/2 pokémons/i)).toBeInTheDocument();
    expect(screen.getByText(/Here they are:/i)).toBeInTheDocument();
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings[0].textContent).toBe('bulbasaur');
    expect(headings[1].textContent).toBe('pikachu');
  });

  test('renders modal with more than 3 pokemons, showing last three in reverse order with "Here are the last three:"', () => {
    renderWithStore({
      selectedPokemonsSlice: [pokemon1, pokemon2, pokemon3, pokemon4],
    });
    expect(screen.getByText(/4 pokémons/i)).toBeInTheDocument();
    expect(screen.getByText(/Here are the last three:/i)).toBeInTheDocument();
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(3);
    expect(headings[0].textContent).toBe('squirtle');
    expect(headings[1].textContent).toBe('charmander');
    expect(headings[2].textContent).toBe('bulbasaur');
  });

  test('dispatches clearSelectedPokemons when "Unselect all" button is clicked', () => {
    const store = setupStore({ selectedPokemonsSlice: [pokemon1] });
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <Modal />
      </Provider>
    );
    const unselectButton = screen.getByRole('button', {
      name: /Unselect all/i,
    });
    fireEvent.click(unselectButton);
    expect(dispatchSpy).toHaveBeenCalledWith(clearSelectedPokemons());
  });

  test('triggers CSV download on clicking "Download" button', () => {
    Object.defineProperty(window, 'URL', {
      writable: true,
      value: {
        createObjectURL: vi.fn(() => 'blob:dummy'),
        revokeObjectURL: vi.fn(),
      },
    });

    renderWithStore({ selectedPokemonsSlice: [pokemon1] });
    const downloadButton = screen.getByRole('button', { name: /Download/i });
    fireEvent.click(downloadButton);

    expect(window.URL.createObjectURL).toHaveBeenCalled();
    const downloadLink = screen.getByRole('link', { hidden: true });
    expect(downloadLink).toHaveAttribute('download', '1_pokemons.csv');
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:dummy');
  });
});
