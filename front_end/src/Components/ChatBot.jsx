import React, { Component } from "react";
import styles from "../css/ChatBot.module.css";
import cx from "classnames";

class ChatBot extends Component {
  render() {
    return (
      <div className={styles.window}>
        <img
          src="https://react.semantic-ui.com/images/wireframe/image.png"
          className={cx("ui image", styles.avatar)}
        />
      </div>
    );
  }
}

export default ChatBot;
