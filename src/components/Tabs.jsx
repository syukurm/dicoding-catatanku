import Button from './Button';

export default function Tabs({ currentTab, onTabButtonClick }) {
    return (
        <div className="tab-section__tabs">
            <Button
                variant={currentTab === 'active-note' ? 'primary' : 'secondary'}
                onClick={() => onTabButtonClick('active-note')}
                type="button"
            >
                Catatan Aktif
            </Button>
            <Button
                variant={currentTab === 'archived' ? 'primary' : 'secondary'}
                onClick={() => onTabButtonClick('archived')}
                type="button"
            >
                Arsip
            </Button>
        </div>
    );
}
