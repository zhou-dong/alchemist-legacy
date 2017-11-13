// @flow

import { connect } from "react-redux";

import Table from "presentational/Table";
import Buttons from "presentational/Buttons";
import Dashboard from "presentational/Dashboard";

export const createTable = () => {
  const mapStateToProps = state => ({
    ...state,
    table: state.wordBreadIReducer.table,
    styles: state.wordBreadIReducer.styles
  });
  const mapDispatchToProps = dispatch => ({});
  return connect(mapStateToProps, mapDispatchToProps)(Table);
};

export const createButtons = () => {
  const mapStateToProps = state => ({});
  const mapDispatchToProps = dispatch => ({});
  return connect(mapStateToProps, mapDispatchToProps)(Buttons);
};

export const createDashboard = () => {
  const mapStateToProps = state => ({});
  const mapDispatchToProps = dispatch => ({});
  return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
};
