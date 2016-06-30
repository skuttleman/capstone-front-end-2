import {
  SEND_GET_ACTIVE_GAMES_LIST, SUCCEED_GET_ACTIVE_GAMES_LIST, FAIL_GET_ACTIVE_GAMES_LIST
} from '../../constants/actionTypes';
import { SERVER_HOST, API_GAMES } from '../../constants/api';
import { ajaxPattern } from '../../services/ajax';

const sendGetActive = () => ({ type: SEND_GET_ACTIVE_GAMES_LIST });
const succeedGetActive = active => ({ type: SUCCEED_GET_ACTIVE_GAMES_LIST, active });
const failGetActive = error => ({ type: FAIL_GET_ACTIVE_GAMES_LIST, error });

export default () => {
  let url = `${SERVER_HOST}${API_GAMES}/active`;
  let succeed = ({ data: { games } }) => succeedGetActive(active);
  let fail = ({ data: { error } }) => failGetActive(error);
  return ajaxPattern({ before: sendGetActive, url, succeed, fail });
};
