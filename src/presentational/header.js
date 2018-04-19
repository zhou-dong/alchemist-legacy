// @flow

import React from "react";
import { Glyphicon } from "react-bootstrap";

export type Props = {
  title: string,
  openModal: Function
};

export default (props: Props) => (
  <div>
    <header>
      <h1>
        <small>
          <Glyphicon glyph="glyphicon-ok" />
        </small>
        {props.title}{" "}
        <small onClick={props.openModal}>
          <Glyphicon glyph="question-sign" />
        </small>
      </h1>
    </header>
    <hr />
  </div>
);
