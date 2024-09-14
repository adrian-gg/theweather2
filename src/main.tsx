import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import LanguageProvider from './context/LanguageContext';
import SettingsProvider from './context/SettingsContext';
import './sass/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </LanguageProvider>
  </StrictMode>
);
