// @flow

export const EDIT_DISTANCE_BUTTON_CLICK: string = "EDIT_DISTANCE_BUTTON_CLICK";

export const DEFAULT_STYLE: string = "default";
export const ON_GOING_STYLE: string = "info";
export const SUCCESS_STYLE: string = "success";
export const ERROR_STYLE: string = "danger";
export const INDICATE_STYLE: string = "warning";

export type State = {
  table: Array<Array<string | number>>,
  styles: Array<Array<string>>,
  +compared: Array<Array<number>>,
  buttons: Array<number>,
  row: number,
  col: number
};

export type Action = { type: string, value: number };
