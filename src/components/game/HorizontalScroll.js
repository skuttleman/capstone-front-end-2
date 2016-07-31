import React, { Component } from 'react';
import ScrollBar from './ScrollBar';
import { CANVAS_WIDTH } from '../../constants/gameProps';

export default class HorizontalScroll extends Component {
  render() {
    let { game } = this.props;
    return (
      <ScrollBar game={game} size={CANVAS_WIDTH} axis="x" />
    );
  }
}
