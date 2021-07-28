export const SEND_SUBMIT = 'SEND_SUBMIT';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_FAIL = 'REQUEST_API_FAIL';
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';
export const ADD_EXPENSE_FAIL = 'ADD_EXPENSE_FAIL';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
const INITIAL_ID = -1;

export function handleLogin(email) {
  return { type: SEND_SUBMIT, payload: email };
}

function handleAPISuccess(json) {
  const currenciesFiltered = Object
    .keys(json)
    .filter((item) => item !== 'USDT');
  return { type: REQUEST_API_SUCCESS, payload: currenciesFiltered };
}

function handleAPIFail(error) {
  return { type: REQUEST_API_FAIL, payload: error };
}

export function fetchAPI() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then(
      (json) => dispatch(handleAPISuccess(json)),
      (error) => dispatch(handleAPIFail(error)),
    );
}

function addExpenseFail(error) {
  return { type: ADD_EXPENSE_FAIL, payload: error };
}
let currentId = INITIAL_ID;

function addExpenseSuccess(exchangeRates, walletState) {
  currentId += 1;
  return {
    type: ADD_EXPENSE_SUCCESS,
    payload: { ...walletState, exchangeRates, id: currentId },
  };
}

export function addExpense(walletState) {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then(
      (json) => dispatch(addExpenseSuccess(json, walletState)),
      (error) => dispatch(addExpenseFail(error)),
    );
}

export function deleteExpense(id) {
  return { type: DELETE_EXPENSE, payload: id };
}
