import { useEffect, useRef, useState } from 'react';
import Button from './Button';

const CHARACTERS_LIMIT = 50;

export default function AddNoteFormModal({ open, onOpenChange, onSubmit }) {
    const reference = useRef();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const charactersLeft = CHARACTERS_LIMIT - title.length;

    useEffect(() => {
        if (open) {
            reference.current?.showModal();
        } else {
            reference.current?.close();
        }
    }, [open]);

    function handleSubmit(event) {
        event.preventDefault();

        onSubmit({ title, content });
        onOpenChange(false);
        setTitle('');
        setContent('');
    }

    function handleReset() {
        setTitle('');
        setContent('');
    }

    function handleTitleInputChange(event) {
        if (event.target.value.length > CHARACTERS_LIMIT) {
            return;
        }
        setTitle(event.target.value);
    }

    function handleContentInputChange(event) {
        setContent(event.target.value);
    }

    return (
        <dialog
            className="modal"
            ref={reference}
            onCancel={() => onOpenChange(false)}
        >
            <div className="modal__container">
                <header className="modal__header">
                    <h2 className="modal__title">Buat Catatan</h2>
                    <Button
                        variant="icon"
                        type="button"
                        onClick={() => onOpenChange(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="icon"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Button>
                </header>
                <div className="modal__body">
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="title" className="form__group">
                            <div className="form__label">
                                <span>Judul</span>
                                <span>Sisa Karakter: {charactersLeft}</span>
                            </div>
                            <input
                                name="title"
                                id="title"
                                type="text"
                                className="form__input"
                                value={title}
                                onChange={handleTitleInputChange}
                                required
                            />
                        </label>
                        <label htmlFor="content" className="form__group">
                            <div className="form__label">Isi Catatan</div>
                            <textarea
                                name="content"
                                id="content"
                                className="form__input"
                                rows="5"
                                value={content}
                                onChange={handleContentInputChange}
                                required
                            />
                        </label>
                        <div className="form__buttons">
                            <Button
                                type="reset"
                                variant="secondary"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                            <Button type="submit" variant="accent">
                                Buat
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
