import React, { Component } from 'react';
import VerticalScroll from './VerticalScroll';
import HorizontalScroll from './HorizontalScroll';

export default class Game extends Component {
  render() {
    let { name, number, game } = this.props;
    return (
      <div className="game">
        <div className="game-container" id={`${name}-${number}`} />
        <VerticalScroll game={game} />
        <HorizontalScroll game={game} />
      </div>
    );
  }
}
