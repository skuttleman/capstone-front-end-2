import {
  ADD_NOTIFICATION, UPDATE_NOTIFICATION_CLASSNAME, REMOVE_NOTIFICATION
} from '../constants/actionTypes';
import { findAndUpdate, remove } from '../helpers/stateManipulation';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return state.concat({
        id: action.id,
        message: action.message,
        action: action.action
      });
    case UPDATE_NOTIFICATION_CLASSNAME:
      let { className } = action;
      return findAndUpdate(state, id, { className });
    case REMOVE_NOTIFICATION:
      return remove(state, id);
    default:
      return state;
  }
};
