import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ContactList from '../pages/ContactList';
import ConctactDetail from '../pages/ConctactDetail';
import NotFound from '../pages/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ContactList} />
        <Route exact path="/:id" component={ConctactDetail} />
        <Route component={NotFound} />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
