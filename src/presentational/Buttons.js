// @flow

import React from "react";

type Props = { buttons: Array<number>, onClick: Function };

export default (props: Props) => (
  <table>
    <tbody>
      <tr>
        {props.buttons &&
          props.buttons.map((value, index) => {
            return (
              <td key={index}>
                <button onClick={() => props.onClick(value)}>{value}</button>
              </td>
            );
          })}
      </tr>
    </tbody>
  </table>
);
