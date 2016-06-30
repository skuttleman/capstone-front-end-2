import {
  SEND_GET_GAME_DATA, SUCCEED_GET_GAME_DATA
} from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case SEND_GET_GAME_DATA:
      return null;
    case SUCCEED_GET_GAME_DATA:
      return action.gameData;
    default:
      return state;
  }
};
