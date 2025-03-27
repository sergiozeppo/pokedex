import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button/Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button className="test" onClick={vi.fn()} title="Click" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('test');
  });

  test('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button className="" onClick={handleClick} title="Test" />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
