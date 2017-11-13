import { createInitialState } from "../helper";

import testData from "../__mock__/word-break.json";

const initialState = createInitialState(testData.str);

export default (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return state;
    default:
      console.log("making progress...");
      console.log(state);
      return state;
  }
};
