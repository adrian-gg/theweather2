import React, { useContext } from 'react';
import type { LanguageType } from '../../config/translations';
import { LanguageContext } from '../../context/LanguageContext';
import classNames from '../../utils/classNames';
import Button from '../atoms/Button';

/*
 * This component is intended to render few language options.
 */
function LanguageMenu() {
  const { languages, currentLanguage, changeLanguage } =
    useContext(LanguageContext);

  const handleCurrentLanguageChange = (lang: LanguageType) => {
    changeLanguage(lang);
  };

  const renderLanguageButton = (lang: LanguageType) => {
    const text = lang.toUpperCase();

    return (
      <Button
        type="button"
        className={classNames(
          'language-option',
          currentLanguage === lang && 'language-option--selected'
        )}
        onClick={() => handleCurrentLanguageChange(lang)}
      >
        {text}
      </Button>
    );
  };

  return (
    <div className="language-menu">
      {languages.map((lang, index) => (
        <React.Fragment key={lang}>
          {renderLanguageButton(lang)}

          {index < languages.length - 1 && (
            <span className="language-separator" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default LanguageMenu;
