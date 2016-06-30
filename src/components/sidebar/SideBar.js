import React, { Component } from 'react';
import registerSocket from '../../services/socket';
import {
  updateUsersList, updateGamesList, notifyInvitation, notifyAccepted,
  notifyRejected, notifyCanceled, notifyUpdated, notifyCompleted
} from '../../actions';
import actions from '../../actions';
import GamesList from './GamesList';
import UsersList from './UsersList';

export default class SideBar extends Component {
  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(updateGamesList());
    registerSocket('new invitation', dispatch, [notifyInvitation, updateGamesList]);
    registerSocket('accept game', dispatch, [notifyAccepted, updateGamesList]);
    registerSocket('reject game', dispatch, [notifyRejected, updateGamesList]);
    registerSocket('cancel game', dispatch, [notifyCanceled, updateGamesList]);
    registerSocket('game updated', dispatch, [notifyUpdated, updateGamesList]);
    registerSocket('game completed', dispatch, [notifyCompleted, updateGamesList]);
    registerSocket('user list', dispatch, updateUsersList);
  }

  render() {
    let { activeGames, pendingInvitations, receivedInvitations, users } = this.props;
    return (
      <div className="side-bar">
        <GamesList title="Active Games" list={activeGames} clickable={game => game.yourTurn} path="games" />
        <GamesList title="Pending Invitations" list={pendingInvitations} clickable={() => false} path="inivitations" />
        <GamesList title="Received Invitations" list={receivedInvitations} clickable={() => true} path="inivitations" />
        <UsersList users={users} />
      </div>
    );
  }
}
