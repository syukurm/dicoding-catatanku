import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { addNote } from '../utils/localData';

export default function NewNotePage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    /** @param {import('react').ChangeEvent<HTMLInputElement>} event */
    function handleSubmit(event) {
        event.preventDefault();

        addNote({ title, body: content });
        navigate('/');
    }

    function handleResetButton() {
        setTitle('');
        setContent('');
    }

    return (
        <main className="add-note">
            <h2 className="add-note__title">Tambah Catatan</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="title" className="form__group">
                    <div className="form__label">Judul</div>
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
                    <div className="form__label">Isi Catatan</div>
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
                        Reset
                    </Button>
                    <Button type="submit" variant="accent">
                        Buat
                    </Button>
                </div>
            </form>
        </main>
    );
}
