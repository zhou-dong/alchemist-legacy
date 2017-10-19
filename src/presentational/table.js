// @flow

import React from "react";
import { Table, Button } from "react-bootstrap";

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
          <Button
            className="table-btn"
            bsStyle={props.styles[index]}
            bsSize="large"
          >
            {item}
          </Button>
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
  <Table bordered={false} condensed={false}>
    <tbody>
      {props.table.map((row, index) => {
        return <Row key={index} row={row} styles={props.styles[index]} />;
      })}
    </tbody>
  </Table>
);
