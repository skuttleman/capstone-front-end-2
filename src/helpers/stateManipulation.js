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
  let { gameProps: { TYPE, prop: name } } = props.route;
  let { [name]: gameData, playerNumber, dispatch, editMode } = props;
  let games = (TYPE === UPDATE_LOCAL_EDITABLE_LEVEL) ? [1, 2] : [playerNumber];
  games = games.map(playerNumber => {
    return new PhaserWrapper({ name, playerNumber, gameData, dispatch, editMode });
  });
  games.forEach(game => game.games = games);
  return games;
};
