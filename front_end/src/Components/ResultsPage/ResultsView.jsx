import React, { Component } from "react";
import styles from "../../css/Results.module.css";
import { Grid, Message, Statistic } from "semantic-ui-react";

class ResultsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userScore: props.userScore,
      simScore: props.simScore,
    };
  }

  tipsAndTakeaways(diff) {
    if (diff <= -1) {
      return [
        "If possible, try to express positive emotions and relating to your partner's facial expression.",
        'Words like "enjoy," "awesome," and "ecstatic" are strong indicators of positive emotion.',
      ];
    } else if (diff <= -0.5) {
      return [
        "Keep it up! Understanding others at first glance is not easy - it takes time and practice!",
        "Listen to your partner when he/she talks. They are telling you more than just words!",
      ];
    } else if (diff <= 0) {
      return [
        "You're have a great grasp of your partner's emotional situation!",
        'Try to focus on your partner\'s eyes, mouth, and eyebrows to pick up subtle cues. Body language speaks the loudest in a conversation.Words like "enjoy," "awesome," and "ecstatic" are strong indicators of positive emotion.',
      ];
    } else if (diff <= 0.5) {
      return [
        "You're have a great grasp of your partner's emotional situation!",
        "Try to focus on your partner's eyes, mouth, and eyebrows to pick up subtle cues. Body language speaks the loudest in a conversation.",
      ];
    } else if (diff <= 1) {
      return [
        "Nice job! Every person you meet will be different - practice makes perfect!",
        "Listen to your partner when he/she talks. They are telling you more than just words!",
      ];
    }
    return [
      "If possible, try to put yourself in your partner's situation - how does that make you feel?",
      'Words like "fine," "sure," and "okay" are useful in leveling your\'s and your partner\'s emotions',
    ];
  }

  getScoreDescription(score) {
    if (score <= -0.5) {
      return [
        "You are often at odds with your partner's emotions.",
        "Possible causes are lack of attention and/or eye contact, negative language, or ignoring your partner.",
        "Example: Your partner is frowning and visibly upset. Your response is to downplay their situation or aggravate their emotional state.",
      ];
    } else if (score <= -0.2) {
      return [
        "There are subtle differences between you and your partner's emotions.",
        'Possible causes are using mild words such as "like," "sure," and "okay."',
        "Example: Your partner is ecstatic about a recent event. Your response is unengaging and does not match his/her intensity.",
      ];
    } else if (score <= 0.2) {
      return [
        "You have a great understanding of your partner's emotions. Keep doing what you're doing!",
        "A non-zero score could simply be a mathematical error. No need to worry - we need practice too!",
        "Example: You and your partner are on the same level. Think of your facial expression and theirs - they probably match!",
      ];
    } else if (score <= 0.5) {
      return [
        "There are subtle differences between you and your partner's emotions.",
        'Possible causes are using mild words such as "like," "sure," and "okay."',
        "Example: Your partner is worried about personal matters. Your response is unengaging and uninviting.",
      ];
    }
    return [
      "You are often at odds with your partner's emotions.",
      "Possible causes are lack of attention and/or eye contact, overly positive language, or ignoring your partner.",
      "Example: Your partner is frowning and visibly upset. Your response is to laugh at their situation or aggravate their emotional state.",
    ];
  }

  render() {
    return (
      <div>
        <div className={styles.width}>
          <Message
            className={styles.resultsMessage}
            style={{ textAlign: "center" }}
          >
            <Message.Header>
              <h1 style={{ fontSize: "40px" }}>Results</h1>
            </Message.Header>

            <Grid columns={2} relaxed="very" className={styles.columns}>
              <Grid.Column>
                <Statistic
                  label="Your Sentiment Score"
                  value={this.state.userScore}
                />
                {this.getScoreDescription(this.state.userScore).map(
                  (line, i) => {
                    return <p key={i}>{line}</p>;
                  }
                )}
              </Grid.Column>
              <Grid.Column>
                <Statistic
                  label="Sim's Sentiment Score"
                  value={this.state.simScore}
                />
                {this.getScoreDescription(this.state.simScore).map(
                  (line, i) => {
                    return <p key={i}>{line}</p>;
                  }
                )}
              </Grid.Column>
            </Grid>
          </Message>
        </div>
        <div className={styles.bottom}>
          <Message
            info
            icon="lightbulb outline"
            header="Care for a few tips and takeaways?"
            list={this.tipsAndTakeaways(
              parseFloat(this.state.userScore) - parseFloat(this.state.simScore)
            )}
          />
        </div>
      </div>
    );
  }
}

export default ResultsView;
