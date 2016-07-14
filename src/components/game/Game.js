import React, { Component } from 'react';

export default class Game extends Component {
  renderGameOptions(game) {
    let { editMode, playable } = game;
    if (editMode && playable) {
      return this.renderEditableAndPlayable(game);
    } else if (editMode) {
      return this.renderEditable(game);
    } else if (playable) {
      return this.renderPlayable(game);
    } else {
      return this.renderOther(game);
    }
  }

  renderEditableAndPlayable(game) {
    return (
      <p>Editable and Playable</p>
    );
  }

  renderEditable(game) {
    return (
      <p>Editable</p>
    );
  }

  renderPlayable(game) {
    return (
      <p>Playable</p>
    );
  }

  renderOther(game) {
    return (
      <p>Other</p>
    );
  }

  render() {
    let { name, number, game } = this.props;
    return (
      <div className="game">
        <div className="game-container" id={`${name}-${number}`} />
        {this.renderGameOptions(game)}
      </div>
    );
  }
}
