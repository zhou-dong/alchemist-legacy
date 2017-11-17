// @flow

import type { Action } from "./constants";
import {
  EDIT_DISTANCE_BUTTON_CLICK,
  CLOSE_MODAL_CLICK,
  OPEN_MODAL_CLICK,
  REFRESH_CLICK
} from "./constants";

export const refreshClick = (): Action => ({ type: REFRESH_CLICK, payload: 0 });
export const openModal = (): Action => ({ type: OPEN_MODAL_CLICK, payload: 0 });

export const closeModal = (): Action => ({
  type: CLOSE_MODAL_CLICK,
  payload: 0
});

export const buttonClick = (value: number): Action => ({
  type: EDIT_DISTANCE_BUTTON_CLICK,
  payload: value
});
