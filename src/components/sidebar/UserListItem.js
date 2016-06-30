import React, { Component } from 'react';

export default class UserListItem extends Component {
  render() {
    let { user, status } = this.props;
    return (
      <li key={`user--${user.id}`} className={`user-list-item ${status}`}>
        <span className="player-name">{user.name}</span>
      </li>
    );
  }
}
