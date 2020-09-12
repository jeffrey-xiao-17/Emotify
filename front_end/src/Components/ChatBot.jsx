import React, { Component } from "react";
import styles from "../css/ChatBot.module.css";

class ChatBot extends Component {
  render() {
    return (
      <div className={styles.window}>
        <img
          src="https://react.semantic-ui.com/images/wireframe/image.png"
          class="ui image"
        />
      </div>
    );
  }
}

export default ChatBot;
