// @flow

import { connect } from "react-redux";

import Table from "presentational/Table";
import Buttons from "presentational/Buttons";
import Dashboard from "presentational/Dashboard";
import Modal from "presentational/Modal";
import Header from "presentational/Header";

import { buttonClick, closeModal, openModal, refreshClick } from "./actions";

export const createTable = () => {
  const mapStateToProps = state => ({
    ...state,
    table: state.wordBreadIReducer.table,
    styles: state.wordBreadIReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createButtons = () => {
  const mapStateToProps = state => ({
    ...state,
    buttons: state.wordBreadIReducer.buttons
  });
  const mapDispatchToProps = dispatch => ({
    onClick: buttonValue => {
      dispatch(buttonClick(buttonValue));
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Buttons);
};

export const createModal = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    showModal: state.wordBreadIReducer.showModal,
    closeModal: state.wordBreadIReducer.closeModal,
    modalTitle: state.wordBreadIReducer.modalTitle,
    modalBody: state.wordBreadIReducer.modalBody
  });
  const mapDispatchToProps = dispatch => ({
    closeModal: () => {
      dispatch(closeModal());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Modal);
};

export const createDashboard = () => {
  const mapStateToProps = state => ({
    ...state,
    score: state.wordBreadIReducer.score,
    errors: state.wordBreadIReducer.errors,
    steps: state.wordBreadIReducer.steps
  });
  const mapDispatchToProps = dispatch => ({
    onClick: () => {
      dispatch(refreshClick());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
};

export const createHeader = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    title: state.wordBreadIReducer.title,
    openModal: state.wordBreadIReducer.openModal,
    count: state.wordBreadIReducer.count
  });
  const mapDispatchToProps = dispatch => {
    dispatch({ type: "GET_WORD_BREAK_ONE_COUNT" });
    return { openModal: () => dispatch(openModal()) };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};

export const createDictionary = () => {
  const mapStateToProps = state => ({
    ...state,
    buttons: state.wordBreadIReducer.dictionary
  });
  const mapDispatchToProps = dispatch => ({
    onClick: () => {}
  });
  return connect(mapStateToProps, mapDispatchToProps)(Buttons);
};
