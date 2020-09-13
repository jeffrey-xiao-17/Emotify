import React, { Component } from "react";
import styles from "../../css/InteractionView.module.css";
import cx from "classnames";
import Avatar from "avataaars";
import { Message } from "semantic-ui-react";
import { getText, analyzeText } from "./empathize";

import axios from "axios";

const EYE_OPTIONS = [
  "Cry", // -1
  "Side", // -0.8
  "EyeRoll", // -0.6
  "Close", // -0.4
  "Squint", // -0.2
  "Default", // 0
  "WinkWacky", // 0.2
  "Wink", // 0.4
  "Surprised", // 0.6
  "Happy", // 0.8
  "Hearts", // 1
];

const EYEBROW_OPTIONS = [
  "Angry",
  "AngryNatural",
  "SadConcerned",
  "SadConcernedNatural",
  "Default",
  "DefaultNatural",
  "RaisedExcited",
  "RaisedExcitedNatural",
  "UpDown",
  "UpDownNatural",
];

const MOUTH_OPTIONS = [
  "ScreamOpen",
  "Concerned",
  "Sad",
  "Disbelief",
  "Serious",
  "Default",
  "Eating",
  "Twinkle",
  "Smile",
  "Tongue",
];

class EmpathizeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarGenerator: props.avatarGenerator,
      avatar: props.avatarGenerator(),
      sourceText: "",
      title: "",
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
    const [sourceText, title, link] = await getText();
    this.setState({
      sourceText: sourceText,
      title: title,
      link: link,
    });
    const data = await analyzeText(sourceText);
    const sentiment = data["sentimentResult"];
    const score = sentiment["documentSentiment"]["score"];
    const magnitude = sentiment["documentSentiment"]["magnitude"];
    console.log(data);
    console.log(score, magnitude);
    this.updateAvatar(score, magnitude);
    const entitySentiment = data["entitySentimentResult"];
  }

  updateAvatar(score, magnitude) {
    const avatar = this.state.avatar;

    // EYE
    var index = -1;
    for (var i = 0; i < EYE_OPTIONS.length; i++) {
      if (score <= -0.9 + i * 0.2) {
        index = i;
        break;
      }
    }
    index = index === -1 ? 9 : index;

    if (magnitude < 3) {
      index *= index < 0 ? 3.0 / 2 : 2.0 / 3;
    } else if (magnitude > 6) {
      index =
        index < 0
          ? Math.max(index * 2, 0)
          : Math.min(index * 2, EYE_OPTIONS.length - 1);
    }

    avatar.eyeType = EYE_OPTIONS[index];

    // EYEBROW
    index = -1;
    for (var i = 0; i < EYEBROW_OPTIONS.length; i++) {
      if (score <= -0.9 + i * 0.2) {
        index = i;
        break;
      }
    }
    index = index === -1 ? 9 : index;

    if (magnitude < 3) {
      index *= index < 0 ? 3.0 / 2 : 2.0 / 3;
    } else if (magnitude > 6) {
      index =
        index < 0
          ? Math.max(index * 2, 0)
          : Math.min(index * 2, EYEBROW_OPTIONS.length - 1);
    }

    avatar.eyebrowType = EYEBROW_OPTIONS[index];

    // MOUTH
    index = -1;
    for (var i = 0; i < MOUTH_OPTIONS.length; i++) {
      if (score <= -0.9 + i * 0.2) {
        index = i;
        break;
      }
    }
    index = index === -1 ? 9 : index;

    if (magnitude < 3) {
      index *= index < 0 ? 3.0 / 2 : 2.0 / 3;
    } else if (magnitude > 6) {
      index =
        index < 0
          ? Math.max(index * 2, 0)
          : Math.min(index * 2, MOUTH_OPTIONS.length - 1);
    }

    avatar.mouthType = MOUTH_OPTIONS[index];
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
            <h1>
              <a href={this.state.link}>{this.state.title}</a>
            </h1>
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
                placeholder="Continue the script in the author's tone. Pay particular attention to the author's emotion!"
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
