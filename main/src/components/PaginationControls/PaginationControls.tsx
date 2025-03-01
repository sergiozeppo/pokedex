import { INITIAL_PAGE } from '../../constants/constants';
import './PaginationControls.module.css';

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
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={prevPage}
        disabled={page === INITIAL_PAGE}
      >
        Prev
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={nextPage}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
