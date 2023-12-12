import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import LinkButton from '../components/LinkButton';
import Spinner from '../components/Spinner';
import ToggleColorSchemeButton from '../components/ToggleColorSchemeButton';
import ToggleLocaleButton from '../components/ToggleLocaleButton';
import { AuthContext } from '../contexts/AuthContext';
import { LocaleContext } from '../contexts/LocaleContext';

export default function BaseLayout() {
    const { user, isLoading } = useContext(AuthContext);
    const { trans } = useContext(LocaleContext);

    return (
        <div className="container">
            <header className="header">
                <div className="header__inner">
                    <ToggleColorSchemeButton />
                    <h1 className="header__title">
                        <Link to="/" className="header__title-link">
                            {trans('appName')}
                        </Link>
                    </h1>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <ToggleLocaleButton />
                    {isLoading && user == null ? (
                        <>
                            <span className="divider" />
                            <Spinner />
                        </>
                    ) : null}
                    {user != null && (
                        <>
                            <span className="divider" />
                            <LinkButton to="/logout" variant="icon" title={trans('logout')} ariaLabel={trans('logout')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="icon"
                                    style={{ transform: 'scaleX(-1)' }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                    />
                                </svg>

                                {user.name}
                            </LinkButton>
                        </>
                    )}
                </div>
            </header>
            <Outlet />
        </div>
    );
}
