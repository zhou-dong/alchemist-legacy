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
    table: state.longestIncreasingSubsequenceIiReducer.table,
    styles: state.longestIncreasingSubsequenceIiReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.longestIncreasingSubsequenceIiReducer.score,
    errors: state.longestIncreasingSubsequenceIiReducer.errors,
    steps: state.longestIncreasingSubsequenceIiReducer.steps
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
    buttons: state.longestIncreasingSubsequenceIiReducer.buttons
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
    showModal: state.longestIncreasingSubsequenceIiReducer.showModal,
    closeModal: state.longestIncreasingSubsequenceIiReducer.closeModal,
    modalTitle: state.longestIncreasingSubsequenceIiReducer.modalTitle,
    modalBody: state.longestIncreasingSubsequenceIiReducer.modalBody
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
    title: state.longestIncreasingSubsequenceIiReducer.title,
    openModal: state.longestIncreasingSubsequenceIiReducer.openModal
  });
  const mapDispatchToProps = dispatch => ({
    openModal: () => {
      dispatch(openModal());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
