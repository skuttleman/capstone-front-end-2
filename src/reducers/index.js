import {
  SET_ONLINE_USERS,
  SUCCEED_GET_OFFLINE_USERS,
  SUCCEED_GET_ACTIVE_GAMES_LIST,
  SUCCEED_GET_PENDING_GAMES_LIST,
  SUCCEED_GET_INVITATIONS,
  SET_ACTIVE_TOOL,
  SET_EDIT_MODE
} from '../constants/actionTypes';
import { combineReducers } from 'redux';
import user from './user';
import gameData from './gameData';
import editableLevel from './editableLevel';
import notifications from './notifications';
import simpleReducer from './simpleReducer';

export default reducers => {
  return combineReducers({
    ...reducers,
    user,
    gameData,
    editableLevel,
    notifications,
    onlineUsers: simpleReducer(SET_ONLINE_USERS, 'users', []),
    offlineUsers: simpleReducer(SUCCEED_GET_OFFLINE_USERS, 'users', []),
    activeGames: simpleReducer(SUCCEED_GET_ACTIVE_GAMES_LIST, 'active', []),
    pendingInvitations: simpleReducer(SUCCEED_GET_PENDING_GAMES_LIST, 'pending', []),
    receivedInvitations: simpleReducer(SUCCEED_GET_INVITATIONS, 'invitations', []),
    toolNumber: simpleReducer(SET_ACTIVE_TOOL, 'toolNumber', 0),
    editMode: simpleReducer(SET_EDIT_MODE, 'editMode', false)
  });
};
