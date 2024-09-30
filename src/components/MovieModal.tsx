import React from 'react';

interface MovieModalProps {
    movie: {
        title: string;
        posterurl: string;
        contentRating: string;
        duration: string;
        releaseDate: string;
        averageRating: number;
        originalTitle: string;
        storyline: string;
        actors: string[];
    } | null;
    onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>  {/* Close modal on backdrop click */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>  {/* Prevent modal close on click inside content */}
                <button className="close-btn" onClick={onClose}>X</button>
                <div className="modal-body">
                    <div className="modal-left">
                        <img src={movie.posterurl} alt={movie.title} />
                    </div>
                    <div className="modal-right">
                        <h2>{movie.title}</h2>
                        {movie.originalTitle && <p><strong>Original Title:</strong> {movie.originalTitle}</p>}
                        <p><strong>Content Rating:</strong> {movie.contentRating}</p>
                        <p><strong>Duration:</strong> {movie.duration}</p>
                        <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                        <p><strong>Average Rating:</strong> {movie.averageRating}</p>
                        <p><strong>Storyline:</strong> {movie.storyline}</p>
                        <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
