import React, { Component } from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';

export default class GameListItem extends Component {
  render() {
    let { game, clickable } = this.props;
    let displayClass = clickable ? 'active' : 'inactive';
    let onClick = clickable ? () => browserHistory.push(`/games/${game.id}`) : null;
    let formattedDate = moment(game.lastUpdated).fromNow();
    return (
      <li key={game.id} className={`game-list-item ${displayClass}`} onClick={onClick}>
        <span className="player-name">{game.otherPlayer.name}</span>
        <span className="date">{formattedDate}</span>
      </li>
    );
  }
}
