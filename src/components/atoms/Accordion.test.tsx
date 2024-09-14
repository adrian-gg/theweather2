import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Accordion from './Accordion';

describe('Accordion [Component]', () => {
  test('renders with default name and label', () => {
    render(
      <Accordion label="Test Label" isOpen={false}>
        <p>Content</p>
      </Accordion>
    );

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();

    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
  });

  test('renders as open if isOpen is true', () => {
    render(
      <Accordion label="Open Accordion" isOpen>
        <p>Visible Content</p>
      </Accordion>
    );

    const details = screen.getByRole('group');
    expect(details).toHaveAttribute('open');
  });

  test('renders as closed if isOpen is false', () => {
    render(
      <Accordion label="Closed Accordion" isOpen={false}>
        <p>Hidden Content</p>
      </Accordion>
    );

    const details = screen.getByRole('group');
    expect(details).not.toHaveAttribute('open');
  });
});
