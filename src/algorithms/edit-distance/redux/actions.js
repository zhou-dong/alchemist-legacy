// @flow

import type { Action } from "./constants";
import {
  EDIT_DISTANCE_BUTTON_CLICK,
  CLOSE_MODAL_CLICK,
  OPEN_MODAL_CLICK
} from "./constants";

export const buttonClick = (value: number): Action => {
  return { type: EDIT_DISTANCE_BUTTON_CLICK, value };
};

export const closeModal = (): Action => {
  return { type: CLOSE_MODAL_CLICK, value: 0 };
};

export const openModal = (): Action => {
  return { type: OPEN_MODAL_CLICK, value: 0 };
};
