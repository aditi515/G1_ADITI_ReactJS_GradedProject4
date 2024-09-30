import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import Navbar from './components/Navbar';
import MovieModal from './components/MovieModal';
import './App.css';

interface Movie {
  id: string;
  title: string;
  posterurl: string;
  contentRating: string;
  duration: string;
  releaseDate: string;
  averageRating: number;
  originalTitle: string;
  storyline: string;
  actors: string[];
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState('movies-in-theaters');
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    // Fetch the movie data from the public folder
    axios.get('/data.json')
      .then((response) => {
        const allMovies = response.data;
        let filteredMovies = [];
        if (category === 'movies-in-theaters') {
          filteredMovies = allMovies['movies-in-theaters'];
        } else if (category === 'coming-soon') {
          filteredMovies = allMovies['movies-coming'];
        } else if (category === 'top-rated-india') {
          filteredMovies = allMovies['top-rated-india'];
        } else if (category === 'top-rated-movies') {
          filteredMovies = allMovies['top-rated-movies'];
        } else if (category === 'favourites') {
          filteredMovies = favorites;
        }
        setMovies(filteredMovies);
      })
      .catch((error) => {
        console.error('Error loading the movie data:', error);
      });
  }, [category, favorites]);

  // Function to toggle favorites
  const handleToggleFavorites = (movie: Movie) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== movie.id));  // Remove from favorites
    } else {
      setFavorites([...favorites, movie]);  // Add to favorites
    }
  };

  // Filter movies based on the search term
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle the modal: open on click, close on another click
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(selectedMovie?.id === movie.id ? null : movie);  // Close if the same movie is clicked
  };

  return (
    <div>
      <Navbar onCategoryChange={setCategory} onSearch={setSearchTerm} />
      <h1>Movies on the Tip</h1>
      <div className="movie-container">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterurl={movie.posterurl}
            isFavorite={favorites.some(fav => fav.id === movie.id)}  // Check if the movie is in favorites
            onToggleFavorite={() => handleToggleFavorites(movie)}  // Toggle favorite on button click
            onClick={() => handleMovieClick(movie)}  // Open/close modal on click
          />
        ))}
      </div>

      {/* Show the modal when a movie is selected */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default App;
