import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import SignIn from '../src/SignIn/SignIn';
import SignUp from '../src/SignUp/SignUp';
import NotFound from '../src/NotFound/NotFound';


ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

