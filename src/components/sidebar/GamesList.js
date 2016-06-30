import React, { Component } from 'react';
import GameListItem from './GameListItem';

export default class GamesList extends Component {
  render() {
    let { title, list, clickable } = this.props;
    let active = list.filter(clickable);
    let inActive = list.filter(game => !clickable(game));
    return (
      <section className="games-list">
        <h2>{title}</h2>
        <ul>
          {active.map(game => <GameListItem key={game.id} game={game} clickable={true} />)}
          {inActive.map(game => <GameListItem key={game.id} game={game} clickable={false} />)}
        </ul>
      </section>
    );
  }
}
