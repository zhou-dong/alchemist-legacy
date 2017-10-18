import { connect } from "react-redux";

import Table from "presentational/table";
import Buttons from "presentational/button-group";
import Dashboard from "presentational/dashboard";

import { buttonClick } from "./actions";

export const createTable = () => {
  const mapStateToProps = (state, ownProps) => {
    return {
      ...state,
      table: state.editDistanceReducer.table,
      styles: state.editDistanceReducer.styles
    };
  };
  const mapDispatchToProps = dispatch => {};
  return connect(mapStateToProps, mapDispatchToProps)(Table);
};

export const createButtons = () => {
  const mapStateToProps = (state, ownProps) => {
    return { ...state, buttons: state.editDistanceReducer.buttons };
  };
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
  const mapStateToProps = (state, ownProps) => {
    return {
      ...state,
      totalScore: state.editDistanceReducer.totalScore,
      currentScore: state.editDistanceReducer.currentScore,
      steps: state.editDistanceReducer.steps
    };
  };
  const mapDispatchToProps = dispatch => {};
  return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
};
