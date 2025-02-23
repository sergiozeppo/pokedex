import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import PaginationControls, {
  PaginationControlsProps,
} from '../components/PaginationControls/PaginationControls';
import { INITIAL_PAGE } from '../constants/constants';

describe('PaginationControls', () => {
  const defaultProps: PaginationControlsProps = {
    page: 1,
    totalPages: 5,
    nextPage: vi.fn(),
    prevPage: vi.fn(),
  };

  test('renders current page and total pages correctly', () => {
    render(<PaginationControls {...defaultProps} />);
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
  });

  test('disables Prev button when current page equals INITIAL_PAGE', () => {
    render(<PaginationControls {...defaultProps} page={INITIAL_PAGE} />);
    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  test('disables Next button when current page equals totalPages', () => {
    render(<PaginationControls {...defaultProps} page={5} totalPages={5} />);
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  test('calls prevPage handler when Prev button is clicked (if enabled)', () => {
    const prevPageMock = vi.fn();
    render(
      <PaginationControls {...defaultProps} page={2} prevPage={prevPageMock} />
    );
    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);
    expect(prevPageMock).toHaveBeenCalled();
  });

  test('calls nextPage handler when Next button is clicked (if enabled)', () => {
    const nextPageMock = vi.fn();
    render(
      <PaginationControls
        {...defaultProps}
        page={2}
        totalPages={5}
        nextPage={nextPageMock}
      />
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    expect(nextPageMock).toHaveBeenCalled();
  });
});
