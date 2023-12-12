import 'modern-normalize';
import './scss/main.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import AuthProvider from './providers/AuthProvider';
import ColorSchemeProvider from './providers/ColorSchemeProvider';
import LocaleProvider from './providers/LocaleProvider';

const root = createRoot(document.querySelector('#root'));

root.render(
    <StrictMode>
        <BrowserRouter>
            <LocaleProvider>
                <ColorSchemeProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </ColorSchemeProvider>
            </LocaleProvider>
        </BrowserRouter>
    </StrictMode>
);
