import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { LanguageType } from '../../config/translations';
import { LanguageContext } from '../../context/LanguageContext';
import LanguageMenu from './LanguageMenu';

const mockChangeLanguage = vi.fn();
const mockLanguages = ['en', 'es'];
const mockCurrentLanguage = 'en';

const renderLanguageMenuWithLanguageContext = () => {
  return render(
    <LanguageContext.Provider
      value={{
        languages: mockLanguages as LanguageType[],
        currentLanguage: mockCurrentLanguage,
        changeLanguage: mockChangeLanguage,
        getTranslation: (key: string) => key,
      }}
    >
      <LanguageMenu />
    </LanguageContext.Provider>
  );
};

describe('LanguageMenu [Component]', () => {
  test('should render all language buttons', () => {
    renderLanguageMenuWithLanguageContext();

    mockLanguages.forEach((lang) => {
      expect(screen.getByText(lang.toUpperCase())).toBeInTheDocument();
    });
  });

  test('should apply selected class to the current language', () => {
    renderLanguageMenuWithLanguageContext();

    const selectedButton = screen.getByText(mockCurrentLanguage.toUpperCase());
    expect(selectedButton).toHaveClass('language-option--selected');
  });

  test('should call changeLanguage with the correct language when a button is clicked', () => {
    renderLanguageMenuWithLanguageContext();

    const newLanguage = 'es';
    const button = screen.getByText(newLanguage.toUpperCase());
    fireEvent.click(button);

    expect(mockChangeLanguage).toHaveBeenCalledWith(newLanguage);
  });

  test('should render separators between buttons except after the last one', () => {
    const { container } = renderLanguageMenuWithLanguageContext();

    const separators = container.querySelectorAll('.language-separator');
    expect(separators).toHaveLength(mockLanguages.length - 1);
  });
});
