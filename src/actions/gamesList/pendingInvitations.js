import {
  SEND_GET_PENDING_GAMES_LIST, SUCCEED_GET_PENDING_GAMES_LIST, FAIL_GET_PENDING_GAMES_LIST
} from '../../constants/actionTypes';
import { SERVER_HOST, API_GAMES } from '../../constants/api';
import { ajaxPattern } from '../../services/ajax';

const sendGetPending = () => ({ type: SEND_GET_PENDING_GAMES_LIST });
const succeedGetPending = pending => ({ type: SUCCEED_GET_PENDING_GAMES_LIST, pending });
const failGetPending = error => ({ type: FAIL_GET_PENDING_GAMES_LIST, error });

export default () => {
  let url = `${SERVER_HOST}${API_GAMES}/pending`;
  let succeed = ({ data }) => succeedGetPending(data);
  let fail = ({ data }) => failGetPending(data);
  return ajaxPattern({ before: sendGetPending, url, succeed, fail });
};
