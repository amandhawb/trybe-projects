import * as actions from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.SEND_SUBMIT:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}
