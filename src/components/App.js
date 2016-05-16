import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { checkLogin } from '../services/auth';

export default class App extends Component {
  componentDidMount() {
    checkLogin(location.hash);
  }

  render() {
    return (
      <div className="body">
        <div className="header">
          <Link to="/">Home</Link>
          <button onClick={() => browserHistory.push('/')}>Go Home</button>
        </div>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
