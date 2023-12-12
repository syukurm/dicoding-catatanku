import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { generateButtonVariantClass } from '../common';

/**
 * @param {object} props
 * @param {'primary' | 'secondary' | 'accent' | 'icon'} props.variant
 * @param {string} props.to
 * @param {string | undefined} props.title
 * @param {string | undefined} ariaLabel
 * @param {React.ReactNode} props.children
 */
export default function LinkButton({ variant = 'primary', to, title, children, ariaLabel }) {
    const buttonVariantClass = generateButtonVariantClass(variant);

    return (
        <Link to={to} className={`button ${buttonVariantClass}`} title={title} aria-label={ariaLabel}>
            {children}
        </Link>
    );
}

LinkButton.propTypes = {
    ariaLabel: PropTypes.string,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    to: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'icon']).isRequired,
};

LinkButton.defaultProps = {
    ariaLabel: undefined,
    title: undefined,
};
