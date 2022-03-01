import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateCardList = this.updateCardList.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
      nameFilter: '',
      rareFilter: 'todas',
      trunfoFilter: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => this.validateSaveButton());
  }

  onSaveButtonClick = () => {
    this.setState((state) => (
      {
        cards: [...state.cards, {
          cardName: state.cardName,
          cardDescription: state.cardDescription,
          cardAttr1: state.cardAttr1,
          cardAttr2: state.cardAttr2,
          cardAttr3: state.cardAttr3,
          cardImage: state.cardImage,
          cardRare: state.cardRare,
          cardTrunfo: state.cardTrunfo,
        }],
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: false,
        hasTrunfo: (!state.hasTrunfo && state.cardTrunfo) || state.hasTrunfo,
        isSaveButtonDisabled: true,
      }
    ));
  }

  validateSaveButton = () => {
    this.setState((state) => {
      const limit = 90;
      const sumLimit = 210;
      return {
        isSaveButtonDisabled:
        !(state.cardName !== '' && state.cardDescription !== '' && state.cardImage !== ''
        && state.cardAttr1 <= limit && state.cardAttr2 <= limit
        && state.cardAttr3 <= limit
        && ((Number(state.cardAttr1) + Number(state.cardAttr2) + Number(state.cardAttr3))
          <= sumLimit)
        && state.cardAttr1 >= 0 && state.cardAttr2 >= 0 && state.cardAttr3 >= 0),
      };
    });
  }

  deleteCard = (key) => {
    this.setState((state) => {
      const newCards = [...state.cards];
      newCards.splice(key, 1);
      return {
        cards: newCards,
        hasTrunfo: !(state.cards[key].cardTrunfo || hasTrunfo),
      };
    });
  }

  updateCardList = (nameFilter, rareFilter, trunfoFilter) => {
    const { deleteCard, state } = this;
    const { cards } = state;
    let newCards;
    if (trunfoFilter) {
      newCards = cards.find((card) => card.cardTrunfo);
      if (!newCards) {
        newCards = [];
      } else {
        return (
          <div key={ 0 }>
            <Card
              cardName={ newCards.cardName }
              cardDescription={ newCards.cardDescription }
              cardAttr1={ newCards.cardAttr1 }
              cardAttr2={ newCards.cardAttr2 }
              cardAttr3={ newCards.cardAttr3 }
              cardImage={ newCards.cardImage }
              cardRare={ newCards.cardRare }
              cardTrunfo={ newCards.cardTrunfo }
            />
            <button
              data-testid="delete-button"
              type="submit"
              onClick={ () => deleteCard(0) }
            >
              Excluir
            </button>
          </div>);
      }
    } else if (!nameFilter && rareFilter === 'todas') {
      newCards = [...cards];
    } else if (nameFilter && rareFilter === 'todas') {
      newCards = cards.filter((card) => card.cardName.includes(nameFilter));
    } else {
      newCards = cards.filter((card) => card.cardName.includes(nameFilter)
        && card.cardRare === rareFilter);
    }
    return newCards.map((card, key) => (
      <div key={ key }>
        <Card
          cardName={ card.cardName }
          cardDescription={ card.cardDescription }
          cardAttr1={ card.cardAttr1 }
          cardAttr2={ card.cardAttr2 }
          cardAttr3={ card.cardAttr3 }
          cardImage={ card.cardImage }
          cardRare={ card.cardRare }
          cardTrunfo={ card.cardTrunfo }
        />
        <button
          data-testid="delete-button"
          type="submit"
          onClick={ () => deleteCard(key) }
        >
          Excluir
        </button>
      </div>
    ));
  }

  render() {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      nameFilter, rareFilter, trunfoFilter } = this.state;
    const { onInputChange, onSaveButtonClick, updateCardList } = this;
    return (
      <div className="container">
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ onInputChange }
          onSaveButtonClick={ onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <label htmlFor="filter">
          Filtros de busca:
          <div name="filter">
            <input
              data-testid="name-filter"
              name="nameFilter"
              placeholder="Nome da carta"
              value={ nameFilter }
              onChange={ onInputChange }
              disabled={ trunfoFilter }
            />
            <select
              data-testid="rare-filter"
              name="rareFilter"
              value={ rareFilter }
              onChange={ onInputChange }
              disabled={ trunfoFilter }
            >
              <option value="todas">todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </div>
        </label>
        <label htmlFor="trunfoFilter">
          Super Trunfo
          <input
            data-testid="trunfo-filter"
            type="checkbox"
            name="trunfoFilter"
            checked={ trunfoFilter }
            onChange={ onInputChange }
          />
        </label>
        { updateCardList(nameFilter, rareFilter, trunfoFilter) }
      </div>
    );
  }
}

export default App;
