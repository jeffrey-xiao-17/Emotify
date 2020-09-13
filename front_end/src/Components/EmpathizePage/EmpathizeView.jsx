import React, { Component } from "react";
import styles from "../../css/InteractionView.module.css";
import cx from "classnames";
import Avatar from "avataaars";
import { Message } from "semantic-ui-react";
import { getText, analyzeText } from "./empathize";
import Confetti from "react-dom-confetti";

import axios from "axios";

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
  static THRESHOLD = 0.2;
  constructor(props) {
    super(props);

    this.state = {
      avatarGenerator: props.avatarGenerator,
      avatar: props.avatarGenerator(),
      sourceText: "",
      title: "",
      link: "",
      inputText: "",
      sourceTextSentiment: 0,
      inputTextSentiment: 0,
      finished: false,
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
      sourceTextSentiment: (await analyzeText(sourceText)).sentimentResult
        .documentSentiment.score,
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
    for (i = 0; i < EYEBROW_OPTIONS.length; i++) {
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
    for (i = 0; i < MOUTH_OPTIONS.length; i++) {
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

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.inputText !== null && this.state.inputText !== "") {
      const res = (await analyzeText(this.state.inputText)).sentimentResult
        .documentSentiment.score;
      if (
        Math.abs(
          parseFloat(res) - parseFloat(this.state.sourceTextSentiment)
        ) <= EmpathizeView.THRESHOLD
      ) {
        this.setState({
          inputTextSentiment: parseFloat(res),
          finished: true,
        });
      }
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
                disabled={this.state.finished}
                placeholder="Continue the script in the author's tone. Pay particular attention to the author's emotion!"
                value={this.state.inputText}
                onChange={(e) => this.onTodoChange(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={this.state.finished}
                className={cx("ui primary button", styles.sendButton)}
              >
                Send
              </button>
            </div>
          </form>
        </div>
        <Confetti
          active={this.state.finished}
          config={config}
          style={{ textAlign: "center" }}
        />
      </div>
    );
  }
}

export default EmpathizeView;
