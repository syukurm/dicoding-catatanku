import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { showFormattedDate } from '../common';
import apiClient from '../common/apiClient';
import ArchiveButton from '../components/ArchiveButton';
import Spinner from '../components/Spinner';
import TrashButton from '../components/TrashButton';
import { LocaleContext } from '../contexts/LocaleContext';
import { useNote } from '../hooks/useNote';
import ErrorPage from './ErrorPage';

export default function NotePage() {
    const { locale, trans } = useContext(LocaleContext);
    const navigate = useNavigate();
    const parameter = useParams();
    const { note, isLoading, archiveNote, unArchiveNote } = useNote(parameter.id);

    if (isLoading) {
        return <Spinner full />;
    }

    if (!note) {
        return <ErrorPage code="404" message={trans('noteNotFound')} />;
    }

    function handleArchiveButtonClick() {
        if (note.archived) {
            unArchiveNote();
        } else {
            archiveNote();
        }
    }

    function handleDeleteButtonClick() {
        apiClient.deleteNote(parameter.id).then(() => {
            if (note.archived) {
                navigate('/archived');
            } else {
                navigate('/');
            }
        });
    }

    return (
        <main className="note">
            <header className="note__header">
                <div>
                    <h2 className="note__title">
                        <span className="note__mark">#</span>
                        {note.title}
                    </h2>
                    <time dateTime={note.createdAt} className="note__date">
                        {showFormattedDate(note.createdAt, locale === 'en' ? 'en-US' : 'id-ID')}
                    </time>
                </div>
                <div className="note__actions">
                    <ArchiveButton isArchived={note.archived} onClick={handleArchiveButtonClick} />
                    <TrashButton onClick={handleDeleteButtonClick} />
                </div>
            </header>
            <p className="note__content">{note.body}</p>
        </main>
    );
}
