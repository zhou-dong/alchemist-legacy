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
    table: state.longestPalindromicSubstringReducer.table,
    styles: state.longestPalindromicSubstringReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.longestPalindromicSubstringReducer.score,
    errors: state.longestPalindromicSubstringReducer.errors,
    steps: state.longestPalindromicSubstringReducer.steps
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
    buttons: state.longestPalindromicSubstringReducer.buttons
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
    showModal: state.longestPalindromicSubstringReducer.showModal,
    closeModal: state.longestPalindromicSubstringReducer.closeModal,
    modalTitle: state.longestPalindromicSubstringReducer.modalTitle,
    modalBody: state.longestPalindromicSubstringReducer.modalBody
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
    title: state.longestPalindromicSubstringReducer.title,
    openModal: state.longestPalindromicSubstringReducer.openModal,
    count: state.longestPalindromicSubstringReducer.count
  });
  const mapDispatchToProps = dispatch => {
    dispatch({ type: "GET_LONGEST_PALINDROMIC_SUBSTRING_COUNT" });
    return { openModal: () => dispatch(openModal()) };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
