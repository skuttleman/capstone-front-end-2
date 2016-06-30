import { UPDATE_LOCAL_EDITABLE_LEVEL } from '../constants/actionTypes';
import PhaserWrapper from './gameHelpers/PhaserWrapper';

export const findAndUpdate = (list, id, updates) => {
  let position = list.findIndex(item => item.id == id);
  if (position === -1) return list;
  return list.slice(0, position)
  .concat({ ...list[position], ...updates })
  .concat(list.slice(position + 1));
};

export const remove = (list, id) => {
  let position = list.findIndex(item => item.id == id);
  if (position === -1) return list;
  return list.slice(0, position)
  .concat(list.slice(position + 1));
};

export const thenGameData = props => {
  let games, editMode = true;;
  let { playerNumber, dispatch } = props;
  let { gameProps: { TYPE, prop: name } } = props.route;
  let gameData = props[name];

  if (TYPE === UPDATE_LOCAL_EDITABLE_LEVEL) games = [1, 2];
  else games = [playerNumber];
  games = games.map((playerNumber, i) => {
    let playable = !i;
    return new PhaserWrapper({ name, playerNumber, gameData, playable, dispatch, editMode });
  });
  games.forEach(game => game.games = games);
  return games;
};
