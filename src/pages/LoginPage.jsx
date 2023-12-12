import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import { LocaleContext } from '../contexts/LocaleContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { trans } = useContext(LocaleContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    /**
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await login(email, password);
            navigate('/');
        } catch (loginError) {
            setError(loginError.json.message);
        }
    }

    return (
        <main className="login">
            <h2 className="login__title">
                <span className="login__mark">#</span>
                {trans('login')}
            </h2>
            <form method="post" onSubmit={handleSubmit}>
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
                {error != null && <p className="form__error">{error}</p>}
                <div className="form__buttons">
                    <Button type="submit" variant="accent">
                        {trans('login')}
                    </Button>
                </div>
                <div>
                    <span className="login__prompt">{trans('dontHaveAccount')}</span>
                    <Link to="/register">{trans('signUp')}</Link>
                </div>
            </form>
        </main>
    );
}
