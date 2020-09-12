import React from "react";
import styles from "./css/App.module.css";
import "semantic-ui-css/semantic.min.css";
import cx from "classnames";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";

// Components
import InteractionView from "./Components/InteractionsPage/InteractionView";

function App() {
  return (
    <Router>
      <Nav />
      <Route path="/" exact component={InteractionView} />
    </Router>
  );
}

export default App;
