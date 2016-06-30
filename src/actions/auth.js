import { LOGOUT } from '../constants/actionTypes';
import { SERVER_HOST } from '../constants/api';

export const login = () => window.location.href = SERVER_HOST + '/auth/gplus';
export const logout = () => ({ type: LOGOUT });
