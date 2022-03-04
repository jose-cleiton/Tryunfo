import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form onSubmit={ (e) => e.preventDefault() }>
        <Input
          name="cardName"
          label="Nome: "
          nameInput="name-input"
          onInputChange={ onInputChange }
          type="text"
          value={ cardName }
        />

        <Input
          name="cardDescription"
          label=" Descrição:"
          nameInput="description-input"
          onInputChange={ onInputChange }
          type="textarea"
          value={ cardDescription }
        />

        <Input
          name="cardAttr1"
          label="Atributo 1:"
          nameInput="attr1-input"
          onInputChange={ onInputChange }
          type="number"
          value={ cardAttr1 }
        />
        <Input
          name="cardAttr2"
          label="Atributo 2:"
          nameInput="attr2-input"
          onInputChange={ onInputChange }
          type="number"
          value={ cardAttr2 }
        />
        <Input
          name="cardAttr3"
          label="Atributo 3:"
          nameInput="attr3-input"
          onInputChange={ onInputChange }
          type="number"
          value={ cardAttr3 }
        />

        <Input
          name="cardImage"
          label=" Link da imagem:"
          nameInput="image-input"
          onInputChange={ onInputChange }
          type="text"
          value={ cardImage }
        />
        <div>
          <label htmlFor="cardRare">
            Raridade:
            <select
              name="cardRare"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="cardTrunfo">
            Super Trunfo:
            {hasTrunfo ? (
              <span> Você já tem um Super Trunfo em seu baralho</span>
            ) : (
              <input
                type="checkbox"
                name="cardTrunfo"
                data-testid="trunfo-input"
                value="Super Trunfo"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
            )}
          </label>
        </div>
        <input
          type="submit"
          data-testid="save-button"
          value="Salvar"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        />
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
