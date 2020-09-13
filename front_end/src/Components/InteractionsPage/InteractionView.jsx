import React, { Component } from "react";
import styles from "../../css/InteractionView.module.css";
import cx from "classnames";
// Components
import ChatBot from "./ChatBot";
import { ChatFeed } from "react-bell-chat";
import { Button, Statistic, Popup, Icon, Message } from "semantic-ui-react";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import Confetti from "react-dom-confetti";

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 85,
  elementCount: "149",
  dragFriction: "0.11",
  duration: 3000,
  stagger: 3,
  width: "63px",
  height: "100px",
  perspective: "1000px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

class InteractionView extends Component {
  static config = {
    dictionaries: [names],
  };
  constructor(props) {
    super(props);
    const target = Math.random();
    var current =
      (Math.floor(Math.random() * 2) === 1 ? 1 : -1) * Math.random();
    while (parseFloat(target) - parseFloat(current) < 0.4) {
      current = (Math.floor(Math.random() * 2) === 1 ? 1 : -1) * Math.random();
    }

    this.state = {
      generatedBotProps: props.avatarGenerator(),
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
          name: uniqueNamesGenerator(InteractionView.config),
          isTyping: false,
        },
      ],
      idCount: 1,
      inputDisabled: false,
      currentSentiment: parseFloat(current).toFixed(1),
      targetSentiment: parseFloat(target).toFixed(1),
      messagesRemaining: parseInt(Math.random() * 3 + 1, 10),
    };
    this.myRef = React.createRef();
    this.focus = this.focus.bind(this);
  }

  focus() {
    this.myRef.current.focus();
  }

  onTodoChange(value) {
    this.setState({
      message: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.message !== null && this.state.message !== "") {
      const justSent = this.state.message;
      const prevRemaining = this.state.messagesRemaining;
      const prevSentiment = parseFloat(this.state.currentSentiment);
      const newSentiment = this.computeNewSentiment(prevSentiment, 0.4);
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
        currentSentiment: newSentiment,
        messagesRemaining: this.state.messagesRemaining - 1,
      });
      setTimeout(() => {
        this.setState((previousState) => ({
          messages: previousState.messages.map((m) =>
            m.id === this.state.idCount - 1 ? { ...m, isSend: true } : m
          ),
        }));
      }, 500);

      if (
        newSentiment.toFixed(1) >=
        parseFloat(this.state.targetSentiment).toFixed(1)
      ) {
        this.setState({ inputDisabled: true });
        console.log("WINNER");
      }

      if (prevRemaining === 1) {
        this.setState({ inputDisabled: true });
      }
      this.focus();
    }
  }

  computeNewSentiment(prevSentiment, messageSentiment) {
    var res = parseFloat(prevSentiment) + parseFloat(messageSentiment);
    if (res > 1) {
      res = 1;
    } else if (res < -1) {
      res = -1;
    }
    return parseFloat(res.toFixed(1));
  }

  resetState() {
    const target = Math.random();
    var current =
      (Math.floor(Math.random() * 2) === 1 ? 1 : -1) * Math.random();
    while (parseFloat(target) - parseFloat(current) < 0.4) {
      current = (Math.floor(Math.random() * 2) === 1 ? 1 : -1) * Math.random();
    }
    this.setState({
      generatedBotProps: this.props.avatarGenerator(),
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
          name: uniqueNamesGenerator(InteractionView.config),
          isTyping: false,
        },
      ],
      currentSentiment: parseFloat(current).toFixed(1),
      targetSentiment: parseFloat(target).toFixed(1),
      messagesRemaining: parseInt(Math.random() * 3 + 1, 10),
      idCount: 1,
      inputDisabled: false,
    });
  }

  render() {
    return (
      <div className={styles.full}>
        <Popup
          trigger={
            <div className={styles.gameNumbers}>
              <Statistic.Group>
                <Statistic>
                  <Statistic.Value>
                    {this.state.currentSentiment}
                  </Statistic.Value>
                  <Statistic.Label>Current Mood</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>
                    {this.state.targetSentiment}
                  </Statistic.Value>
                  <Statistic.Label>Target Mood</Statistic.Label>
                </Statistic>
              </Statistic.Group>
              <Statistic.Group>
                <Statistic
                  label="Messages Remaining"
                  value={this.state.messagesRemaining}
                />
              </Statistic.Group>
            </div>
          }
        >
          <Popup.Header>
            {this.state.inputDisabled
              ? parseFloat(this.state.currentSentiment) >=
                parseFloat(this.state.targetSentiment)
                ? "Hooray!"
                : "Next Time!"
              : "Confused?"}
          </Popup.Header>
          <Popup.Content>
            {this.state.inputDisabled
              ? parseFloat(this.state.currentSentiment) >=
                parseFloat(this.state.targetSentiment)
                ? `Great work! You managed to bring ${this.state.authors[1].name}'s mood up to ${this.state.currentSentiment}!`
                : `Sadly, ${this.state.authors[1].name}'s mood was still ${
                    parseFloat(this.state.targetSentiment) -
                    parseFloat(this.state.currentSentiment)
                  } short from the goal.`
              : `With the ${this.state.messagesRemaining} messages you have remaining, 
                    try to bring ${this.state.authors[1].name}'s mood up from 
                    ${this.state.currentSentiment} to ${this.state.targetSentiment}!`}
          </Popup.Content>
        </Popup>
        <div className={styles.image}>
          <ChatBot
            bot={this.state.generatedBotProps}
            currentSentiment={this.state.currentSentiment}
          />
        </div>

        <div className={styles.bottom}>
          <ChatFeed
            messages={this.state.messages}
            authors={this.state.authors}
            yourAuthorId={1}
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
                  ref={this.myRef}
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
            <Button
              positive
              className={styles.newButton}
              onClick={() => this.resetState()}
            >
              Meet Someone New!
            </Button>
          </div>
        </div>
        <Confetti
          active={
            this.state.inputDisabled &&
            parseFloat(this.state.currentSentiment) >=
              parseFloat(this.state.targetSentiment)
          }
          config={config}
          style={{ textAlign: "center" }}
        />
      </div>
    );
  }
}

export default InteractionView;
