import SearchBox from './components/SearchBox';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ArchivedPage from './pages/ArchivedPage';
import NotFoundPage from './pages/NotFoundPage';
import NotePage from './pages/NotePage';
import NewNotePage from './pages/NewNotePage';

export default function App() {
    return (
        <div className="container">
            <header className="header">
                <div className="header__inner">
                    <h1 className="header__title">
                        <Link to="/" className="header__title-link">
                            Catatanku
                        </Link>
                    </h1>
                    <SearchBox />
                </div>

                <Navbar />
            </header>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/archived" element={<ArchivedPage />} />
                <Route path="/notes/new" element={<NewNotePage />} />
                <Route path="/notes/:id" element={<NotePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}
