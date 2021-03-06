import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import { Home, Admin } from './components/containers';

const Status = ({ code, children }) => {
  return (
    <Route
      render={({ staticContent }) => {
        if (staticContent) staticContent.status = code;
        return children;
      }}
    />
  );
};

const NotFound = () => {
  return (
    <Status code={404}>
      <div>
        <h2>Sorry, can't find this page</h2>
      </div>
    </Status>
  );
};

const routes = (
  <div>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default routes;
