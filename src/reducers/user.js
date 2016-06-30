import { LOGOUT } from '../constants/actionTypes';
import { getUser, clearUser } from '../services/auth';

export default (state = getUser(), action) => {
  return (action.type === LOGOUT) ? clearUser() : state;
};
