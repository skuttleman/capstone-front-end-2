import React, { Component } from 'react';
import UserListItem from './UserListItem';

export default class UsersList extends Component {
  render() {
    let { users: { online, offline } } = this.props;
    return (
      <section className="users-list">
        <h2>Other Players</h2>
        <ul>
          {online.map((user, i) => {
            return <UserListItem key={`online-user--${i}`} user={user} status="online" />
          })}
          {offline.map((user, i) => {
            return <UserListItem key={`offline-user--${i}`} user={user} status="offline" />
          })}
        </ul>
      </section>
    );
  }
}
