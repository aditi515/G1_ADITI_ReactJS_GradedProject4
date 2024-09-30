import React, { useState } from 'react';

interface NavbarProps {
    onCategoryChange: (category: string) => void;
    onSearch: (searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCategoryChange, onSearch }) => {
    const [activeCategory, setActiveCategory] = useState('movies-in-theaters');

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        onCategoryChange(category);
    };

    return (
        <nav>
            <div>
                <button
                    className={activeCategory === 'movies-in-theaters' ? 'active' : ''}
                    onClick={() => handleCategoryClick('movies-in-theaters')}
                >
                    Movies in theaters
                </button>
                <button
                    className={activeCategory === 'coming-soon' ? 'active' : ''}
                    onClick={() => handleCategoryClick('coming-soon')}
                >
                    Coming soon
                </button>
                <button
                    className={activeCategory === 'top-rated-india' ? 'active' : ''}
                    onClick={() => handleCategoryClick('top-rated-india')}
                >
                    Top rated Indian
                </button>
                <button
                    className={activeCategory === 'top-rated-movies' ? 'active' : ''}
                    onClick={() => handleCategoryClick('top-rated-movies')}
                >
                    Top rated movies
                </button>
                <button
                    className={activeCategory === 'favourites' ? 'active' : ''}
                    onClick={() => handleCategoryClick('favourites')}
                >
                    Favourites
                </button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search movie"
                    onChange={(e) => onSearch(e.target.value)}
                />
                <button className="search-btn">
                    <span role="img" aria-label="search">🔍</span>
                </button>


            </div>
        </nav>
    );
};

export default Navbar;
