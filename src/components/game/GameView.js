import React, { Component } from 'react';
import Game from './Game';
import EditorTools from './EditorTools';
import connectStore from '../../helpers/redux-connector';
import { thenGameData } from '../../helpers/stateManipulation';
import tools from '../../constants/tools';
import { setEditMode } from '../../actions/editMode';

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }

  componentDidMount() {
    let { dispatch, params: { gameId } } = this.props;
    let { gameProps: { get } } = this.props.route;
    dispatch(get(gameId)).then(() => {
      dispatch(setEditMode(true));
      return thenGameData(this.props);
    }).then(games => {
      games.forEach(game => game.tool = tools[0]);
      this.setState({ games });
    });
  }

  componentWillUnmount() {
    this.state.games.forEach(game => game.destroyGame());
  }

  renderGames(name, games) {
    return games.map((game, i) => {
      let number = game.playerNumber || (i + 1);
      return <Game key={`game-${i}`} name={name} number={number} game={game} />;
    });
  }

  render() {
    let { dispatch, toolNumber, editMode } = this.props;
    let { prop: name } = this.props.route.gameProps;
    let { games } = this.state;
    return (
      <div>
        <EditorTools games={games}
          dispatch={dispatch}
          toolNumber={toolNumber}
          editMode={editMode}
        />
        {this.renderGames(name, games)}
      </div>
    );
  }
}

export default connectStore(GameView);
