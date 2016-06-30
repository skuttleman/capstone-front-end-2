import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { checkLogin } from '../services/auth';
import connectStore from '../helpers/redux-connector';
import SideBar from './sidebar/SideBar';

class App extends Component {
  componentDidMount() {
    checkLogin(location.hash);
  }

  render() {
    let { dispatch, activeGames, pendingInvitations, receivedInvitations,
      editableLevel, onlineUsers: online, offlineUsers: offline } = this.props;
    return (
      <div className="body">
        <div className="header">
          <Link to="/">Home</Link>
          <Link to="/wips/123">WIP 123</Link>
          <button onClick={() => browserHistory.push('/')}>Go Home</button>
        </div>
        <SideBar
          dispatch={dispatch}
          activeGames={activeGames}
          pendingInvitations={pendingInvitations}
          receivedInvitations={receivedInvitations}
          users={{ online, offline }}
        />
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connectStore(App);
