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
    table: state.eggDroppingProblemReducer.table,
    styles: state.eggDroppingProblemReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.eggDroppingProblemReducer.score,
    errors: state.eggDroppingProblemReducer.errors,
    steps: state.eggDroppingProblemReducer.steps
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
    buttons: state.eggDroppingProblemReducer.buttons
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
    showModal: state.eggDroppingProblemReducer.showModal,
    closeModal: state.eggDroppingProblemReducer.closeModal,
    modalTitle: state.eggDroppingProblemReducer.modalTitle,
    modalBody: state.eggDroppingProblemReducer.modalBody
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
    title: state.eggDroppingProblemReducer.title,
    openModal: state.eggDroppingProblemReducer.openModal,
    count: state.eggDroppingProblemReducer.count
  });
  const mapDispatchToProps = dispatch => {
    dispatch({ type: "GET_EGG_DROPPING_PROBLEM_COUNT" });
    return { openModal: () => dispatch(openModal()) };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
