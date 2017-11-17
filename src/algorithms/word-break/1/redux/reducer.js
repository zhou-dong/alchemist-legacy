import createInitialState from "../helper";

import type { Action } from "./actions";
import updateSteps from "./update-steps";
import {
  BUTTON_CLICK,
  OPEN_MODAL_CLICK,
  CLOSE_MODAL_CLICK,
  REFRESH_CLICK
} from "./actions";

export default (state = createInitialState(), action: Action) => {
  switch (action.type) {
    case BUTTON_CLICK:
      return updateSteps(state, action);
    case OPEN_MODAL_CLICK:
      return { ...state, showModal: true };
    case CLOSE_MODAL_CLICK:
      return { ...state, showModal: false };
    case REFRESH_CLICK:
      return createInitialState();
    default:
      return state;
  }
};
