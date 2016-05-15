import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import App from './components/App';
import Main from './components/Main';
import makeReducers from './reducers/root-reducer';
import { wrapDispatch } from './helpers/redux';


const reducers = makeReducers({ routing: routerReducer });
const store = createStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);
const dispatch = wrapDispatch(store.dispatch);


ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" dispatch={dispatch} component={App}>
          <IndexRoute dispatch={dispatch} component={Main}/>
          <Route path="foo" dispatch={dispatch} component={Main} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
