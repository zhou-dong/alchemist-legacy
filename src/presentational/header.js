// @flow

import React from "react";

export type Props = {
  title: string,
  subTitle: string
};

export default (props: Props) => (
  <div>
    <header>
      <h1>
        {props.title}
        <small>{props.subTitle}</small>
      </h1>
    </header>
    <hr />
  </div>
);
