import {
  SET_EDIT_MODE, SET_ACTIVE_TOOL, SET_EDITABLE_GAME_OBJECTS
} from '../constants/actionTypes';

export const setEditMode = editMode => ({ type: SET_EDIT_MODE, editMode });

export const setActiveTool = toolNumber => ({ type: SET_ACTIVE_TOOL, toolNumber });

export const openGameObjectProperties = targets => {
  return { type: SET_GAME_OBJECTS, targets };
};
