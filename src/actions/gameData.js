import {
  SEND_GET_GAME_DATA, SUCCEED_GET_GAME_DATA, FAIL_GET_GAME_DATA
} from '../constants/actionTypes';
import { SERVER_HOST, API_GAMES } from '../constants/api';
import { ajaxPattern } from '../services/ajax';

const sendGetGameData = () => ({ type: SEND_GET_GAME_DATA });
const succeedGetGameData = gameData => ({ type: SUCCEED_GET_GAME_DATA, gameData });
const failGetGameData = error => ({ type: FAIL_GET_GAME_DATA, error });

export default id => {
  let url = `${SERVER_HOST}${API_GAMES}/${id}`;
  let succeed = ({ data: { game } }) => succeedGetGameData(game);
  let fail = ({ data: { error } }) => failGetGameData(error);
  return ajaxPattern({ before: sendGetGameData, url, succeed, fail });
};
