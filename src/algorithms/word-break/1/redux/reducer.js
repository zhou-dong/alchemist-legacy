import { createInitialState } from "../helper";

import type { Action } from "./actions";
import updateSteps from "./update-steps";
import { BUTTON_CLICK, OPEN_MODAL_CLICK, CLOSE_MODAL_CLICK } from "./actions";

import testData from "../__mock__/word-break.json";

const randomMockData = () => {
  const array = testData;
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

const initialState = () => {
  const data = randomMockData();
  return createInitialState(data.str, data.dict);
};

export default (state = initialState(), action: Action) => {
  switch (action.type) {
    case BUTTON_CLICK:
      return updateSteps(state, action);
    case OPEN_MODAL_CLICK:
      return { ...state, showModal: true };
    case CLOSE_MODAL_CLICK:
      return { ...state, showModal: false };
    default:
      return state;
  }
};
