import React from "react";
import styles from "../../../css/HistoryView.module.css";
import {
  Grid,
  Message,
  Statistic,
  Card,
  Icon,
  Image,
  Button,
} from "semantic-ui-react";

function HistoryCell({ element }) {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="tiny"
          className={styles.pfp}
          src={element.src}
        />
        <Card.Header>{element.name}</Card.Header>
        <Card.Meta>Topic: {element.topic}</Card.Meta>
        <Card.Description>
          <Statistic.Group widths="two" size="tiny">
            <Statistic>
              <Statistic.Value>{element.score}</Statistic.Value>
              <Statistic.Label>You</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{element.simscore}</Statistic.Value>
              <Statistic.Label>{element.name}</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>{element.date}</Card.Content>
    </Card>
  );
}

export default HistoryCell;
