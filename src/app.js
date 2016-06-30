import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import App from './components/App';
import Main from './components/Main';
import makeReducers from './reducers';
import dispatchMiddleware from './helpers/dispatchMiddleware';
import GameView from './components/game/GameView';
import { playGameProps, editGameProps } from './constants/gameProps';

const reducers = makeReducers({ routing: routerReducer });
let store = createStore(reducers,
  applyMiddleware(dispatchMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Main}/>
          <Route
            path="/wips/:gameId"
            component={GameView}
            gameProps={editGameProps}
          />
          <Route
            path="/games/:gameId"
            component={GameView}
            gameProps={playGameProps}
          />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
