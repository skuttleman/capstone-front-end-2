import React, { Component } from 'react';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return (
      <div>
        Main Component
      </div>
    );
  }
}

export default connect(state => state)(Main);
