// @flow

import { connect } from "react-redux";

import Table from "presentational/Table";
import Buttons from "presentational/Buttons";
import Dashboard from "presentational/Dashboard";

import { buttonClick } from "./actions";

export const createTable = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    table: state.editDistanceReducer.table,
    styles: state.editDistanceReducer.styles
  });
  const mapDispatchToProps = dispatch => ({});
  return connect(mapStateToProps, mapDispatchToProps)(Table);
};

export const createButtons = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    buttons: state.editDistanceReducer.buttons
  });
  const mapDispatchToProps = dispatch => {
    return {
      onClick: buttonValue => {
        dispatch(buttonClick(buttonValue));
      }
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Buttons);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.editDistanceReducer.score,
    errors: state.editDistanceReducer.errors,
    steps: state.editDistanceReducer.steps
  });
  const mapDispatchToProps = dispatch => ({});
  return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
};
