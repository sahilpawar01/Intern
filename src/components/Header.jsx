import { useState } from 'react';
import '../styles/Header.css';

function Header({ onCreatePost, onSearch, currentView, setCurrentView }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo" onClick={() => setCurrentView('home')}>
            <span className="logo-icon">✍️</span>
            BlogSpace
          </h1>
        </div>

        <div className="header-center">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <nav className="nav-links">
            <button
              className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              Home
            </button>
            <button
              className={`nav-link ${currentView === 'trending' ? 'active' : ''}`}
              onClick={() => setCurrentView('trending')}
            >
              Trending
            </button>
            <button
              className={`nav-link ${currentView === 'categories' ? 'active' : ''}`}
              onClick={() => setCurrentView('categories')}
            >
              Categories
            </button>
          </nav>
          <button className="create-btn" onClick={onCreatePost}>
            <span className="btn-icon">+</span>
            Write
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
