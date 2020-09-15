import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";

// Components
import InteractionView from "./Components/InteractionsPage/InteractionView";
import ResultsView from "./Components/ResultsPage/ResultsView";
import HistoryView from "./Components/HistoryPage/HistoryView";
import LoginView from "./Components/LoginPage/LoginView";
import IdiomsView from "./Components/IdiomsPage/IdiomsView";
import PrivateRoute from "./Components/Routing/PrivateRoute";

import { randomAvatarConfiguration } from "./Avatar";
import EmpathizeView from "./Components/EmpathizePage/EmpathizeView";

function App() {
  const [authed, setAuthed] = useState(true);

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={LoginView} />
        <Route path="/login" exact component={LoginView} />
        <Route path="/idioms" exact component={IdiomsView} />
        <Route
          pathname="/interaction"
          render={() => (
            <InteractionView avatarConfiguration={randomAvatarConfiguration} />
          )}
          authed={authed}
        />
        <Route path="/" exact={true} component={LoginView} />
        <Route
          path="/empathize"
          render={() => (
            <EmpathizeView avatarGenerator={randomAvatarConfiguration} />
          )}
        />
        <Route
          path="/moodboost"
          render={() => (
            <InteractionView avatarGenerator={randomAvatarConfiguration} />
          )}
        />
        <Route
          path="/results"
          render={() => <ResultsView userScore={-0.4} simScore={0.7} />}
        />
        <Route path="/history" component={HistoryView} />
      </Switch>
    </Router>
  );
}

export default App;
