// @flow

import React from "react";
import { ProgressBar, Grid, Row, Col, Button } from "react-bootstrap";

import "./css/dashboard.css";

type Props = {
  totalScore: number,
  currentScore: number,
  steps: number
};

export default (props: Props) => (
  <form>
    <Grid>
      <Row className="show-grid">
        <Col xs={9} md={10}>
          <ProgressBar
            bsStyle="success"
            now={props.currentScore / props.totalScore * 100}
            label={`${props.currentScore}`}
          />
        </Col>
        <Col xs={3} md={2}>
          <Button bsSize="xsmall">STEPS: {props.steps}</Button>
        </Col>
      </Row>
    </Grid>
  </form>
);
