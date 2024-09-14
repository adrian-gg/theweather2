import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import InputField from './InputField';

describe('InputField [Component]', () => {
  test('should render label text correctly', () => {
    render(
      <InputField type="text" id="name">
        Username
      </InputField>
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  test('should render the correct input type', () => {
    render(
      <InputField type="text" id="name">
        Username
      </InputField>
    );
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('should render required input by default', () => {
    render(
      <InputField type="text" id="name">
        Username
      </InputField>
    );
    const input = screen.getByLabelText('Username');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  test('should not be required if the required prop is false', () => {
    render(
      <InputField type="text" id="name" required={false}>
        Username
      </InputField>
    );
    const input = screen.getByLabelText('Username');
    expect(input).not.toBeRequired();
    expect(input).toHaveAttribute('aria-required', 'false');
  });

  test('should set the value correctly', () => {
    render(
      <InputField type="text" id="name" value="JohnDoe">
        Username
      </InputField>
    );
    const input = screen.getByLabelText('Username');
    expect(input).toHaveValue('JohnDoe');
  });

  test('should set the checked state correctly for checkbox', () => {
    render(
      <InputField type="checkbox" id="acceptTerms" checked>
        Accept Terms
      </InputField>
    );
    const input = screen.getByLabelText('Accept Terms');
    expect(input).toBeChecked();
  });

  test('should call onChange handler when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <InputField type="text" id="name" onChange={handleChange}>
        Username
      </InputField>
    );
    const input = screen.getByLabelText('Username');
    fireEvent.change(input, { target: { value: 'JaneDoe' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('should display error message when error prop is present', () => {
    render(
      <InputField type="text" id="name" error="Username is required">
        Username
      </InputField>
    );
    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  test('should set aria-invalid to true when there is an error', () => {
    render(
      <InputField type="text" id="name" error="Invalid username">
        Username
      </InputField>
    );
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('should set aria-invalid to false when there is no error', () => {
    render(
      <InputField type="text" id="name">
        Username
      </InputField>
    );
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });
});
