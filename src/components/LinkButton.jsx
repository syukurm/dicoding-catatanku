import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { generateButtonVariantClass } from '../utils';

/**
 * @param {object} props
 * @param {'primary' | 'secondary' | 'accent' | 'icon'} props.variant
 * @param {string} props.to
 * @param {string | undefined} props.title
 * @param {import('react').ReactNode} props.children
 */
export default function LinkButton({ variant = 'primary', to, title, children }) {
    const buttonVariantClass = generateButtonVariantClass(variant);

    return (
        <Link to={to} className={`button ${buttonVariantClass}`} title={title}>
            {children}
        </Link>
    );
}

LinkButton.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    to: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'icon']).isRequired,
};

LinkButton.defaultProps = {
    title: undefined,
};
