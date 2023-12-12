import { Outlet } from 'react-router-dom';

import NavMenu from '../components/NavMenu';
import SearchBox from '../components/SearchBox';

export default function AuthenticatedLayout() {
    return (
        <>
            <div className="nav-search">
                <NavMenu />
                <SearchBox />
            </div>
            <Outlet />
        </>
    );
}
