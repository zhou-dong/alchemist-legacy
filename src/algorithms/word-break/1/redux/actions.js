// @flow

export type Action = {
  type: string,
  payload?: string
};

export const BUTTON_CLICK: string = "WORD_BREAK_I_BUTTON_CLICK";
export const OPEN_MODAL_CLICK: string = "WORD_BREAK_I_OPEN_MODAL_CLICK";
export const CLOSE_MODAL_CLICK: string = "WORD_BREAK_I_CLOSE_MODAL_CLICK";
export const REFRESH_CLICK: string = "WORD_BREAK_I_REFRESH_CLICK";

export const refreshClick = (): Action => ({ type: REFRESH_CLICK });
export const closeModal = (): Action => ({ type: CLOSE_MODAL_CLICK });
export const openModal = (): Action => ({ type: OPEN_MODAL_CLICK });

export const buttonClick = (value: string): Action => ({
  type: BUTTON_CLICK,
  payload: value
});
