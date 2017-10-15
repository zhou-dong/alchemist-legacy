import { connect } from "react-redux";

import Table from "presentational/table";
import Buttons from "presentational/button-group";

import { buttonClick } from "./actions";

export function createTable() {
  const mapStateToProps = (state, ownProps) => {
    return {
      ...state,
      table: state.editDistanceReducer.table,
      styles: state.editDistanceReducer.styles
    };
  };

  const mapDispatchToProps = dispatch => {
    return {};
  };
  return connect(mapStateToProps, mapDispatchToProps)(Table);
}

export function createButtons() {
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
}
