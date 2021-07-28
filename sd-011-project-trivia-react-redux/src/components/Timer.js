import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  render() {
    const { count } = this.props;
    return <div>{count}</div>;
  }
}

Timer.propTypes = {
  count: PropTypes.number.isRequired,
};
export default Timer;
