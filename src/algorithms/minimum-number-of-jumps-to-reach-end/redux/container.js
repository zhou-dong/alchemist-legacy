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
    table: state.minimumNumberOfJumpsToReachEndReducer.table,
    styles: state.minimumNumberOfJumpsToReachEndReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.minimumNumberOfJumpsToReachEndReducer.score,
    errors: state.minimumNumberOfJumpsToReachEndReducer.errors,
    steps: state.minimumNumberOfJumpsToReachEndReducer.steps
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
    buttons: state.minimumNumberOfJumpsToReachEndReducer.buttons
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
    showModal: state.minimumNumberOfJumpsToReachEndReducer.showModal,
    closeModal: state.minimumNumberOfJumpsToReachEndReducer.closeModal,
    modalTitle: state.minimumNumberOfJumpsToReachEndReducer.modalTitle,
    modalBody: state.minimumNumberOfJumpsToReachEndReducer.modalBody
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
    title: state.minimumNumberOfJumpsToReachEndReducer.title,
    openModal: state.minimumNumberOfJumpsToReachEndReducer.openModal
  });
  const mapDispatchToProps = dispatch => ({
    openModal: () => {
      dispatch(openModal());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
