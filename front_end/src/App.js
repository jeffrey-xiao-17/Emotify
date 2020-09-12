import React from "react";
import styles from "./css/App.module.css";
import "semantic-ui-css/semantic.min.css";

// Components
import View from "./Components/View";

function App() {
  return (
    <div className={styles.center}>
      <View />
    </div>
  );
}

export default App;
