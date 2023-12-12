/**
 * @param {string | number | Date} date
 */
function showFormattedDate(date, locale = 'id-ID') {
    return new Date(date).toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * @param {'primary' | 'secondary' | 'accent' | 'icon'} variant
 */
function generateButtonVariantClass(variant) {
    switch (variant) {
        case 'icon': {
            return 'button--icon';
        }

        case 'secondary': {
            return 'button--secondary';
        }

        case 'accent': {
            return 'button--accent';
        }

        default: {
            return 'button--primary';
        }
    }
}

export { generateButtonVariantClass, showFormattedDate };
