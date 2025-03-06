import { INITIAL_PAGE } from '../../constants/constants';
import styles from './PaginationControls.module.css';

export interface PaginationControlsProps {
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const PaginationControls = ({
  page,
  totalPages,
  nextPage,
  prevPage,
}: PaginationControlsProps) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles['pagination-button']}
        onClick={prevPage}
        disabled={page === INITIAL_PAGE}
      >
        Prev
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button
        className={styles['pagination-button']}
        onClick={nextPage}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
