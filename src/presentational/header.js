// @flow

import React from "react";
import { PageHeader } from "react-bootstrap";

export type Props = {
  title: string,
  subTitle: string
};

export default (props: Props) => (
  <PageHeader>
    {props.title}
    <small>{props.subTitle}</small>
  </PageHeader>
);
