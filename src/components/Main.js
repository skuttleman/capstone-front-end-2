import React, { Component } from 'react';
import connectStore from '../helpers/redux-connector';
import { getWIP } from '../actions';

class Main extends Component {
  render() {
    return (
      <div>
        <p>Main Component</p>
        <button onClick={()=>this.props.dispatch(getWIP(34))}>
          Get Game
        </button>
      </div>
    );
  }
}

export default connectStore(Main);
