import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { minMaxDimension } from '../../helpers/chomping';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants/gameProps';

export default class ScrollBar extends Component {
  constructor(props) {
    super(props);
    this.props.game.subscribeCreated(this.recalculate.bind(this));
    this.state = {};
  }

  getWorldBoundsCamera() {
    let { world, world: { bounds, camera } } = this.props.game.game;
    return { world, bounds, camera };
  }

  getElementInnerOuter() {
    let element = ReactDOM.findDOMNode(this);
    let scrollbar = element.querySelector('.scrollbar');
    let outerBox = element.getBoundingClientRect();
    let innerBox = scrollbar.getBoundingClientRect();
    return { element, scrollbar, outerBox, innerBox };
  }

  updateState(property, value) {
    this.setState({
      ...this.state,
      [property]: value
    });
  }

  recalculate() {
    this.updateState('style', this.style());
  }

  scrollbarSize() {
    let { axis, size } = this.props;
    let { bounds } = this.getWorldBoundsCamera();
    let { dimension } = minMaxDimension(axis);
    let worldSize = bounds[dimension];
    return (worldSize - (worldSize - size)) * size / worldSize;
  }

  scrollbarOffset() {
    let { axis, size } = this.props;
    let { bounds, camera } = this.getWorldBoundsCamera();
    let { dimension } = minMaxDimension(axis);
    let worldSize = bounds[dimension];
    return (camera[axis] - bounds[axis]) * size / worldSize;
  }

  style() {
    let { axis } = this.props;
    let { dimension, min } = minMaxDimension(axis);
    let elementSize = this.scrollbarSize();
    let position = this.scrollbarOffset();
    return { [dimension]: elementSize + 'px', [min]: position + 'px' };
  }

  offset(event) {
    let { axis } = this.props;
    let { min } = minMaxDimension(axis);
    let { scrollBar, innerBox } = this.getElementInnerOuter();
    return event['client' + axis.toUpperCase()] - innerBox[min];
  }

  boundaries() {
    let { axis, size } = this.props;
    let { bounds } = this.getWorldBoundsCamera();
    let { dimension } = minMaxDimension(axis);
    return {
      min: bounds[axis],
      max: bounds[dimension] - size + bounds[axis]
    };
  }

  mouseBounds() {
    let { axis, size } = this.props;
    let { min: minKey, max: maxKey } = minMaxDimension(axis);
    let { outerBox } = this.getElementInnerOuter();
    let lower = outerBox[minKey];
    let upper = size - this.scrollbarSize() + lower;
    return { lower, upper };
  }

  toggleListeners(listeners, action) {
    Object.keys(listeners).forEach(key => action(key, listeners[key]));
  }

  mouseup(listeners) {
    this.updateState('dragged', false);
    this.toggleListeners(listeners, window.removeEventListener.bind(window));
  }

  mouseDown(event) {
    this.updateState('dragged', true);
    let offset = this.offset(event);
    let boundaries = this.boundaries();
    let mouseBounds = this.mouseBounds();
    let listeners = {
      mousemove: this.mouseMove.bind(this, offset, boundaries, mouseBounds),
      mouseup: () => this.mouseup(listeners)
    };
    this.toggleListeners(listeners, window.addEventListener.bind(window));
  }

  mouseMove(offset, { min, max }, { lower, upper }, event) {
    let { axis, size } = this.props;
    let { bounds } = this.getWorldBoundsCamera();
    let { dimension } = minMaxDimension(axis);
    let position = event['client' + axis.toUpperCase()];
    let range = Math.round((bounds[dimension] - size) / 50);
    let limitedPosition = Math.max(Math.min(upper, position - offset), lower);
    let gamePosition = (limitedPosition - lower) / (upper - lower) * (max - min) + min;
    this.setWorld(Math.round(gamePosition / 50) * 50);
  }

  clickScroll(position, min, max, lower, upper) {
    let percentage = (position - min) / (max - min);
    let worldPosition = Math.round((percentage * (upper - lower) + lower) / 50) * 50;
    this.setWorld(worldPosition);
  }

  clickScrollArgs({ position, axis, size, min, max, dimension }) {
    let { camera, bounds } = this.getWorldBoundsCamera();
    let { element, outerBox, innerBox } = this.getElementInnerOuter();
    if (position < innerBox[min]) {
      return [outerBox[min], innerBox[min], bounds[axis], camera[axis] - 50];
    } else if (position > innerBox[max]) {
      return [innerBox[max], outerBox[max], camera[axis] + 50, bounds[dimension] - size];
    }
  }

  click(event) {
    let { axis, size } = this.props;
    let { min, max, dimension } = minMaxDimension(axis);
    let position = event['client' + axis.toUpperCase()];
    let params = this.clickScrollArgs({ position, axis, size, min, max, dimension });
    if (params) {
      this.clickScroll.apply(this, [position].concat(params));
    }
  }

  setWorld(position) {
    let { axis } = this.props;
    let { camera } = this.getWorldBoundsCamera();
    camera[axis] = position;
    this.recalculate();
  }

  render() {
    let { props: { axis }, state: { style } } = this;
    let className = `scrollbar-container scrollbar-container-${axis}`;
    return (
      <div className={className} onClick={this.click.bind(this)}>
        <div
          style={style}
          className="scrollbar"
          onMouseDown={this.mouseDown.bind(this)}
        />
      </div>
    );
  }
}
