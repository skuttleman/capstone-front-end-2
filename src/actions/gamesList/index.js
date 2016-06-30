import updateActive from './activeGames';
import updatePending from './pendingInvitations';
import updateInvitations from './receivedInvitations';

export const updateGamesList = () => {
  return dispatch => {
    [updateActive(), updatePending(), updateInvitations()].forEach(dispatch);
  };
};
