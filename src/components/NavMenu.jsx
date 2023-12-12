import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { LocaleContext } from '../contexts/LocaleContext';
import LinkButton from './LinkButton';

export default function NavMenu() {
    const location = useLocation();
    const { trans } = useContext(LocaleContext);

    return (
        <nav className="nav-menu">
            <ul className="nav-menu__list">
                <li className="nav-menu__item">
                    <LinkButton
                        to="/notes/new"
                        variant={location.pathname === '/notes/new' ? 'primary' : 'accent'}
                        ariaLabel={trans('addNote')}
                    >
                        +
                    </LinkButton>
                </li>
                <li className="nav-menu__item">
                    <LinkButton to="/" variant={location.pathname === '/' ? 'primary' : 'secondary'}>
                        {trans('activeNotes')}
                    </LinkButton>
                </li>
                <li className="nav-menu__item">
                    <LinkButton to="/archived" variant={location.pathname === '/archived' ? 'primary' : 'secondary'}>
                        {trans('archivedNotes')}
                    </LinkButton>
                </li>
            </ul>
        </nav>
    );
}
