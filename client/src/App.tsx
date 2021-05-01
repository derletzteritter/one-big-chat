import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useAuth } from './auth/hooks/useAuth';
import Login from './auth/Login';
import Register from './auth/Register';
import Chat from './Chat';

function App() {
  const user = true;
  return (
    <div>
      <Router>
        <Switch>
          {!user ? (
            <div>
              <Route path="/" exact component={Login} />
              <Route path="/signup" component={Register} />
              <Redirect to="/" />
            </div>
          ) : (
            <div>
              <Route path="/chat" exact component={Chat} />
              <Redirect to="/chat" />
            </div>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
