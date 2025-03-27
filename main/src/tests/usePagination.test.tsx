import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { usePagination } from '../utils/usePagination/usePagination';

const mockData = Array(25)
  .fill(null)
  .map((_, i) => ({
    name: `pokemon-${i}`,
    url: `https://pokeapi.co/pokemon/${i}/`,
  }));

describe('usePagination Hook', () => {
  test('calculates correct total pages', () => {
    const { result } = renderHook(() => usePagination(mockData));
    expect(result.current.totalPages).toBe(3);
  });

  test('returns correct current data', () => {
    const { result } = renderHook(() => usePagination(mockData));
    expect(result.current.currentData.length).toBe(10);

    act(() => result.current.setPage(2));
    expect(result.current.currentData.length).toBe(10);
  });

  test('handles page navigation', () => {
    const { result } = renderHook(() => usePagination(mockData));

    act(() => result.current.nextPage());
    expect(result.current.page).toBe(2);

    act(() => result.current.prevPage());
    expect(result.current.page).toBe(1);
  });

  test('resets page when data changes', () => {
    const { result, rerender } = renderHook(({ data }) => usePagination(data), {
      initialProps: { data: mockData },
    });

    act(() => result.current.setPage(3));
    rerender({ data: mockData.slice(0, 5) });
    expect(result.current.page).toBe(1);
  });
});
