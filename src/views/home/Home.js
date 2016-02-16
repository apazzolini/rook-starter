import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Random from '../../redux/modules/random';

const mapStateToProps = (state) => ({
  random: state.random.toJS()
});

export class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    random: PropTypes.shape({
      number: PropTypes.number,
      time: PropTypes.date
    })
  };

  static fetchData(getState, dispatch, location, params) {
    if (!Random.selectors.currentNumber(getState())) {
      return dispatch(Random.actions.loadNewRandom());
    }
  }

  loadNewRandom = (e) => {
    e.preventDefault();
    this.props.dispatch(Random.actions.loadNewRandom());
  };

  render() {
    require('./Home.pcss');

    return (
      <div>
        <p>
          Current Random Number: {this.props.random.number} <br/>
          Generated at: {this.props.random.time}
        </p>

        <p>
          <a href="#" onClick={this.loadNewRandom}>Load new random number</a>
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
