import { getGameData, getWIP } from '../actions';
import {
  UPDATE_LOCAL_GAME_DATA, UPDATE_LOCAL_EDITABLE_LEVEL
} from '../constants/actionTypes';

export const CANVAS_HEIGHT = 450;
export const CANVAS_WIDTH = 800;

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
