import {
  LOGOUT,
  SEND_GET_GAME_DATA, SUCCEED_GET_GAME_DATA,
  SEND_GET_EDITABLE_LEVEL, SUCCEED_GET_EDITABLE_LEVEL
} from '../actions/types';
import { getUser, clearUser } from '../services/auth';
import { combineReducers } from 'redux';

const user = (state = getUser(), action) => {
  return (action.type === LOGOUT) ? clearUser() : state;
};

const gameData = (state = null, action) => {
  switch (action.type) {
    case SEND_GET_GAME_DATA:
      return null;
    case SUCCEED_GET_GAME_DATA:
      return action.gameData;
    default:
      return state;
  }
};

const editableLevel = (state = null, action) => {
  switch (action.type) {
    case SEND_GET_EDITABLE_LEVEL:
      return null;
    case SUCCEED_GET_EDITABLE_LEVEL:
      return action.editableLevel;
    default:
      return state;
  }
};

export default reducers => {
  return combineReducers({
    ...reducers,
    user,
    gameData,
    editableLevel
  });
};
