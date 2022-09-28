import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/' exact={true}>
          <Dashboard />
        </PrivateRoute>
        <Route path='/Login'>
          <Login />
        </Route>
        <Route path='*' exact={false}>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
