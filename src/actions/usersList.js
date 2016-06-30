import {
  SET_ONLINE_USERS, SEND_GET_OFFLINE_USERS, SUCCEED_GET_OFFLINE_USERS, FAIL_GET_OFFLINE_USERS
} from '../constants/actionTypes';
import { SERVER_HOST, API_PLAYERS } from '../constants/api';
import { ajaxPattern } from '../services/ajax';

const setOnlineUsers = ({ data: users }) => ({ type: SET_ONLINE_USERS, users });
const sendGetOfflineUsers = () => ({ type: SEND_GET_OFFLINE_USERS });
const succeedGetOfflineUsers = users => ({ type: SUCCEED_GET_OFFLINE_USERS, users });
const failGetOfflineUsers = error => ({ type: FAIL_GET_OFFLINE_USERS, error });
const getOfflineUsers = () => {
  let url = `${SERVER_HOST}${API_PLAYERS}?status=offline`;
  let succeed = ({ data: { users } }) => succeedGetOfflineUsers(users);
  let fail = ({ data: { error } }) => failGetOfflineUsers(error);
  return ajaxPattern({ before: sendGetOfflineUsers, url, succeed, fail });
};

export default users => {
  return dispatch => {
    dispatch(setOnlineUsers(users));
    dispatch(getOfflineUsers());
  };
};
