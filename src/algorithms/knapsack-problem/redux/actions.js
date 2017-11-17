// @flow

export type Action = {
  type: string,
  payload?: number
};

export const BUTTON_CLICK: string = "KNAPSACK_PROBLEM_I_BUTTON_CLICK";
export const OPEN_MODAL_CLICK: string = "KNAPSACK_PROBLEM_OPEN_MODAL_CLICK";
export const CLOSE_MODAL_CLICK: string = "KNAPSACK_PROBLEM_CLOSE_MODAL_CLICK";
export const REFRESH_CLICK: string = "KNAPSACK_PROBLEM_REFRESH_CLICK";

export const refreshClick = (): Action => ({ type: REFRESH_CLICK });
export const closeModal = (): Action => ({ type: CLOSE_MODAL_CLICK });
export const openModal = (): Action => ({ type: OPEN_MODAL_CLICK });

export const buttonClick = (value: number): Action => ({
  type: BUTTON_CLICK,
  payload: value
});
