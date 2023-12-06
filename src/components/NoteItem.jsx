import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils';
import { Link } from 'react-router-dom';
import ArchiveButton from './ArchiveButton';
import TrashButton from './TrashButton';

/**
 * @param {object} props
 * @param {import('../utils/localData').Note} props.note
 * @param {() => void | undefined} props.onArchiveButtonClick
 * @param {() => void | undefined} props.onDeleteButtonClick
 */
export default function NoteItem({ note, onArchiveButtonClick, onDeleteButtonClick }) {
    return (
        <article className="note-item">
            <header className="note-item__header">
                <h2 className="note-item__title">
                    <Link to={`/notes/${note.id}`} className="note-item__title-link">
                        {note.title}
                    </Link>
                </h2>
                <div className="note-item__actions">
                    <ArchiveButton isArchived={note.archived} onClick={onArchiveButtonClick} />
                    <TrashButton onClick={onDeleteButtonClick} />
                </div>
            </header>
            <time dateTime={note.createdAt} className="note-item__date">
                {showFormattedDate(note.createdAt)}
            </time>
            <p className="note-item__body">{note.body}</p>
        </article>
    );
}

NoteItem.propTypes = {
    note: PropTypes.exact({
        archived: PropTypes.bool.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onArchiveButtonClick: PropTypes.func.isRequired,
    onDeleteButtonClick: PropTypes.func.isRequired,
};
