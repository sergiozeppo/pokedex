import { useEffect } from 'react';

export default function useLSSavedSearch(
  handleFetchData: () => Promise<void>,
  handleSearchData: (searchData: string) => Promise<void> | void
) {
  useEffect(() => {
    const savedSearch = localStorage.getItem('searchPokemon');

    const initApp = async () => {
      await handleFetchData();
      if (savedSearch) {
        await handleSearchData(savedSearch);
      }
    };

    initApp();
  }, [handleFetchData, handleSearchData]);
}
