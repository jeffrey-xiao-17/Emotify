import React from "react";
import styles from "../../css/HistoryView.module.css";
import HistoryCell from "./components/HistoryCell";

import { Message, Card } from "semantic-ui-react";

function HistoryView() {


  const tempData = [
    {
      date: "October 12, 2020",
      name: "Steve",
      topic: "Apple",
      score: 7,
      simscore: 6,
      src: "https://react.semantic-ui.com/images/avatar/large/steve.jpg",
    },
    {
      date: "October 13, 2020",
      name: "Molly",
      topic: "The Big Bang",
      score: 8,
      simscore: 9,
      src: "https://react.semantic-ui.com/images/avatar/large/molly.png",
    },
    {
      date: "October 14, 2020",
      name: "Jenny",
      topic: "Football",
      score: 9,
      simscore: 5,
      src: "https://react.semantic-ui.com/images/avatar/large/jenny.jpg",
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <Message className={styles.message} style={{ textAlign: "center" }}>
        <Message.Header>
          <h1 style={{ fontSize: "40px" }}>Interaction History</h1>
        </Message.Header>
        <br />
        <br />
        <Card style={{ margin: "auto" }}>
          <Card.Content description={"GRAPH GOES HERE"} />
          <Card.Content description={"GRAPH GOES HERE"} />
          <Card.Content description={"GRAPH GOES HERE"} />
        </Card>
        <br />
        <Card.Group className={styles.historyCards}>
          {tempData.map((element) => (
            <HistoryCell element={element} />
          ))}
        </Card.Group>
      </Message>
                 
    </div>
  );
}

export default HistoryView;
