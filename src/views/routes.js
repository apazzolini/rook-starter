import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'views/_app/App';
import NotFound from 'views/_errors/NotFound';
import Home from 'views/home/Home';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
