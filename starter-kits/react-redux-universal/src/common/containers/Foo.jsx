import fetchHp from '@/state/foo/actions';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

@connect(state => ({ foo: state.foo }))
class Foo extends Component {
  static fetchData({ dispatch }) {
    return dispatch(fetchHp());
  }

  static propTypes = {
    foo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { foo, dispatch } = this.props;
    if (Object.keys(foo).length === 0) {
      this.constructor.fetchData({ dispatch });
    }
  }

  render() {
    const { foo } = this.props;

    return (
      <Fragment>
        <h2>
          {foo.title}
        </h2>
        <p dangerouslySetInnerHTML={{ __html: foo.description }} />
      </Fragment>
    );
  }
}

export default Foo;
