import React from 'react';

interface MovieCardProps {
    title: string;
    posterurl: string;
    isFavorite: boolean;  // New prop to indicate if the movie is a favorite
    onToggleFavorite: () => void;
    onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterurl, isFavorite, onToggleFavorite, onClick }) => {
    return (
        <div className="movie-card" onClick={onClick}>  {/* Add onClick handler */}
            <img
                src={posterurl}
                alt={title}
            />
            <h3>{title}</h3>
            <button
                onClick={(e) => {
                    e.stopPropagation();  // Prevent modal opening on button click
                    onToggleFavorite();
                }}
            >
                {isFavorite ? 'Remove from Favourites' : 'Add to Favourites'} <span role="img" aria-label="heart">❤️</span>
            </button>
        </div>
    );
};

export default MovieCard;
