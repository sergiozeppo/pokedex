import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import useLSSavedSearch from '../utils/useLSSavedSearch/useLSSavedSearch';

describe('useLSSavedSearch Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('initializes with saved search data', async () => {
    const mockFetch = vi.fn().mockResolvedValue(undefined);
    const mockSearch = vi.fn();
    localStorage.setItem('searchPokemon', 'pikachu');

    renderHook(() => useLSSavedSearch(mockFetch, mockSearch));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockSearch).toHaveBeenCalledWith('pikachu');
    });
  });
});
