import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

const meta = {
  title: 'Rook Starter'
};

const mapStateToProps = (state) => ({
  loading: state.apiLoading.get('loading'),
  loadError: state.apiLoading.get('loadError')
});

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    loading: PropTypes.bool,
    loadError: PropTypes.object
  };

  render() {
    require('./App.pcss');

    return (
      <div>
        <DocumentMeta {...meta} />

        <p>
          Loading: {`${this.props.loading}`}
        </p>

        <p>
          Load Error: {`${this.props.loadError}`}
        </p>

        { this.props.children }
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
