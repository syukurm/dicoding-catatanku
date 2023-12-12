import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';

import apiClient from '../common/apiClient';
import { ACCESS_TOKEN_KEY } from '../common/constants';
import { AuthContext } from '../contexts/AuthContext';

export default function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        apiClient
            .getLoggedInUser()
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });

        return () => {
            setLoading(true);
        };
    }, []);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        const response = await apiClient.login(email, password);

        if (response.status === 'success') {
            window.localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
            const loggedInUser = await apiClient.getLoggedInUser();
            setUser(loggedInUser.data);
            setLoading(false);
            return null;
        }

        setLoading(false);
        return response.message;
    }, []);

    const logout = useCallback(() => {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        setUser(null);
    }, []);

    const contextValue = useMemo(() => {
        return {
            user,
            isLoading: loading,
            login,
            logout,
        };
    }, [user, loading, login, logout]);

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
