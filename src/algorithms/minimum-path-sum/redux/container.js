import { connect } from "react-redux";

import Table from "presentational/Table";
import Buttons from "presentational/Buttons";
import Dashboard from "presentational/Dashboard";
import Modal from "presentational/Modal";
import Header from "presentational/Header";

import { buttonClick, closeModal, openModal, refreshData } from "./actions";

export const createDataDisplay = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    table: state.minimumPathSumReducer.displayTable,
    styles: state.minimumPathSumReducer.displayTableStyles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createTable = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    table: state.minimumPathSumReducer.table,
    styles: state.minimumPathSumReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.minimumPathSumReducer.score,
    errors: state.minimumPathSumReducer.errors,
    steps: state.minimumPathSumReducer.steps
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
    buttons: state.minimumPathSumReducer.buttons
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
    showModal: state.minimumPathSumReducer.showModal,
    closeModal: state.minimumPathSumReducer.closeModal,
    modalTitle: state.minimumPathSumReducer.modalTitle,
    modalBody: state.minimumPathSumReducer.modalBody
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
    title: state.minimumPathSumReducer.title,
    openModal: state.minimumPathSumReducer.openModal,
    count: state.minimumPathSumReducer.count
  });
  const mapDispatchToProps = dispatch => {
    dispatch({ type: "GET_MINIMUM_PATH_SUM_COUNT" });
    return { openModal: () => dispatch(openModal()) };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
