import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../common/apiClient';
import Button from '../components/Button';
import { LocaleContext } from '../contexts/LocaleContext';

export default function NewNotePage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { trans } = useContext(LocaleContext);

    /**
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    function handleSubmit(event) {
        event.preventDefault();

        apiClient.addNote({ title, body: content }).then(() => {
            navigate('/');
        });
    }

    function handleResetButton() {
        setTitle('');
        setContent('');
    }

    return (
        <main className="new-note">
            <h2 className="new-note__title">
                <span className="new-note__mark">#</span>
                {trans('addNote')}
            </h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="title" className="form__group">
                    <div className="form__label">{trans('title')}</div>
                    <input
                        name="title"
                        id="title"
                        type="text"
                        className="form__input"
                        value={title}
                        onChange={(event) => setTitle(event.currentTarget.value)}
                        required
                    />
                </label>
                <label htmlFor="content" className="form__group">
                    <div className="form__label">{trans('content')}</div>
                    <textarea
                        name="content"
                        id="content"
                        className="form__input"
                        rows="4"
                        value={content}
                        onChange={(event) => setContent(event.currentTarget.value)}
                        required
                    />
                </label>
                <div className="form__buttons">
                    <Button type="reset" variant="secondary" onClick={handleResetButton}>
                        {trans('reset')}
                    </Button>
                    <Button type="submit" variant="accent">
                        {trans('add')}
                    </Button>
                </div>
            </form>
        </main>
    );
}
