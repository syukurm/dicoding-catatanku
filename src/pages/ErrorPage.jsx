import PropTypes from 'prop-types';

/**
 * @param {object} props
 * @param {string} props.code
 * @param {string} props.message
 */
export default function ErrorPage({ code, message }) {
    return (
        <main className="error">
            <div className="error__code">{code}</div>
            <p>{message}</p>
        </main>
    );
}

ErrorPage.propTypes = {
    code: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};
