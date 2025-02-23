import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../store/reducers/searchQuerySlice';
import { RootState } from '../../store';

export const useSearchQuery = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.searchQuerySlice.value);

  const updateSearchQuery = (newQuery: string) => {
    dispatch(setSearchQuery(newQuery));
  };

  return { updateSearchQuery, query };
};
