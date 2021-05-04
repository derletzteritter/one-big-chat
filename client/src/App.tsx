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
import VideoChat from './video/VideoChat';

function App() {
  const { user, setUser } = useAuth();

  // check if the user has a token
  useEffect(() => {
    fetch('http://localhost:5000/user', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, [setUser]);

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
              <Route path="/video" component={VideoChat} />
              <Redirect to="/chat" />
            </div>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
