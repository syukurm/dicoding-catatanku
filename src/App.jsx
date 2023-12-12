import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import { LocaleContext } from './contexts/LocaleContext';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import BaseLayout from './layouts/BaseLayout';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NewNotePage from './pages/NewNotePage';
import NotePage from './pages/NotePage';
import NotesPage from './pages/NotesPage';
import SignUpPage from './pages/SignUpPage';

export default function App() {
    const { trans } = useContext(LocaleContext);
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route element={<BaseLayout />}>
                {user ? (
                    <Route element={<AuthenticatedLayout />}>
                        <Route index element={<NotesPage />} />
                        <Route path="/archived" element={<NotesPage archived />} />
                        <Route path="/notes/new" element={<NewNotePage />} />
                        <Route path="/notes/:id" element={<NotePage />} />

                        <Route path="/login" element={<Navigate to="/" replace />} />
                        <Route path="/register" element={<Navigate to="/" replace />} />
                        <Route path="/logout" element={<LogoutPage />} />
                        <Route path="*" element={<ErrorPage code="404" message={trans('pageNotFound')} />} />
                    </Route>
                ) : (
                    <>
                        <Route path="/register" element={<SignUpPage />} />
                        <Route path="*" element={<LoginPage />} />
                    </>
                )}
            </Route>
        </Routes>
    );
}
