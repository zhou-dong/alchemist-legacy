// @flow

import React from "react";

type Props = {
  score: number,
  errors: number,
  steps: number
};

export default (props: Props) => (
  <ul>
    <li>Score: {props.score}</li>
    <li>Steps: {props.steps}</li>
    <li>Errors: {props.errors}</li>
  </ul>
);
