import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { name, label, nameInput, value, onInputChange, type } = this.props;
    return (
      <section>
        <label htmlFor={ name }>
          {label}
          <input
            name={ name }
            data-testid={ nameInput }
            value={ value }
            onChange={ onInputChange }
            type={ type }
          />
        </label>
      </section>
    );
  }
}
Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  nameInput: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
export default Input;
