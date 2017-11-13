// @flow

export type Action = {
  type: string,
  payload: string
};

export const BUTTON_CLICK: string = "WORD_BREAK_I_BUTTON_CLICK";
export const OPEN_MODAL_CLICK: string = "WORD_BREAK_I_OPEN_MODAL_CLICK";
export const CLOSE_MODAL_CLICK: string = "WORD_BREAK_I_CLOSE_MODAL_CLICK";

export const buttonClick = (value: string): Action => ({
  type: BUTTON_CLICK,
  payload: value
});

export const closeModal = (): Action => ({
  type: CLOSE_MODAL_CLICK,
  payload: ""
});

export const openModal = (): Action => ({
  type: OPEN_MODAL_CLICK,
  payload: ""
});
