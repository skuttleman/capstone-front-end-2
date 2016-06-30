export const SERVER_HOST = (window.location.hostname === 'localhost') ?
  'http://localhost:8000' :
  'https://g15-capstone.herokuapp.com';
export const API_GAMES = '/api/v2/games';
export const API_PLAYERS = '/api/v2/players';
export const API_WIPS = '/api/v2/wips';
