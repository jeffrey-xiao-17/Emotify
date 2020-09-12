import React, { Component } from "react";
import styles from "../../css/TextInput.module.css";
import cx from "classnames";

class TextInput extends Component {
  state = { message: "" };
  onTodoChange(value) {
    this.setState({
      message: value,
    });
  }
  render() {
    return (
      <div className={styles.row}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (this.state.message !== null && this.state.message !== "") {
              console.log(`Message sent: ${this.state.message}`);
              this.setState({ message: "" });
            }
          }}
          className={styles.row}
        >
          <div className={cx("ui focus input", styles.textfield)}>
            <input
              type="text"
              placeholder="Enter your message here."
              value={this.state.message}
              onChange={(e) => this.onTodoChange(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className={cx("ui primary button", styles.sendButton)}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TextInput;
