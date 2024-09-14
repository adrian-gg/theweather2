import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import SelectField from './SelectField';

describe('SelectField [Component]', () => {
  const options = [
    { value: '1', option: 'Option1' },
    { value: '2', option: 'Option2' },
    { value: '3', option: 'Option3' },
  ];

  test('should render label text correctly', () => {
    render(
      <SelectField id="test-select" listOptions={options} defaultOption="1">
        Select an option
      </SelectField>
    );
    const label = screen.getByText('Select an option');
    expect(label).toBeInTheDocument();
  });

  test('should render options correctly', () => {
    render(
      <SelectField id="test-select" listOptions={options} defaultOption="1">
        Select an option
      </SelectField>
    );

    options.forEach(({ value, option }) => {
      expect(screen.getByText(option)).toBeInTheDocument();
      expect(screen.getByRole('option', { name: option })).toHaveValue(value);
    });
  });

  test('should set default option correctly', () => {
    render(
      <SelectField id="test-select" listOptions={options} defaultOption="2">
        Select an option
      </SelectField>
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('2');
  });

  test('should call onChange handler with the correct value when an option is selected', () => {
    const handleChange = vi.fn();
    render(
      <SelectField
        id="test-select"
        listOptions={options}
        defaultOption="1"
        onChange={handleChange}
      >
        Select an option
      </SelectField>
    );
    // Why 'combobox'? https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#technical_summary
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  test('should not render anything if listOptions is empty', () => {
    const { container } = render(
      <SelectField id="test-select" listOptions={[]} defaultOption="">
        Select an option
      </SelectField>
    );
    expect(container).toBeEmptyDOMElement();
  });
});
