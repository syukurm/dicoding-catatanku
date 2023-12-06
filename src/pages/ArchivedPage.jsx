import { useMemo, useState } from 'react';
import { deleteNote, getArchivedNotes, unarchiveNote } from '../utils/localData';
import NoteItem from '../components/NoteItem';
import { useSearchParams } from 'react-router-dom';

export default function ArchivedPage() {
    const [searchParameters] = useSearchParams();
    const [notes, setNotes] = useState(getArchivedNotes());
    const keyWord = searchParameters.get('keyword');

    const filteredNotes = useMemo(
        () =>
            notes.filter((note) => {
                if (keyWord) {
                    return note.title.toLowerCase().includes(keyWord.toLowerCase());
                }
                return true;
            }),
        [notes, keyWord]
    );

    /** @param {string} id  */
    function handleArchiveButtonClick(id) {
        unarchiveNote(id);
        setNotes(getArchivedNotes());
    }

    /** @param {string} id  */
    function handleDeleteButtonClick(id) {
        deleteNote(id);
        setNotes(getArchivedNotes());
    }
    return (
        <main className="notes-list">
            {filteredNotes.length === 0 && (
                <div className="empty-notes">
                    <p>Arsip kosong</p>
                </div>
            )}
            {filteredNotes.map((item) => (
                <NoteItem
                    key={item.id}
                    note={item}
                    onArchiveButtonClick={() => handleArchiveButtonClick(item.id)}
                    onDeleteButtonClick={() => handleDeleteButtonClick(item.id)}
                />
            ))}
        </main>
    );
}
