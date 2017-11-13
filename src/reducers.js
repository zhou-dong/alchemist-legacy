import { combineReducers } from "redux";
import editDistanceReducer from "algorithms/edit-distance/redux/reducer";

import wordBreadIReducer from "algorithms/word-break/1/redux/reducer";

export default combineReducers({
  editDistanceReducer,
  wordBreadIReducer
});
