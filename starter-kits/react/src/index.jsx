import React, { Fragment } from 'react';
import { render } from 'react-dom';
import '@/styles.scss';
import logo from '@/assets/logo.svg';
import pkg from '../package.json';

const renderComponent = () => (
  <Fragment>
    <img
      alt=""
      width={250}
      src={logo}
    />
    <br />
    <h1>
      React Starter Kit&nbsp;
      {pkg.version}
    </h1>
    <p>
      {pkg.description}
    </p>
    <h2>
      Main dependencies:
    </h2>
    <pre>
      {JSON.stringify(pkg.dependencies, null, 4)}
    </pre>
    <h2>
      Launch development server:
    </h2>
    <pre>
      malmo dev
    </pre>
    <h2>
      Build project:
    </h2>
    <pre>
      malmo build
    </pre>
    <h2>
      Build project using custom env:
    </h2>
    <pre>
      malmo build --env=staging
    </pre>
  </Fragment>
);

render(renderComponent(), global.document.getElementById('root'));
if (module.hot) module.hot.accept();
