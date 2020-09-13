import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";

// Components
import InteractionView from "./Components/InteractionsPage/InteractionView";
import ResultsView from "./Components/ResultsPage/ResultsView";
import HistoryView from "./Components/HistoryPage/HistoryView";
import LoginView from "./Components/LoginPage/LoginView";
import EmpathizeView from "./Components/EmpathizePage/EmpathizeView";

import { randomAvatarConfiguration } from "./Avatar";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact={true} component={LoginView} />
        <Route
          path="/empathize"
          render={() => <EmpathizeView avatarGenerator={randomAvatarConfiguration} />}
        />
        <Route
          path="/interaction"
          render={() => (
            <InteractionView avatarGenerator={randomAvatarConfiguration} />
          )}
        />
        <Route path="/results" component={ResultsView} />
        <Route path="/history" component={HistoryView} />
      </Switch>
    </Router>
  );
}

export default App;
