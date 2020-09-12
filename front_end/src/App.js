import React from "react";
import styles from "./css/App.module.css";
import "semantic-ui-css/semantic.min.css";
import cx from "classnames";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";

// Components
import InteractionView from "./Components/InteractionsPage/InteractionView";
import ResultsView from "./Components/ResultsPage/ResultsView";
import HistoryView from "./Components/HistoryPage/HistoryView";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={InteractionView} />
        <Route path="/results" component={ResultsView} />
        <Route path="/history" component={HistoryView} />
        {/* <Route path="/login" component={LoginView} /> */}
      </Switch>
    </Router>
  );
}

export default App;
