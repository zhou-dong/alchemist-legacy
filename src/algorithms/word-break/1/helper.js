import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

const modalBody =
  "Given an input string and a dictionary of words, find out if the input string can be segmented into a space-separated sequence of dictionary words.";

const createDictionary = dictionary => {
  dictionary.unshift("Dictionary:");
  return dictionary;
};

export const createInitialState = (word, dictionary) => ({
  table: createDPTableWithIndicator(word),
  styles: createStyleTableWithIndicator(word),
  score: word.length,
  steps: 0,
  errors: 0,
  buttons: ["TRUE", "FALSE"],
  title: "Word Break I",
  modalTitle: "Word Break I",
  modalBody: modalBody,
  showModal: false,
  dictionary: createDictionary(dictionary),
  row: 2,
  col: 2,
  len: 1
});
