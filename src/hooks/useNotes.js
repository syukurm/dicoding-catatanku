import { useEffect, useState } from 'react';

import apiClient from '../common/apiClient';

export function useNotes({ archived = false } = {}) {
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState(null);

    async function archiveNote(id) {
        await apiClient.archiveNote(id);

        setNotes(notes.filter((note) => note.id !== id));
    }

    async function unArchiveNote(id) {
        await apiClient.unArchiveNote(id);

        setNotes(notes.filter((note) => note.id !== id));
    }

    async function deleteNote(id) {
        await apiClient.deleteNote(id);

        setNotes(() => notes.filter((note) => note.id !== id));
    }

    useEffect(() => {
        if (archived) {
            apiClient.getArchivedNotes().then((response) => {
                setNotes(response.data);
                setLoading(false);
            });
        } else {
            apiClient.getActiveNotes().then((response) => {
                setNotes(response.data);
                setLoading(false);
            });
        }

        return () => {
            setLoading(true);
        };
    }, [archived]);

    return { notes, isLoading: loading, archiveNote, unArchiveNote, deleteNote };
}
