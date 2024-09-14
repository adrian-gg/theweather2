import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { INPUT_FIELDS } from '../../config/consts';
import Form from './Form';

describe('Form [Component]', () => {
  test('renders the form and input fields correctly', () => {
    render(<Form />);

    INPUT_FIELDS.forEach(({ name }) => {
      const input = screen.getByLabelText(name);
      expect(input).toBeInTheDocument();
    });

    const sendButton = screen.getByText('send');
    expect(sendButton).toBeInTheDocument();
  });

  test('updates input values correctly', async () => {
    render(<Form />);

    const inputText = screen.getByLabelText('name');
    const inputEmail = screen.getByLabelText('email');
    const inputDate = screen.getByLabelText('birthdate');
    const inputTel = screen.getByLabelText('city');

    await userEvent.type(inputText, 'Test Name');
    await userEvent.type(inputEmail, 'test@example.us');
    await userEvent.type(inputDate, '2023-01-05');
    await userEvent.type(inputTel, '123456789');

    await waitFor(() => {
      expect(inputText).toHaveValue('Test Name');
      expect(inputEmail).toHaveValue('test@example.us');
      expect(inputDate).toHaveValue('2023-01-05');
      expect(inputTel).toHaveValue('123456789');
    });
  });

  test('botton submit should be disabled when fields are empty', async () => {
    render(<Form />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
