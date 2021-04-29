import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Chat from './Chat';

function App() {
  const isPassword = window.localStorage.getItem('one_big_chat:username');
  return (
    <div>
      <Router>
        <Switch>
          {!isPassword ? (
            <div>
              <Route path="/" exact component={Login} />
              <Route path="/signup" component={Register} />
            </div>
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
