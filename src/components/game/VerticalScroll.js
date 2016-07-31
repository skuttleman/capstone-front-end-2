import React, { Component } from 'react';
import ScrollBar from './ScrollBar';
import { CANVAS_HEIGHT } from '../../constants/gameProps';

export default class VerticalScroll extends Component {
  render() {
    let { game } = this.props;
    return (
      <ScrollBar game={game} size={CANVAS_HEIGHT} axis="y" />
    );
  }
}
