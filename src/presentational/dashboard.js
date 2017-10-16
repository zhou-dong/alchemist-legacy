// @flow

import React from "react";
import { InputGroup, FormGroup, Glyphicon, ProgressBar } from "react-bootstrap";
import "./dashboard.css";

type Props = {
  totalScore: number,
  currentScore: number,
  steps: number
};

export default function(props: Props) {
  return (
    <form>
      <FormGroup controlId="formValidation2" validationState="success">
        <InputGroup>
          <InputGroup.Addon>STEPS</InputGroup.Addon>
          <InputGroup.Addon>{props.steps}</InputGroup.Addon>
          <InputGroup.Addon>
            <Glyphicon glyph="circle-arrow-up" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <ProgressBar
        bsStyle="success"
        now={props.currentScore / props.totalScore * 100}
        label={`${props.currentScore}`}
      />
    </form>
  );
}
