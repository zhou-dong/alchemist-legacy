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
    table: state.palindromePartitioningReducer.table,
    styles: state.palindromePartitioningReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.palindromePartitioningReducer.score,
    errors: state.palindromePartitioningReducer.errors,
    steps: state.palindromePartitioningReducer.steps
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
    buttons: state.palindromePartitioningReducer.buttons
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
    showModal: state.palindromePartitioningReducer.showModal,
    closeModal: state.palindromePartitioningReducer.closeModal,
    modalTitle: state.palindromePartitioningReducer.modalTitle,
    modalBody: state.palindromePartitioningReducer.modalBody
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
    title: state.palindromePartitioningReducer.title,
    openModal: state.palindromePartitioningReducer.openModal
  });
  const mapDispatchToProps = dispatch => ({
    openModal: () => {
      dispatch(openModal());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
