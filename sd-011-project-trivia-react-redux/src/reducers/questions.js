import * as actions from '../actions';

const INITIAL_STATE = {
  allQuestions: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.QUESTION_REQUEST:
    return { ...state, allQuestions: action.payload };
  case actions.RESET_GAME:
    return INITIAL_STATE;
  default:
    return state;
  }
}
