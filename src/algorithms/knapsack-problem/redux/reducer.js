import type { Action } from "./actions";
import updateSteps from "./update-steps";
import { BUTTON_CLICK, OPEN_MODAL_CLICK, CLOSE_MODAL_CLICK } from "./actions";

import createInitialState from "../helper";

export default (state = createInitialState(), action: Action) => {
  switch (action.type) {
    case BUTTON_CLICK:
      console.log(action);
      return state;
    case OPEN_MODAL_CLICK:
      return { ...state, showModal: true };
    case CLOSE_MODAL_CLICK:
      return { ...state, showModal: false };
    default:
      return state;
  }
};
