import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Home, Room } from "./pages";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./index.scss";

const App = () => {
  const history = useHistory(); // remember the history of user navigation

  // defining the routing: (so far) homepage, lobby/room page. else redirect to home page for simplicity
  return (
    <Switch>
      <Route exact path="/">
        <Home history={history} />
      </Route>
      <Route exact path="/rooms/:id">
        <Room history={history} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
