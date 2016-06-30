import {
  SEND_GET_EDITABLE_LEVEL, SUCCEED_GET_EDITABLE_LEVEL
} from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case SEND_GET_EDITABLE_LEVEL:
      return null;
    case SUCCEED_GET_EDITABLE_LEVEL:
      return action.levelData;
    default:
      return state;
  }
};
