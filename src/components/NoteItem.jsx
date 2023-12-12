import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { showFormattedDate } from '../common';
import { LocaleContext } from '../contexts/LocaleContext';
import ArchiveButton from './ArchiveButton';
import TrashButton from './TrashButton';

/**
 * @param {object} props
 * @param {{ id: string, title: string, body: string, owner: string, archived: boolean, createdAt: string }} props.note
 * @param {(() => void | undefined) | undefined} props.onArchiveButtonClick
 * @param {(() => void | undefined) | undefined} props.onDeleteButtonClick
 * @returns {React.ReactElement}
 */
export default function NoteItem({ note, onArchiveButtonClick, onDeleteButtonClick }) {
    const { locale } = useContext(LocaleContext);

    return (
        <article className="note">
            <header className="note__header">
                <h2 className="note__title">
                    <Link to={`/notes/${note.id}`} className="note__title-link">
                        {note.title}
                    </Link>
                </h2>
                <div className="note__actions">
                    <ArchiveButton isArchived={note.archived} onClick={onArchiveButtonClick} />
                    <TrashButton onClick={onDeleteButtonClick} />
                </div>
            </header>
            <time dateTime={note.createdAt} className="note__date">
                {showFormattedDate(note.createdAt, locale === 'en' ? 'en-US' : 'id-ID')}
            </time>
            <p className="note__excerpt">{note.body}</p>
        </article>
    );
}

NoteItem.propTypes = {
    note: PropTypes.exact({
        archived: PropTypes.bool.isRequired,
        body: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onArchiveButtonClick: PropTypes.func.isRequired,
    onDeleteButtonClick: PropTypes.func.isRequired,
};
