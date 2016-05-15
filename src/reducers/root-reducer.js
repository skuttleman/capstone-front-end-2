import { combineReducers } from 'redux';

const number = (state = 1, action) => {
  if (action.type === 'INCREASE') {
    return state + action.amount;
  } else if (action.type === 'DECREASE') {
    return state - action.amount;
  }
  return state;
};

export default reducers => {
  return combineReducers({
    ...reducers,
    number
  });
};
