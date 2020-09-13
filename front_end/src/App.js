import React, {useState} from "react";
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

function App() {
  const [authed, setAuthed] = useState(true)

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={LoginView} />
        <Route path="/login" exact component={LoginView} />
        <Route path="/idioms" exact component={IdiomsView} />
        <PrivateRoute
          pathname="/interaction"
          render={() =><InteractionView avatarConfiguration={randomAvatarConfiguration()}/>}
          authed={authed}
        />
        <PrivateRoute 
          authed={authed} 
          render={()=><ResultsView/>}
          pathname="/results"
        />
        <PrivateRoute 
          authed={authed} 
          pathname="/history" 
          render={()=><HistoryView/>}
        />
        {/* <Route
          path="/interaction"
          render={() => <InteractionView generatedBot={generateBot} />}
          authed={authed}
        />
        <Route authed={authed} path="/results" component={ResultsView} />
        <Route authed={authed} path="/history" component={HistoryView} /> */}
      
      </Switch>
    </Router>
  );
}

export default App;
