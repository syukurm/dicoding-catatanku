import './styles/style.scss';

import NoteItem from './components/NoteItem';
import { useMemo, useState } from 'react';
import SearchBox from './components/SearchBox';
import { getInitialData } from './utils';
import Tabs from './components/Tabs';
import AddNoteFormModal from './components/AddNoteFormModal';
import Button from './components/Button';
import EmptyNotes from './components/EmptyNotes';

export default function App() {
    const [data, setData] = useState(getInitialData());
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTab, setCurrentTab] = useState('active-note');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const notes = useMemo(() => {
        return data
            .filter(({ archived }) =>
                currentTab === 'archived' ? archived : !archived
            )
            .filter(({ title }) =>
                title.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
    }, [searchQuery, currentTab, data]);

    function handleTabButtonClick(tabName) {
        setCurrentTab(tabName);
    }

    function handleArchiveButtonClick(id) {
        setData((previousData) => {
            return previousData.map((note) => {
                if (note.id === id) {
                    return {
                        ...note,
                        archived: !note.archived,
                    };
                }
                return note;
            });
        });
    }

    function handleDeleteButtonClick(id) {
        setData((previousData) => {
            return previousData.filter((note) => note.id !== id);
        });
    }

    function handleAddNoteFormSubmit({ title, content }) {
        setData((previousData) => [
            ...previousData,
            {
                title,
                id: Date.now(),
                body: content,
                archived: false,
                createdAt: new Date().toISOString(),
            },
        ]);
    }

    function handleSearchInputOnChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleModalOpenChange(value) {
        setIsModalOpen(value);
    }

    return (
        <div className="container">
            <header className="header">
                <h1 className="header__title">Catatanku</h1>

                <SearchBox
                    value={searchQuery}
                    onChange={handleSearchInputOnChange}
                />
            </header>
            <main>
                <div className="tab-section">
                    <Tabs
                        currentTab={currentTab}
                        onTabButtonClick={handleTabButtonClick}
                    />
                    <Button
                        variant="accent"
                        onClick={() => setIsModalOpen(true)}
                        type="button"
                    >
                        + Tambah
                    </Button>
                    <AddNoteFormModal
                        open={isModalOpen}
                        onOpenChange={handleModalOpenChange}
                        onSubmit={handleAddNoteFormSubmit}
                    />
                </div>
                <div className="notes-list">
                    {notes.length === 0 && <EmptyNotes />}
                    {notes.map((item) => (
                        <NoteItem
                            key={item.id}
                            note={item}
                            onArchiveButtonClick={handleArchiveButtonClick}
                            onDeleteButtonClick={handleDeleteButtonClick}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
