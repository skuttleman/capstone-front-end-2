import { browserHistory } from 'react-router';

import {
  ADD_NOTIFICATION, UPDATE_NOTIFICATION_CLASSNAME, REMOVE_NOTIFICATION
} from '../constants/actionTypes';
import { flashNotificationPattern } from '../services/notifications';

let messageId = 0;

const clickHandler = (path, id) => () => browserHistory.push(`/${path}/${gameId}`);
const addMessage = (message, action) => {
  return { id: messageId++, type: ADD_NOTIFICATION, message, action };
};
const updateMessageClassName = id => {
  return { id, type: UPDATE_NOTIFICATION_CLASSNAME, className: 'leaving' };
};
const removeMessage = id => {
  return { id, type: REMOVE_NOTIFICATION };
};

const notifyAny = (message, click) => {
  let messageId;
  const start = () => {
    let action = addMessage(message, click);
    messageId = action.id;
    return action;
  };
  const stop = () => updateMessageClassName(messageId);
  const remove = () => removeMessage(messageId);
  return flashNotificationPattern({ start, stop, remove });
};

export const notifyInvitation = ({ id }) => {
  let message = 'You have received a new invitiation.';
  return notifyAny(message, clickHandler('invitations', id));
};

export const notifyAccepted = ({ id }) => {
  let message = 'An invitation you sent has been accepted.';
  return notifyAny(message, clickHandler('games', id));
};

export const notifyRejected = () => {
  let message = 'An invitation you sent has been rejected.';
  return notifyAny(message, () => null);
};

export const notifyCanceled = () => {
  let message = 'One of your invitations has been canceled.';
  return notifyAny(message, () => null);
};

export const notifyUpdated = ({ id }) => {
  let message = 'A game you are playing is ready for you to make your move.';
  return notifyAny(message, clickHandler('games', id));
};

export const notifyCompleted = ({ id }) => {
  let message = 'One of your games has been completed.';
  return notifyAny(message, clickHandler('games', id));
};
