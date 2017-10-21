// @flow

import React from "react";

import "./css/table.css";

type rowProps = {
  row: Array<string | number>,
  styles: Array<string>
};

const Row = (props: rowProps) => (
  <tr>
    {props.row.map((item, index) => {
      return (
        <td key={index}>
          <div className={props.styles[index]}>{item}</div>
        </td>
      );
    })}
  </tr>
);

export type tableProps = {
  table: Array<Array<string | number>>,
  styles: Array<Array<string>>
};

export default (props: tableProps) => (
  <table>
    <tbody>
      {props.table.map((row, index) => {
        return <Row key={index} row={row} styles={props.styles[index]} />;
      })}
    </tbody>
  </table>
);
