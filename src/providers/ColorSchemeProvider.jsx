import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

import { COLOR_SCHEME_KEY } from '../common/constants';
import { ColorSchemeContext } from '../contexts/ColorSchemeContext';

export default function ColorSchemeProvider({ children }) {
    const [colorScheme, setColorScheme] = useState(() => {
        const localColorScheme = window.localStorage.getItem(COLOR_SCHEME_KEY);
        if (localColorScheme) {
            window.document.documentElement.dataset['theme'] = localColorScheme;
            return localColorScheme;
        }

        const preferredColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        window.localStorage.setItem(COLOR_SCHEME_KEY, preferredColorScheme);
        window.document.documentElement.dataset['theme'] = preferredColorScheme;
        return preferredColorScheme;
    });

    const toggleColorScheme = useCallback(() => {
        window.localStorage.setItem(COLOR_SCHEME_KEY, colorScheme === 'dark' ? 'light' : 'dark');
        window.document.documentElement.dataset['theme'] = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    }, [colorScheme]);

    const contextValue = useMemo(() => {
        return {
            colorScheme,
            toggleColorScheme,
        };
    }, [colorScheme, toggleColorScheme]);

    return <ColorSchemeContext.Provider value={contextValue}>{children}</ColorSchemeContext.Provider>;
}

ColorSchemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
