// @flow

import type { Action } from "./constants";
import { EDIT_DISTANCE_BUTTON_CLICK } from "./constants";

export function buttonClick(value: number): Action {
  return { type: EDIT_DISTANCE_BUTTON_CLICK, value };
}
