import { useEffect, useState } from 'react';

import apiClient from '../common/apiClient';

/**
 * @param {string} id
 */
export function useNote(id) {
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState(null);

    async function archiveNote() {
        await apiClient.archiveNote(id);

        setNote((previous) => ({ ...previous, archived: true }));
    }

    async function unArchiveNote() {
        await apiClient.unArchiveNote(id);

        setNote((previous) => ({ ...previous, archived: false }));
    }

    async function deleteNote() {
        await apiClient.deleteNote(id);

        setNote(null);
    }

    useEffect(() => {
        apiClient
            .getNote(id)
            .then((response) => {
                setNote(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });

        return () => {
            setLoading(true);
        };
    }, [id]);

    return { note, isLoading: loading, archiveNote, unArchiveNote, deleteNote };
}
