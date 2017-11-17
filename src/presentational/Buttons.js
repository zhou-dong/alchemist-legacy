// @flow

import React from "react";

type Props = { buttons: Array<number | string>, onClick: Function };

const tr = (props: Props, items: Array<number | string>) => (
  <tr>
    {items.map((value, index) => {
      return (
        <td key={index}>
          <button onClick={() => props.onClick(value)}>{value}</button>
        </td>
      );
    })}
  </tr>
);

const tbody = (props: Props) => {
  const maxLength = 10;
  if (props.buttons.length <= maxLength) {
    return <tbody>{tr(props, props.buttons)}</tbody>;
  } else {
    const half = Math.ceil(props.buttons.length / 2);
    return (
      <tbody>
        {tr(props, props.buttons.slice(0, half))}
        {tr(props, props.buttons.slice(half))}
      </tbody>
    );
  }
};

export default (props: Props) => <table>{props.buttons && tbody(props)}</table>;
