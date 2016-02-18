import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions';

const mapStateToProps = (state) => ({
  random: state.random.toJS(),
  clientRequestCounter: state.clientRequestCounter.toJS()
});

export class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    random: PropTypes.shape({
      number: PropTypes.number,
      time: PropTypes.date,
      loadedOnServer: PropTypes.boolean
    }),
    clientRequestCounter: PropTypes.shape({
      count: PropTypes.number
    })
  };

  static fetchData(getState, dispatch, location, params) {
    // Require a random number to be generated before rendering this component
    if (!getState().random.get('number')) {
      return dispatch(Actions.random.loadNewRandom());
    }
  }

  loadNewRandom = (e) => {
    e.preventDefault();
    this.props.dispatch(Actions.random.loadNewRandom());
  };

  render() {
    require('./Home.pcss');

    return (
      <div>
        <p>
          Current Random Number: {this.props.random.number} <br/>
          Generated at: {this.props.random.time} <br/>
          Generated on server? {this.props.random.loadedOnServer.toString()} <br/>
          Number of client requests: {this.props.clientRequestCounter.count}
        </p>

        <p>
          <a href="#" onClick={this.loadNewRandom}>Load new random number</a>
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
