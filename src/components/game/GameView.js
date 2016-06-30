import React, { Component } from 'react';
import Game from './Game';
import connectStore from '../../helpers/redux-connector';
import { thenGameData } from '../../helpers/stateManipulation';

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }

  componentDidMount() {
    let { dispatch, params: { gameId } } = this.props;
    let { gameProps: { get } } = this.props.route;
    dispatch(get(gameId)).then(() => {
      return thenGameData(this.props);
    }).then(games => {
      this.setState({ games });
    });
  }

  componentWillUnmount() {
    this.state.games.forEach(game => game.destroyGame());
  }

  renderGames(name, games) {
    return games.map((game, i) => {
      return (
        <Game key={`game-${i}`} name={name} number={game.playerNumber || i + 1} game={game} />
      );
    });
  }

  render() {
    let { prop: name } = this.props.route.gameProps;
    let { games } = this.state;
    return (
      <div>
        {this.renderGames(name, games)}
      </div>
    );
  }
}

export default connectStore(GameView);
