import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class App extends Component {
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
