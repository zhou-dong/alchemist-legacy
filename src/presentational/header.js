// @flow

import React from "react";
import { Glyphicon, Label } from "react-bootstrap";

export type Props = {
  title: string,
  openModal: Function,
  count: number
};

const getSuccessCount = (props: Props) => {
  const count = props && props.count;
  if (count) {
    return (
      <small>
        <Label bsStyle="success">
          <Glyphicon glyph="ok" />
          {count}
        </Label>
      </small>
    );
  }
};

export default (props: Props) => (
  <div>
    <header>
      <h1>
        <span>{props.title}&nbsp;</span>
        <small onClick={props.openModal}>
          <Label bsStyle="info">
            <Glyphicon glyph="question-sign" />
          </Label>&nbsp;
        </small>
        {getSuccessCount(props)}
      </h1>
    </header>
    <hr />
  </div>
);
