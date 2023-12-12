import PropTypes from 'prop-types';

import { generateButtonVariantClass } from '../common';

/**
 * @param {object} props
 * @param {'primary' | 'secondary' | 'accent' | 'icon'} props.variant
 * @param {React.ReactNode} props.children
 * @param {(() => void | undefined) | undefined} props.onClick
 * @param {'button' | 'submit' | 'reset'} props.type
 * @param {string | undefined} props.ariaLabel
 * @param {string | undefined} props.title
 */
export default function Button({ variant = 'primary', children, onClick, type, ariaLabel, title }) {
    const buttonVariantClass = generateButtonVariantClass(variant);

    return (
        <button
            className={`button ${buttonVariantClass}`}
            onClick={onClick}
            type={type}
            aria-label={ariaLabel}
            title={title}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    ariaLabel: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'icon']).isRequired,
};

Button.defaultProps = {
    ariaLabel: undefined,
    onClick: undefined,
    title: undefined,
};
