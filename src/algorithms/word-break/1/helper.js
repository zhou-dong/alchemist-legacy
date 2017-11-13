import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

const modalBody =
  "Given an input string and a dictionary of words, find out if the input string can be segmented into a space-separated sequence of dictionary words.";

export const createInitialState = word => ({
  table: createDPTableWithIndicator(word),
  styles: createStyleTableWithIndicator(word),
  score: word.length,
  steps: 0,
  errors: 0,
  buttons: ["TRUE", "FALSE"],
  title: "Word Break I",
  modalTitle: "Word Break I",
  modalBody: modalBody,
  showModal: false
});
