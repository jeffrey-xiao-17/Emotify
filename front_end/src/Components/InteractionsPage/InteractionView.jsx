import React, { Component } from "react";
import styles from "../../css/InteractionView.module.css";
import cx from "classnames";
// Components
import ResponseHistory from "./ResponseHistory";
import TextInput from "./TextInput";
import ChatBot from "./ChatBot";

class InteractionView extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "", previous: [] };
  }

  onTodoChange(value) {
    this.setState({
      message: value,
    });
  }

  render() {
    var history = "";
    return (
      <div className={styles.full}>
        <div className={styles.image}>
          <ChatBot />
        </div>

        <div className={styles.bottom}>
          <div className={styles.textfieldResponses}>
            {Array.prototype.forEach.call(this.state.previous, (child) => {
              history += `${child}\n`;
            })}
            {history}
          </div>
          <div className={styles.row}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (this.state.message !== null && this.state.message !== "") {
                  console.log(`Message sent: ${this.state.message}`);
                  const justSent = this.state.message;
                  const prevArr = this.state.previous;
                  prevArr.push(justSent);
                  if (prevArr.length > 3) {
                    prevArr.shift();
                  }
                  this.setState({
                    message: "",
                    previous: prevArr,
                  });
                  console.log("INSIDE ON SUBMIT   " + this.state.previous);
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
        </div>
      </div>
    );
  }
}

export default InteractionView;
