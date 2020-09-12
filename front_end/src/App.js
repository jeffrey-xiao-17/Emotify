import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";

// Components
import InteractionView from "./Components/InteractionsPage/InteractionView";
import ResultsView from "./Components/ResultsPage/ResultsView";
import HistoryView from "./Components/HistoryPage/HistoryView";
import LoginView from "./Components/LoginPage/LoginView";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={LoginView} />
        <Route path="/interaction" component={InteractionView} />
        <Route path="/results" component={ResultsView} />
        <Route path="/history" component={HistoryView} />
      </Switch>
    </Router>
  );
}

export default App;
