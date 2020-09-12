import React, { Component } from "react";
import styles from "../../css/InteractionView.module.css";
import cx from "classnames";
// Components
import ChatBot from "./ChatBot";
import { ChatFeed } from "react-bell-chat";
import update from "immutability-helper";

class InteractionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      authors: [
        {
          id: 1,
          name: "User",
          isTyping: false,
        },
        {
          id: 2,
          name: "Bot",
          isTyping: false,
        },
      ],
      idCount: 1,
      inputDisabled: false,
    };
  }

  onTodoChange(value) {
    console.log("User is typing...");
    this.setState({
      message: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.message !== null && this.state.message !== "") {
      const justSent = this.state.message;
      this.setState({
        message: "",
        messages: [
          ...this.state.messages,
          {
            authorId: 1,
            id: this.state.idCount++,
            message: justSent,
            createdOn: new Date(),
            isSend: false,
          },
        ],
      });
      this.botResponse(this.state.idCount - 1);
    }
  }

  botResponse(id) {
    this.setState({ inputDisabled: true });
    setTimeout(() => {
      this.setState((previousState) => ({
        messages: previousState.messages.map((m) =>
          m.id === id ? { ...m, isSend: true } : m
        ),
        authors: update(this.state.authors, {
          1: { isTyping: { $set: true } },
        }),
      }));
    }, 1000);
    setTimeout(() => {
      this.setState({
        authors: update(this.state.authors, {
          1: { isTyping: { $set: false } },
        }),
        messages: [
          ...this.state.messages,
          {
            authorId: 2,
            message: "SAMPLE BOT MESSAGE",
            createdOn: new Date(),
            isSend: true,
          },
        ],
        inputDisabled: false,
      });
    }, 2000);
  }

  render() {
    var history = "";
    return (
      <div className={styles.full}>
        <div className={styles.image}>
          <ChatBot />
        </div>

        <div className={styles.bottom}>
          <ChatFeed
            messages={this.state.messages} // Array: list of message objects
            authors={this.state.authors} // Array: list of authors
            yourAuthorId={1} // Number: Your author id (corresponds with id from list of authors)
            showIsTyping={true}
            className={styles.history}
          />
          <div className={styles.row}>
            <form
              onSubmit={(event) => {
                this.handleSubmit(event);
              }}
              className={styles.row}
            >
              <div className={cx("ui focus input", styles.textfield)}>
                <input
                  type="text"
                  disabled={this.state.inputDisabled}
                  placeholder="Enter your message here."
                  value={this.state.message}
                  onChange={(e) => this.onTodoChange(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={this.state.inputDisabled}
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
