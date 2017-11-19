// @flow

import React from "react";

type Props = { buttons: Array<number | string>, onClick: Function };

const tr = (props: Props, items: Array<number | string>, rowKey: number) => (
  <tr key={rowKey}>
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
  const rowLength = 7;
  const table: Array<Array<number | string>> = [];
  for (let start = 0; start < props.buttons.length; start += rowLength) {
    table.push(props.buttons.slice(start, start + rowLength));
  }
  return <tbody>{table.map((row, index) => tr(props, row, index))}</tbody>;
};

export default (props: Props) => <table>{props.buttons && tbody(props)}</table>;
