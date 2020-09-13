import React from "react";
import styles from "../../css/HistoryView.module.css";
import HistoryCell from "./components/HistoryCell";

import { Message, Card } from "semantic-ui-react";
import { Line } from "react-chartjs-2";

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

  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Correlation",
        data: [],
        backgroundColor: ["#68C3D4"],
        pointRadius: 1,
        pointHitRadius: 10,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
      },
    ],
  };
  tempData.forEach((entry) => {
    chartData.labels.push(entry.date);
    chartData.datasets[0].data.push(entry.score - entry.simscore);
  });

  return (
    <div className={styles.mainContainer}>
      <Message className={styles.message} style={{ textAlign: "center" }}>
        <Message.Header>
          <h1 style={{ fontSize: "40px" }}>Interaction History</h1>
        </Message.Header>
        <br />
        <br />
        <Card className={styles.chartCard} style={{ margin: "auto" }}>
          <Line
            data={chartData}
            width={500}
            height={250}
            options={{ maintainAspectRatio: false }}
          />
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
