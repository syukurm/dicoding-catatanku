import PropTypes from 'prop-types';
import { useContext } from 'react';

import { LocaleContext } from '../contexts/LocaleContext';
import Button from './Button';

/**
 * @param {object} props
 * @param {boolean} props.isArchived
 * @param {(() => void | undefined) | undefined} props.onClick
 */
export default function ArchiveButton({ isArchived = false, onClick }) {
    const { trans } = useContext(LocaleContext);

    return (
        <Button
            type="button"
            variant="icon"
            ariaLabel={isArchived ? trans('moveToActive') : trans('moveToArchived')}
            title={isArchived ? trans('moveToActive') : trans('moveToArchived')}
            onClick={onClick}
        >
            {isArchived ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="icon"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="icon"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                </svg>
            )}
        </Button>
    );
}

ArchiveButton.propTypes = {
    isArchived: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
};

ArchiveButton.defaultProps = {
    onClick: undefined,
};
