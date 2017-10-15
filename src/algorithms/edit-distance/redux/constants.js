// @flow

export const EDIT_DISTANCE_BUTTON_CLICK: string = "EDIT_DISTANCE_BUTTON_CLICK";

export const defaultStyle: string = "default";
export const goingStyle: string = "info";
export const successStyle: string = "success";
export const errorStyle: string = "danger";

export type State = {
  table: Array<Array<string | number>>,
  styles: Array<Array<string>>,
  +compared: Array<Array<number>>,
  buttons: Array<number>,
  row: number,
  col: number
};

export type Action = { type: string, value: number };
