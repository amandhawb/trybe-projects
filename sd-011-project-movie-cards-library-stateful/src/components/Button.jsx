import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { onClick, cleanState, newMovie } = this.props;
    return (
      <button
        data-testid="send-button"
        onClick={ () => {
          onClick(newMovie);
          cleanState();
        } }
        type="button"
      >
        Adicionar filme
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  cleanState: PropTypes.func.isRequired,
  newMovie: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.number,
    imagePath: PropTypes.string,
    bookmarked: PropTypes.bool,
    genre: PropTypes.string,
  }).isRequired,
};

export default Button;
