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
    table: state.longestPalindromicSubsequenceReducer.table,
    styles: state.longestPalindromicSubsequenceReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.longestPalindromicSubsequenceReducer.score,
    errors: state.longestPalindromicSubsequenceReducer.errors,
    steps: state.longestPalindromicSubsequenceReducer.steps
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
    buttons: state.longestPalindromicSubsequenceReducer.buttons
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
    showModal: state.longestPalindromicSubsequenceReducer.showModal,
    closeModal: state.longestPalindromicSubsequenceReducer.closeModal,
    modalTitle: state.longestPalindromicSubsequenceReducer.modalTitle,
    modalBody: state.longestPalindromicSubsequenceReducer.modalBody
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
    title: state.longestPalindromicSubsequenceReducer.title,
    openModal: state.longestPalindromicSubsequenceReducer.openModal,
    count: state.longestPalindromicSubsequenceReducer.count
  });
  const mapDispatchToProps = dispatch => {
    dispatch({ type: "GET_LONGEST_PALINDROMIC_SUBSEQUENCE_COUNT" });
    return { openModal: () => dispatch(openModal()) };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
