import React from 'react';
import PropTypes from 'prop-types';

class RatingComponent extends React.Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <div>
        <label
          htmlFor="rating"
          data-testid="rating-input-label"
        >
          Avaliação
          <input
            data-testid="rating-input"
            type="number"
            name="rating"
            value={ value }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

RatingComponent.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RatingComponent;
