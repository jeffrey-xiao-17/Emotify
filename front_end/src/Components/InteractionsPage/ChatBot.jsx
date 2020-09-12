import React, { Component } from "react";
import styles from "../../css/ChatBot.module.css";
import cx from "classnames";
import Avatar from "avataaars";

class ChatBot extends Component {
  render() {
    return (
      <div className={styles.window}>
        <Avatar
          // style={{ width: "100px", height: "100px" }}
          className={cx("ui image", styles.avatar)}
          style={{
            maxWidth: "75vh",
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
          eyeType={this.props.bot.eyeType}
          eyebrowType={this.props.bot.eyebrowType}
          mouthType={this.props.bot.mouthType}
          skinColor={this.props.bot.skinColor}
        />
        {/* <img
          src="https://react.semantic-ui.com/images/wireframe/image.png"
          className={cx("ui image", styles.avatar)}
          alt="placeholder"
        /> */}
      </div>
    );
  }
}

export default ChatBot;
