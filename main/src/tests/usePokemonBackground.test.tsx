import { renderHook } from '@testing-library/react';
import {
  PokemonTypeObject,
  usePokemonBackground,
} from '../utils/usePokemonBackground/usePokemonBackground';
import { describe, expect, test } from 'vitest';
import { TYPE_COLOR_MAP } from '../types/types';

describe('usePokemonBackground Hook', () => {
  test('returns correct colors', () => {
    const { result } = renderHook(() =>
      usePokemonBackground([
        { type: { name: 'fire' } },
        { type: { name: 'unknown' } },
      ] as PokemonTypeObject[])
    );

    expect(result.current).toEqual([
      TYPE_COLOR_MAP.fire,
      { primary: '#ccc', secondary: '#eee' },
    ]);
  });
});
