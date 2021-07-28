import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <div>
        <label
          htmlFor="imagePath"
          data-testid="image-input-label"
        >
          Imagem
          <input
            data-testid="image-input"
            type="text"
            name="imagePath"
            value={ value }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

Image.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Image;
