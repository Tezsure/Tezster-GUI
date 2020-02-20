import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import OnboardPage from './containers/OnboardPage';
import WorkspacePage from './containers/WorkspacePage';

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.ONBOARD} component={OnboardPage} />
      <Route exact path={routes.WORKSPACE} component={WorkspacePage} />
    </Switch>
  </App>
);
