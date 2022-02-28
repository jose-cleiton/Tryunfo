/** @format */

import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <main>
        <form>
          <label htmlFor="name">
            Nome da carta:
            <input type="text" data-testid="name-input" />
          </label>
          <label htmlFor="id-descricao">
            Descrição da carta:
            <textarea data-testid="description-input" />
          </label>
          <label htmlFor="id-attr1">
            Attr01 :
            <input
              type="number"
              name=""
              id="id-attr1"
              data-testid="attr1-input"
            />
          </label>
          <label htmlFor="id-attr2">
            Attr02 :
            <input
              type="number"
              name=""
              id="id-attr2"
              data-testid="attr2-input"
            />
          </label>
          <label htmlFor="id-attr3">
            Attr03 :
            <input
              type="number"
              name=""
              id="id-attr3"
              data-testid="attr3-input"
            />
          </label>
          <label htmlFor="id-imagem">
            Link da imagem
            <input
              type="text"
              name=""
              id="id-imagem"
              data-testid="image-input"
            />
          </label>

          <select name="select" data-testid="rare-input">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>

          <input
            type="checkbox"
            id="id-superTrunfo"
            data-testid="trunfo-input"
          />

          <button type="submit" data-testid="save-button">
            Salvar
          </button>
        </form>
      </main>
    );
  } // fim do render
}

export default Form;
