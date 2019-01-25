import React from 'react';
import PropTypes from 'prop-types';
import '@malmo/welcome-styles';

const Welcome = ({
  logo,
  name,
  dependencies,
  children,
}) => (
  <section className="welcome__wrapper">
    <div className="welcome__header">
      <img
        className="welcome__logo"
        alt=""
        width={300}
        src={logo}
      />
      <h1>
        {name}
      </h1>
    </div>
    {children && (
      <div className="welcome__children welcome__boxed">
        {children}
      </div>
    )}
    <h2>
      Main dependencies:
    </h2>
    <pre className="welcome__boxed">
      {JSON.stringify(dependencies, null, 4)}
    </pre>
    <h2>
      Launch development server:
    </h2>
    <pre className="welcome__boxed">
      malmo dev
    </pre>
    <h2>
      Build project:
    </h2>
    <pre className="welcome__boxed">
      malmo build
    </pre>
    <h2>
      Build project using custom env:
    </h2>
    <pre className="welcome__boxed">
      malmo build --env=staging
    </pre>
  </section>
);

Welcome.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dependencies: PropTypes.objectOf(PropTypes.string).isRequired,
};

Welcome.defaultProps = { children: null };

export default Welcome;
