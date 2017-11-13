// @flow

export const EDIT_DISTANCE_BUTTON_CLICK: string = "EDIT_DISTANCE_BUTTON_CLICK";
export const CLOSE_MODAL_CLICK: string = "CLOSE_MODAL_CLICK";
export const OPEN_MODAL_CLICK: string = "OPEN_MODAL_CLICK";

export type State = {
  table: Array<Array<string | number>>,
  styles: Array<Array<string>>,
  compared: Array<Array<number>>,
  buttons: Array<number>,
  row: number,
  col: number,
  score: number,
  errors: number,
  steps: number
};

export type Action = {
  type: string,
  value: number
};
