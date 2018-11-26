import Welcome from '@malmo/welcome-react';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Routes from '@/router';
import React, { Fragment } from 'react';
import { dependencies } from '../../../package.json';

import logo from '@/assets/logo.svg';

const App = () => (
  <Fragment>
    <Welcome
      logo={logo}
      name="React Redux Universal Starter Kit"
      dependencies={dependencies}
    >
      <Header />
      <Container>
        <Routes />
      </Container>
    </Welcome>
  </Fragment>
);

export default App;
