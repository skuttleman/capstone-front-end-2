import io from 'socket.io-client';
import { SERVER_HOST } from '../constants/api';

const socket = io.connect(SERVER_HOST, {
  query: 'token=' + (localStorage.token || '')
});

const registerSocket = (channel, dispatch, actions) => {
  socket.on(channel, ({ id, data }) => {
    [].concat(actions).forEach(action => dispatch(action({ id, data })));
  });
};

export default registerSocket;
