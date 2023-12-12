import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { LocaleContext } from '../contexts/LocaleContext';

export default function LogoutPage() {
    const navigate = useNavigate();
    const { trans } = useContext(LocaleContext);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
        navigate('/login');
    }, [logout, navigate]);

    return <main>{trans('logout')}</main>;
}
