const parseQueryString = queryString => {
  return queryString.split('&').reduce((query, keyValue) => {
    let [key, value] = keyValue.split('=');
    return {
      ...query,
      [key]: value
    };
  }, {});
};

export const getUser = () => {
  return JSON.parse(localStorage.user || 'null');
};

export const clearUser = () => {
  delete localStorage.user;
  delete localStorage.token;
  return null;
};

export const checkLogin = hash => {
  let [path, queryString] = hash.slice(1).split('?');
  if (path === '/login' && queryString) {
    let query = parseQueryString(queryString);
    localStorage.token = query.token;
    localStorage.user = parseUser(query.token);
    if (user) {
      window.location.href = '/';
    }
  }
};

const parseUser = token => {
  if (token) {
    try {
      let user = atob(token.split('.')[1]);
      if (typeof user === 'string') {
        user = JSON.parse(user).user;
        return JSON.stringify(user);
      }
    } finally {
      return 'null';
    }
  }
};
