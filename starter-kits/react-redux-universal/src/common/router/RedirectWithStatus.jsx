import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RedirectWithStatus = ({
  code,
  from,
  to,
}) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code; // eslint-disable-line no-param-reassign
      return <Redirect from={from} to={to} />;
    }}
  />
);

RedirectWithStatus.propTypes = {
  code: PropTypes.number.isRequired,
  from: PropTypes.string,
  to: PropTypes.string.isRequired,
};

RedirectWithStatus.defaultProps = {
  from: null,
};

export default RedirectWithStatus;
