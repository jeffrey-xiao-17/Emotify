import React from "react";
import styles from "./css/App.module.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import InteractionView from "./Components/InteractionView";

function App() {
  return (
    <div className={styles.center}>
      <InteractionView />
    </div>
  );
}

export default App;
