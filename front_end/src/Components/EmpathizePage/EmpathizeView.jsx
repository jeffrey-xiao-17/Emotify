import React, { Component } from "react";
import styles from "../../css/InteractionView.module.css";
import cx from "classnames";
import Avatar from "avataaars";
import { Button, Message } from "semantic-ui-react";
import { getText } from "./empathize";

import axios from 'axios';

class EmpathizeView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      avatarGenerator: props.avatarGenerator,
      avatar: props.avatarGenerator(),
      sourceText: "",
      link: "",
      inputText: "",
    };
    this.myRef = React.createRef();
    this.focus = this.focus.bind(this);
  }


  componentDidMount() {
    this.loadNewText();
  }

  async loadNewText() {
    const [sourceText, link] = await getText();
    this.setState({
      sourceText: sourceText,
      link: link,
    });
  }

    focus() {
        this.myRef.current.focus();
    }

  onTodoChange(value) {
    this.setState({
      inputText: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.message !== null && this.state.message !== "") {
      console.log("submitted");
    }
  }

  render() {
    return (
      <div className={styles.width}>
        <Message className={styles.quote}>
            <Message.Header>
                <h1><a href={this.state.link}>{this.state.title}</a></h1>
            </Message.Header>
          <p style={{ fontSize: "1.25rem" }}>{this.state.sourceText}</p>
        </Message>
        <div className={styles.window}>
          <Avatar
            className={cx("ui image", styles.avatar)}
            style={{
              maxHeight: "50vh",
              height: "100vh",
              width: "100%",
            }}
            avatarStyle="Transparent"
            topType={this.state.avatar.topType}
            accessoriesType={this.state.avatar.accessoriesType}
            hairColor={this.state.avatar.hairColor}
            hatColor={this.state.avatar.hatColor}
            facialHairType={this.state.avatar.facialHairType}
            clotheType={this.state.avatar.clotheType}
            clotheColor={this.state.avatar.clotheColor}
            skinColor={this.state.avatar.skinColor}
            eyeType={this.state.avatar.eyeType}
            eyebrowType={this.state.avatar.eyeType}
            mouthType={this.state.avatar.eyeType}
          />
        </div>
        <div className={styles.inputRow}>
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
                value={this.state.inputText}
                onChange={(e) => this.onTodoChange(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={this.state.inputDisabled}
                className={cx("ui primary button", styles.sendButton)}
                onClick={() => this.processText(this.state.inputText)}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmpathizeView;
