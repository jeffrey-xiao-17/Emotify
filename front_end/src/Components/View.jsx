import React, { Component } from "react";
import styles from "../css/View.module.css";

// Components
import ResponseHistory from "./ResponseHistory";
import TextInput from "./TextInput";
import ChatBot from "./ChatBot";

class View extends Component {
  render() {
    return (
      <div>
        <div className={styles.image}>
          <ChatBot />
        </div>

        <div className={styles.bottom}>
          <ResponseHistory />
          <TextInput />
        </div>
      </div>
    );
  }
}

export default View;
