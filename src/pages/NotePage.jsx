import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/localData';
import { useState } from 'react';
import { showFormattedDate } from '../utils';
import ArchiveButton from '../components/ArchiveButton';
import TrashButton from '../components/TrashButton';

export default function NotePage() {
    const parameter = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(getNote(parameter.id));

    if (!note) {
        return NotFoundPage();
    }

    /** @param {string} id  */
    function handleArchiveButtonClick(id) {
        if (note.archived) {
            unarchiveNote(id);
        } else {
            archiveNote(id);
        }
        setNote(getNote(id));
    }

    /** @param {string} id  */
    function handleDeleteButtonClick(id) {
        deleteNote(id);
        if (note.archived) {
            navigate('/archived');
        } else {
            navigate('/');
        }
    }

    return (
        <main className="note">
            <header className="note__header">
                <div>
                    <h2 className="note__title">{note.title}</h2>
                    <time dateTime={note.createdAt} className="note__date">
                        {showFormattedDate(note.createdAt)}
                    </time>
                </div>
                <div className="note__actions">
                    <ArchiveButton isArchived={note.archived} onClick={() => handleArchiveButtonClick(note.id)} />
                    <TrashButton onClick={() => handleDeleteButtonClick(note.id)} />
                </div>
            </header>
            <p className="note__content">{note.body}</p>
        </main>
    );
}
