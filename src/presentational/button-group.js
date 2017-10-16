// @flow

import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

type Props = { buttons: Array<number>, onClick: Function };

export default function(props: Props) {
  return (
    <ButtonGroup>
      {props.buttons.map((value, index) => {
        return (
          <Button
            bsSize="large"
            key={index}
            onClick={() => props.onClick(value)}
          >
            {value}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
