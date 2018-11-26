import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RedirectWithStatus from '@/router/RedirectWithStatus';
import routes from './routes';

export default () => (
  <Switch>
    {routes.map(({
      fetchData, // eslint-disable-line no-unused-vars
      ...props
    }) => {
      const Component = props.component ? Route : RedirectWithStatus; // eslint-disable-line
      return <Component {...props} />;
    })}
  </Switch>
);
