import { useSearchParams } from 'react-router-dom';

export default function SearchBox() {
    const [searchParameters, setSearchParameters] = useSearchParams();

    return (
        <div className="search-box">
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
            </svg>

            <input
                id="search"
                type="text"
                className="search-box__input"
                value={searchParameters.get('keyword') ?? ''}
                onChange={(event) => setSearchParameters({ keyword: event.currentTarget.value })}
            />
        </div>
    );
}
