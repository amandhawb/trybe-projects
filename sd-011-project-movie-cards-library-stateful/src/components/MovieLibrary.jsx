import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.handleChangeSearchBar = this.handleChangeSearchBar.bind(this);
    this.handleChangeBookmarked = this.handleChangeBookmarked.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleNewMovie = this.handleNewMovie.bind(this);
    const { movies } = this.props;

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
  }

  handleChangeSearchBar({ target }) {
    const { value } = target;
    const { movies } = this.props;
    if (value !== '') {
      const newMovies = movies.filter((movie) => (movie.title.includes(value)
        || movie.subtitle.includes(value)
        || movie.storyline.includes(value)));
      this.setState({
        searchText: value,
        movies: newMovies,
      });
    } else {
      this.setState({
        searchText: value,
        movies,
      });
    }
  }

  handleChangeBookmarked({ target }) {
    const { movies } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const newMovies = movies.filter((movie) => movie.bookmarked === value);
    this.setState({
      bookmarkedOnly: value,
      movies: newMovies,
    });
  }

  handleGenreChange({ target }) {
    const { movies } = this.props;
    const { value } = target;
    if (value !== '') {
      this.setState({
        movies: movies.filter((movie) => movie.genre === value),
        selectedGenre: value,
      });
    } else {
      this.setState({
        movies,
        selectedGenre: value,
      });
    }
  }

  handleNewMovie(newMovie) {
    this.setState((currentState) => {
      const newMovies = [...currentState.movies];
      newMovies.push(newMovie);
      return {
        movies: newMovies,
      };
    });
  }

  render() {
    const { searchText,
      bookmarkedOnly,
      selectedGenre,
      movies,
    } = this.state;
    return (
      <div>
        <h2> My awesome movie library </h2>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.handleChangeSearchBar }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.handleChangeBookmarked }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.handleGenreChange }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ this.handleNewMovie } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.number,
    imagePath: PropTypes.string,
    bookmarked: PropTypes.bool,
    genre: PropTypes.string,
  })).isRequired,

};

export default MovieLibrary;
