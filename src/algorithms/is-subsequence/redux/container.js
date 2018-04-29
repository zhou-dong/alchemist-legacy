import { connect } from "react-redux";

import Table from "presentational/Table";
import Buttons from "presentational/Buttons";
import Dashboard from "presentational/Dashboard";
import Modal from "presentational/Modal";
import Header from "presentational/Header";

import { buttonClick, closeModal, openModal, refreshData } from "./actions";

export const createTable = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    table: state.isSubsequenceReducer.table,
    styles: state.isSubsequenceReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.isSubsequenceReducer.score,
    errors: state.isSubsequenceReducer.errors,
    steps: state.isSubsequenceReducer.steps
  });
  const mapDispatchToProps = dispatch => ({
    onClick: () => {
      dispatch(refreshData());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
};

export const createButtons = () => {
  const mapStateToProps = state => ({
    ...state,
    buttons: state.isSubsequenceReducer.buttons
  });
  const mapDispatchToProps = dispatch => ({
    onClick: buttonValue => {
      dispatch(buttonClick(buttonValue));
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Buttons);
};

export const createModal = () => {
  const mapStateToProps = state => ({
    ...state,
    showModal: state.isSubsequenceReducer.showModal,
    closeModal: state.isSubsequenceReducer.closeModal,
    modalTitle: state.isSubsequenceReducer.modalTitle,
    modalBody: state.isSubsequenceReducer.modalBody
  });
  const mapDispatchToProps = dispatch => ({
    closeModal: () => {
      dispatch(closeModal());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Modal);
};

export const createHeader = () => {
  const mapStateToProps = state => ({
    ...state,
    title: state.isSubsequenceReducer.title,
    openModal: state.isSubsequenceReducer.openModal,
    count: state.isSubsequenceReducer.count
  });
  const mapDispatchToProps = dispatch => {
    dispatch({ type: "GET_IS_SUBSEQUENCE_COUNT" });
    return { openModal: () => dispatch(openModal()) };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
