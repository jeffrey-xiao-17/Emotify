import React, { Component } from "react";
import styles from "../css/TextInput.module.css";
import cx from "classnames";

class TextInput extends Component {
  render() {
    return (
      <div className={styles.row}>
        <div className={cx("ui focus input", styles.textfield)}>
          <input type="text" placeholder="Enter your message here." />
        </div>
        <div>
          <button className={cx("ui primary button", styles.sendButton)}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default TextInput;
