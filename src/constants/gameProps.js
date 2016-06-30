import { getGameData, getWIP } from '../actions';
import {
  UPDATE_LOCAL_GAME_DATA, UPDATE_LOCAL_EDITABLE_LEVEL
} from '../constants/actionTypes';

export const playGameProps = {
  get: getGameData,
  TYPE: UPDATE_LOCAL_GAME_DATA,
  prop: 'gameData'
};

export const editGameProps = {
  get: getWIP,
  TYPE: UPDATE_LOCAL_EDITABLE_LEVEL,
  prop: 'editableLevel'
};
