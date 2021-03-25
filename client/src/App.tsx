import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './auth/Login';
import Chat from './Chat';

function App() {
  const isPassword = window.localStorage.getItem('one_big_chat:username');
  return (
    <div>
      <Router>
        <Switch>
          {!isPassword ? (
            <Route path="/" exact component={Login} />
          ) : (
            <Route path="/chat" component={Chat} />
          )}
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
