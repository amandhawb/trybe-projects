import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  calcTotal() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, current) => {
      const { value, currency, exchangeRates } = current;
      const conversionTax = parseFloat(exchangeRates[currency].ask);
      return acc + parseFloat(value) * conversionTax;
    }, 0);
    return total;
  }

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick() {
    const { addExpense } = this.props;
    addExpense(this.state);
  }

  renderForm() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            onChange={ this.handleOnChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <textarea
            id="description"
            name="description"
            onChange={ this.handleOnChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            onChange={ this.handleOnChange }
          >
            {currencies.map((item, index) => (
              <option key={ index } value={ item }>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select id="method" name="method" onChange={ this.handleOnChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        {this.renderTag()}
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>);
  }

  renderTag() {
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          onChange={ this.handleOnChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  renderHeader() {
    const { email } = this.props;
    const total = this.calcTotal();
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{total}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }

  renderTable() {
    const { expenses, deleteExpense } = this.props;
    const tableHeader = this.renderTableHeader();
    const tableBody = expenses.map((item) => {
      const { id, description, tag, method,
        value,
        currency,
        exchangeRates,
      } = item;
      const valueNumber = parseFloat(value);
      const currencyData = exchangeRates[currency];
      const currencyName = currencyData.name;
      const conversionTax = parseFloat(currencyData.ask);
      const brazilianValue = valueNumber * conversionTax;
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{valueNumber}</td>
          <td>{currencyName}</td>
          <td>{conversionTax.toFixed(2)}</td>
          <td>{brazilianValue.toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              data-testid="delete-btn"
              type="button"
              onClick={ () => {
                deleteExpense(id);
              } }
            >
              Delete
            </button>
            <button data-testid="edit-btn" type="button">Update</button>
          </td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          {tableHeader}
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    );
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderForm()}
        {this.renderTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(actions.fetchAPI()),
  addExpense: (walletState) => dispatch(actions.addExpense(walletState)),
  deleteExpense: (id) => dispatch(actions.deleteExpense(id)),
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
  fetchAPI: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
