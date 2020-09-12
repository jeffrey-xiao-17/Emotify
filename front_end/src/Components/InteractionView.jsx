import React, { Component } from "react";
import styles from "../css/InteractionView.module.css";
import cx from "classnames";

// Components
import ResponseHistory from "./ResponseHistory";
import TextInput from "./TextInput";
import ChatBot from "./ChatBot";

class View extends Component {
  render() {
    return (
      <div className={styles.full}>
        <div class="ui large pointing secondary menu">
          <div className={cx("ui container", "right item", styles.right)}>
            <a class="active item">Home</a>
            <a class="item">Results</a>
            <a class="item">History</a>
          </div>
        </div>
        {/* <button className={cx("circular ui icon button", styles.settings)}>
          <i class="icon settings"></i>
        </button> */}

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
