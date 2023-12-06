import { useLocation } from 'react-router-dom';
import LinkButton from './LinkButton';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <LinkButton variant={location.pathname === '/' ? 'primary' : 'secondary'} to="/">
                        Catatan Aktif
                    </LinkButton>
                </li>
                <li className="navbar__item">
                    <LinkButton variant={location.pathname === '/archived' ? 'primary' : 'secondary'} to="/archived">
                        Arsip
                    </LinkButton>
                </li>
                <li className="navbar__item">
                    <LinkButton variant={location.pathname === '/notes/new' ? 'primary' : 'accent'} to="/notes/new">
                        + Tambah
                    </LinkButton>
                </li>
            </ul>
        </nav>
    );
}
