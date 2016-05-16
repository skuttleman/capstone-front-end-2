import 'io' from 'socket.io-client';
import { SERVER_HOST } from './consts';

export default const socket = io.connect(SERVER_HOST, {
  query: 'token=' + localStorage.token
});
