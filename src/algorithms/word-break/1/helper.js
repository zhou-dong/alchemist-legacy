import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

export const createInitialState = word => ({
  table: createDPTableWithIndicator(word),
  styles: createStyleTableWithIndicator(word)
});
