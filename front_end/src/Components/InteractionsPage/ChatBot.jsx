import React, { Component } from "react";
import styles from "../../css/ChatBot.module.css";
import cx from "classnames";
import Avatar from "avataaars";

class ChatBot extends Component {
  render() {
    const expressions =
      Math.abs(this.props.botSentiment - this.props.userSentiment) > 0.1
        ? computeOptions(
            1.5 * this.props.botSentiment + 0.5 * this.props.userSentiment
          )
        : {
            eye: this.props.bot.eyeType,
            eyebrow: this.props.bot.eyebrowType,
            mouth: this.props.bot.mouthType,
          };

    return (
      <div className={styles.window}>
        <Avatar
          className={cx("ui image", styles.avatar)}
          style={{
            maxHeight: "75vh",
            height: "100vh",
            width: "100vh",
          }}
          avatarStyle="Transparent"
          topType={this.props.bot.topType}
          accessoriesType={this.props.bot.accessoriesType}
          hairColor={this.props.bot.hairColor}
          hatColor={this.props.bot.hatColor}
          facialHairType={this.props.bot.facialHairType}
          clotheType={this.props.bot.clotheType}
          clotheColor={this.props.bot.clotheColor}
          skinColor={this.props.bot.skinColor}
          // The following three can change based on sentiment and words
          eyeType={expressions.eye}
          eyebrowType={expressions.eyebrow}
          mouthType={expressions.mouth}
        />
      </div>
    );
  }
}

export default ChatBot;
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

function computeOptions(s) {
  var index = -1;
  for (var i = 0; i < MOUTH_OPTIONS.length; i++) {
    if (s <= -0.9 + i * 0.2) {
      index = i;
      break;
    }
  }
  index = index == -1 ? 9 : index;
  var res = {
    eye: 0,
    eyebrow: 0,
    mouth: 0,
  };
  if (index == 0) {
    res.eye = EYE_OPTIONS[Math.round(Math.random(1))];
    res.eyebrow = EYEBROW_OPTIONS[Math.round(Math.random(1))];
    res.mouth = MOUTH_OPTIONS[Math.round(Math.random(1))];
  } else if (index == 9) {
    res.eye = EYE_OPTIONS[9 - Math.round(Math.random(1))];
    res.eyebrow = EYEBROW_OPTIONS[9 - Math.round(Math.random(1))];
    res.mouth = MOUTH_OPTIONS[9 - Math.round(Math.random(1))];
  } else {
    res.eye =
      EYE_OPTIONS[
        index +
          Math.floor(Math.random() + 0.5) *
            (Math.floor(Math.random() * 2) == 1 ? 1 : -1)
      ];
    res.eyebrow =
      EYEBROW_OPTIONS[
        index +
          Math.floor(Math.random() + 0.5) *
            (Math.floor(Math.random() * 2) == 1 ? 1 : -1)
      ];
    res.mouth =
      MOUTH_OPTIONS[
        index +
          Math.floor(Math.random() + 0.5) *
            (Math.floor(Math.random() * 2) == 1 ? 1 : -1)
      ];
  }
  return res;
}
