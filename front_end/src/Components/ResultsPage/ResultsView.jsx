import React, { Component } from "react";
import styles from "../../css/Results.module.css";
import { Grid, Message } from "semantic-ui-react";

class ResultsView extends Component {
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
                <h1 style={{ fontSize: "35px" }}>3.1</h1>
                <h3>Your Sentiment Score</h3>
                <p>What is “Your Sentiment Score?”</p>
                <p>What does this score mean?</p>
                <p>What are possible causes of this score?</p>
                <p>Examples?</p>
              </Grid.Column>
              <Grid.Column>
                <h1 style={{ fontSize: "35px" }}>7.7</h1>
                <h3>Sim's Sentiment Score</h3>
                <p>What is “Your Sentiment Score?”</p>
                <p>What does this score mean?</p>
                <p>What are possible causes of this score?</p>
                <p>Examples?</p>
              </Grid.Column>
            </Grid>
          </Message>
        </div>
        <div className={styles.bottom}>
          <Message
            info
            icon="lightbulb outline"
            header="Care for a few tips and takeaways?"
            list={["Tip number 1", "Tip number 2"]}
          />
        </div>
      </div>
    );
  }
}

export default ResultsView;
