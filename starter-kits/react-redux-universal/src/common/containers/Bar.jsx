import List from '@/components/List';
import fetchBar from '@/state/bar/actions';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

@connect(state => ({ bar: state.bar }))
class Bar extends Component {
  static fetchData({ dispatch }) {
    return dispatch(fetchBar());
  }

  static propTypes = {
    bar: PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { bar, dispatch } = this.props;
    if (Object.keys(bar).length === 0) {
      this.constructor.fetchData({ dispatch });
    }
  }

  render() {
    const { bar } = this.props;

    return (
      <Fragment>
        <h2>
          {bar.title}
        </h2>
        {bar.items && bar.items.length > 0 && <List items={bar.items} />}
      </Fragment>
    );
  }
}

export default Bar;
