import React, { Component } from "react";
import styles from "../../css/InteractionView.module.css";
import cx from "classnames";

// Components
import ResponseHistory from "./ResponseHistory";
import TextInput from "./TextInput";
import ChatBot from "./ChatBot";

class InteractionView extends Component {
  render() {
    return (
      <div className={styles.full}>
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

export default InteractionView;
