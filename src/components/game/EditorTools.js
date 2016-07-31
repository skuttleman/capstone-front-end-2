import React, { Component } from 'react';
import tools from '../../constants/tools';
import { setActiveTool, setEditMode } from '../../actions';

export default class EditorTools extends Component {
  setTool(tool, i) {
    this.props.games.forEach(game => game.tool = tool);
    this.props.dispatch(setActiveTool(i));
  }

  playTest() {
    this.props.games[0].playable = true;
    this.props.games.forEach(game => {
      game.editMode = false
      game.rebound(0);
    });
    this.props.dispatch(setEditMode(false));
  }

  endPlayTest() {
    this.props.games.forEach(game => {
      game.playable = false;
      game.editMode = true;
      game.rebound(50);
      game.redraw();
    });
    this.props.dispatch(setEditMode(true));
  }

  sendMove() {
    this.props.games.forEach(game => game.playable = !game.playable);
  }

  renderTool(tool, i) {
    let { toolNumber } = this.props;
    let className = i === toolNumber ? 'active tool' : 'tool';
    return (
      <li key={i} className={className} onClick={() => this.setTool(tool, i)}>
        {tool.name}
      </li>
    );
  }

  renderOptions() {
    if (this.props.editMode) {
      return (
        <button onClick={this.playTest.bind(this)}>Play Test</button>
      );
    }
    return [
      <button key={1} onClick={this.endPlayTest.bind(this)}>End Play Test</button>,
      <button key={2} onClick={this.sendMove.bind(this)}>Send Move</button>
    ];
  }

  render() {
    return (
      <div className="editor-tools">
        <ul className="tool-list">
          {tools.map(this.renderTool.bind(this))}
        </ul>
        <div className="Options">
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}
