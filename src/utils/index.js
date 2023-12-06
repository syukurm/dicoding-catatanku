const showFormattedDate = (date) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('id-ID', options);
};

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

export { showFormattedDate, generateButtonVariantClass };
