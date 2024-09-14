import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Anchor from './Anchor';

describe('Anchor [Component]', () => {
  test('should render children correctly', () => {
    render(<Anchor>Test Link</Anchor>);

    const anchor = screen.getByText('Test Link');
    expect(anchor).toBeInTheDocument();
  });

  test('should apply custom className', () => {
    render(<Anchor className="custom-class">Test Link</Anchor>);

    const anchor = screen.getByText('Test Link');
    expect(anchor).toHaveClass('custom-class');
  });

  test('should have the correct href attribute', () => {
    render(<Anchor href="https://example.com">Test Link</Anchor>);

    const anchor = screen.getByText('Test Link');
    expect(anchor).toHaveAttribute('href', 'https://example.com');
  });

  test('should have the correct target and rel attributes', () => {
    render(
      <Anchor
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Test Link
      </Anchor>
    );

    const anchor = screen.getByText('Test Link');
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Anchor onClick={handleClick}>Test Link</Anchor>);

    const anchor = screen.getByText('Test Link');
    fireEvent.click(anchor);
    expect(handleClick).toHaveBeenCalled();
  });
});
