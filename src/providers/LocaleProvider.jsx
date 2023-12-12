import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

import { LOCALE_KEY } from '../common/constants';
import { lang } from '../common/lang';
import { LocaleContext } from '../contexts/LocaleContext';

export default function LocaleProvider({ children }) {
    const [locale, setLocale] = useState(() => {
        const localLocale = window.localStorage.getItem(LOCALE_KEY);
        if (localLocale) return localLocale;

        let preferredLocale = navigator.language.split('-').at(0);
        if (preferredLocale == null || !['id', 'en'].includes(preferredLocale)) {
            preferredLocale = 'en';
        }
        window.localStorage.setItem(LOCALE_KEY, preferredLocale);
        return preferredLocale;
    });

    const toggleLocale = useCallback(() => {
        window.localStorage.setItem(LOCALE_KEY, locale === 'en' ? 'id' : 'en');
        setLocale(locale === 'en' ? 'id' : 'en');
    }, [locale]);

    const trans = useCallback(
        (key) => {
            const translation = lang[locale][key];
            return translation ?? key;
        },
        [locale]
    );

    const contextValue = useMemo(() => {
        return {
            locale,
            toggleLocale,
            trans,
        };
    }, [locale, toggleLocale, trans]);

    return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
}

LocaleProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
