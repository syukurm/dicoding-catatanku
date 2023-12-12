import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import apiClient from '../common/apiClient';
import Button from '../components/Button';
import { LocaleContext } from '../contexts/LocaleContext';

export default function SignUpPage() {
    const navigate = useNavigate();
    const { trans } = useContext(LocaleContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            setError('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, confirmPassword]);

    function handleResetButton() {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    /**
     * @param {React.FormEvent<HTMLFormElement>} event
     */
    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError(trans('confirmPasswordError'));
            return;
        }

        try {
            await apiClient.register({ name, email, password });
            navigate('/login');
        } catch (responseError) {
            setError(responseError.json.message);
        }
    }

    return (
        <main className="sign-up">
            <h2 className="sign-up__title">
                <span className="sign-up__mark">#</span>
                {trans('signUp')}
            </h2>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor="name" className="form__group">
                    <div className="form__label">{trans('name')}</div>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        className="form__input"
                        value={name}
                        onChange={(event) => setName(event.currentTarget.value)}
                        required
                    />
                </label>
                <label htmlFor="email" className="form__group">
                    <div className="form__label">{trans('email')}</div>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        className="form__input"
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                        required
                    />
                </label>
                <label htmlFor="password" className="form__group">
                    <div className="form__label">{trans('password')}</div>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        className="form__input"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        minLength={6}
                        required
                    />
                </label>
                <label htmlFor="confirm-password" className="form__group">
                    <div className="form__label">{trans('confirmPassword')}</div>
                    <input
                        name="confirm-password"
                        id="confirm-password"
                        type="password"
                        className="form__input"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                        minLength={6}
                        required
                    />
                </label>
                {error != null && <div className="form__error">{error}</div>}
                <div className="form__buttons">
                    <Button type="reset" variant="secondary" onClick={handleResetButton}>
                        {trans('reset')}
                    </Button>
                    <Button type="submit" variant="accent">
                        {trans('signUp')}
                    </Button>
                </div>
                <div>
                    <span className="sign-up__prompt">{trans('alreadyHaveAccount')}</span>
                    <Link to="/login">{trans('login')}</Link>
                </div>
            </form>
        </main>
    );
}
