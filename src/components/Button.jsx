export default function Button({
    variant = 'primary',
    children,
    onClick,
    type,
    ariaLabel,
    title,
}) {
    let buttonVariantClass;

    switch (variant) {
        case 'icon': {
            buttonVariantClass = 'button--icon';
            break;
        }

        case 'secondary': {
            buttonVariantClass = 'button--secondary';
            break;
        }

        case 'accent': {
            buttonVariantClass = 'button--accent';
            break;
        }

        default: {
            buttonVariantClass = 'button--primary';
            break;
        }
    }

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
