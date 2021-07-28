export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const STORE_LOGIN_EMAIL = 'STORE_LOGIN_EMAIL';
export const QUESTION_REQUEST = 'QUESTION_REQUEST';
export const NEW_CORRECT_ANSWER = 'NEW_CORRECT_ANSWER';
export const RESET_GAME = 'RESET_GAME';

function handleStoreLoginEmail(name, email) {
  return { type: STORE_LOGIN_EMAIL, payload: { name, email } };
}

function handleFetchTokenSuccess(json) {
  window.localStorage.setItem('token', json.token);
  return { type: REQUEST_TOKEN_SUCCESS, payload: json.token };
}

function handleQuestionsSuccess(json) {
  return { type: QUESTION_REQUEST, payload: json };
}

export function handleNewCorrectAnswer(score) {
  return { type: NEW_CORRECT_ANSWER, payload: score };
}

function questionsGame(token) {
  return (dispatch) => {
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then(
        (json) => dispatch(handleQuestionsSuccess(json.results)),
        (error) => console.log(error),
      );
  };
}

export function resetGame() {
  return { type: RESET_GAME };
}

export function startGame(name, email) {
  return (dispatch) => {
    dispatch(handleStoreLoginEmail(name, email));
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((json) => {
        dispatch(handleFetchTokenSuccess(json));
        dispatch(questionsGame(json.token));
      });
  };
}
