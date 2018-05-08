// @flow

import React from "react";
import { Glyphicon } from "react-bootstrap";

type Props = {
  score: number,
  errors: number,
  steps: number,
  onClick: Function
};

export default (props: Props) => (
  <ul>
    <li>Score: {props.score}</li>
    <li>Steps: {props.steps}</li>
    <li>Errors: {props.errors}</li>
    <li>
      <Glyphicon glyph="repeat" onClick={props.onClick} />
    </li>
  </ul>
);
