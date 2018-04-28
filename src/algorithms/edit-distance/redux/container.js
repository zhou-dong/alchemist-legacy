// @flow

import { connect } from "react-redux";

import Table from "presentational/Table";
import Buttons from "presentational/Buttons";
import Dashboard from "presentational/Dashboard";
import Modal from "presentational/Modal";
import Header from "presentational/Header";

import { buttonClick, closeModal, openModal, refreshClick } from "./actions";

export const createTable = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    table: state.editDistanceReducer.table,
    styles: state.editDistanceReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createButtons = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    buttons: state.editDistanceReducer.buttons
  });
  const mapDispatchToProps = dispatch => ({
    onClick: buttonValue => {
      dispatch(buttonClick(buttonValue));
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Buttons);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.editDistanceReducer.score,
    errors: state.editDistanceReducer.errors,
    steps: state.editDistanceReducer.steps
  });
  const mapDispatchToProps = dispatch => ({
    onClick: () => {
      dispatch(refreshClick());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
};

export const createModal = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    showModal: state.editDistanceReducer.showModal,
    closeModal: state.editDistanceReducer.closeModal,
    modalTitle: state.editDistanceReducer.modalTitle,
    modalBody: state.editDistanceReducer.modalBody
  });
  const mapDispatchToProps = dispatch => ({
    closeModal: () => {
      dispatch(closeModal());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Modal);
};

export const createHeader = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    title: state.editDistanceReducer.title,
    openModal: state.editDistanceReducer.openModal,
    count: state.editDistanceReducer.count
  });
  const mapDispatchToProps = dispatch => {
    dispatch({ type: "GET_EDIT_DISTANCE_COUNT" });
    return { openModal: () => dispatch(openModal()) };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
