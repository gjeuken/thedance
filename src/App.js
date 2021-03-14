import React from 'react'
import { Lobby } from './pages/Lobby'
import { Room } from './pages/Room'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";

const App = () => {
  const history = useHistory(); // remember the history of user navigation

  // defining the routing: (so far) homepage, lobby/room page. else redirect to home page for simplicity
  return (
    <Switch>
      <Route exact path="/">
        <Lobby history={history} />
      </Route>
      <Route exact path="/rooms/:id">
        <Room history={history} />
      </Route>
    </Switch>
  );
};

export default App;
