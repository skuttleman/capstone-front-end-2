const FLASH_NOTIFICATION_TIMEOUT = 4000;

export const flashNotificationPattern = ({ start, stop, remove }) => {
  return dispatch => {
    dispatch(start());
    setTimeOut(() => dispatch(stop()), FLASH_NOTIFICATION_TIMEOUT);
    setTimeOut(() => dispatch(remove()), FLASH_NOTIFICATION_TIMEOUT * 2);
  };
};
