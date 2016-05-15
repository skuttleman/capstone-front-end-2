export const wrapDispatch = dispatch => {
  return action => {
    if (typeof action === 'function') action(dispatch);
    else dispatch(action);
  };
};
