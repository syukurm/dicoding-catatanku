import { useMemo, useState } from 'react';
import NoteItem from '../components/NoteItem';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/localData';
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {
    const [searchParameters] = useSearchParams();
    const [notes, setNotes] = useState(getActiveNotes());

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
        archiveNote(id);
        setNotes(getActiveNotes());
    }

    /** @param {string} id  */
    function handleDeleteButtonClick(id) {
        deleteNote(id);
        setNotes(getActiveNotes());
    }

    return (
        <main className="notes-list">
            {filteredNotes.length === 0 && (
                <div className="empty-notes">
                    <p>Tidak ada Catatan</p>
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
