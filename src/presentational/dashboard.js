// @flow

import React from "react";
import {
  ProgressBar,
  Grid,
  Row,
  Col,
  Button
} from "react-bootstrap";
import "./dashboard.css";

type Props = {
  totalScore: number,
  currentScore: number,
  steps: number
};

export default function(props: Props) {
  return (
    <form>
      <Grid>
        <Row className="show-grid">
          <Col xs={8} sm={10}>
            <ProgressBar
              bsStyle="success"
              now={props.currentScore / props.totalScore * 100}
              label={`${props.currentScore}`}
            />
          </Col>
          <Col xs={4} sm={2}>
              <Button>STEPS: {props.steps}</Button>
          </Col>
        </Row>
      </Grid>
    </form>
  );
}
