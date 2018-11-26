import React from 'react';
import Welcome from '@malmo/welcome-react';
import { render } from 'react-dom';
import '@/styles.scss';
import logo from '@/assets/logo.svg';
import { dependencies } from '../package.json';

const renderComponent = () => (
  <Welcome
    logo={logo}
    name="React Starter Kit"
    dependencies={dependencies}
  />
);

render(renderComponent(), global.document.getElementById('root'));
if (module.hot) module.hot.accept();
