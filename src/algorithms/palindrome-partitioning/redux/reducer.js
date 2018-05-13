import type { Action } from "./actions";
import updateSteps from "./update-steps";
import {
  BUTTON_CLICK,
  OPEN_MODAL_CLICK,
  CLOSE_MODAL_CLICK,
  REFRESH_DATA_CLICK
} from "./actions";

import createInitialState from "../helper";

export default (state = createInitialState(), action: Action) => {
  switch (action.type) {
    case BUTTON_CLICK:
      return updateSteps(state, action);
    case OPEN_MODAL_CLICK:
      return { ...state, showModal: true };
    case CLOSE_MODAL_CLICK:
      return { ...state, showModal: false };
    case REFRESH_DATA_CLICK:
      return createInitialState(state);
    case "RECEIVED_PALINDROME_PARTITION_COUNT": {
      const count = action.record.count || 0;
      return { ...state, count: count };
    }
    default:
      return state;
  }
};
