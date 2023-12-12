import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import NoteItem from '../components/NoteItem';
import Spinner from '../components/Spinner';
import { LocaleContext } from '../contexts/LocaleContext';
import { useNotes } from '../hooks/useNotes';

/**
 * @param {object} props
 * @param {boolean} props.archived
 */
export default function NotesPage({ archived }) {
    const { notes, isLoading, archiveNote, unArchiveNote, deleteNote } = useNotes({ archived });
    const [searchParameters] = useSearchParams();
    const keyWord = searchParameters.get('keyword');
    const { trans } = useContext(LocaleContext);

    const filteredNotes = useMemo(() => {
        if (notes) {
            return notes.filter((note) => {
                if (keyWord) {
                    return note.title.toLowerCase().includes(keyWord.toLowerCase());
                }
                return true;
            });
        }
        return [];
    }, [notes, keyWord]);

    if (isLoading) {
        return <Spinner full />;
    }

    return (
        <main className="notes-list">
            {filteredNotes.length === 0 && <div className="notes-list__empty">{trans('emptyNotes')}</div>}
            {filteredNotes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onArchiveButtonClick={() => (note.archived ? unArchiveNote(note.id) : archiveNote(note.id))}
                    onDeleteButtonClick={() => deleteNote(note.id)}
                />
            ))}
        </main>
    );
}

NotesPage.propTypes = {
    archived: PropTypes.bool,
};

NotesPage.defaultProps = {
    archived: false,
};
