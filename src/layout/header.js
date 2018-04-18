import React from "react";
import { connect } from "react-redux";
import { herokuBaseURL, returnUrl } from "configs/config";
import { MenuItem, Nav, Navbar, NavDropdown } from "react-bootstrap";

const createLoginUrl = authName => {
  return herokuBaseURL + "/auth/" + authName + "?return=" + returnUrl;
};

const getLogins = () => (
  <Nav pullRight>
    <NavDropdown eventKey={3} title="Log In" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1} href={createLoginUrl("github")}>
        GitHub
      </MenuItem>
      <MenuItem eventKey={3.2} href={createLoginUrl("google")}>
        Google
      </MenuItem>
      <MenuItem eventKey={3.3} href={createLoginUrl("facebook")}>
        Facebook
      </MenuItem>
    </NavDropdown>
  </Nav>
);

const getUserInfo = user => (
  <Navbar.Text pullRight>{user && user.username}</Navbar.Text>
);

const getUser = user => {
  return user ? getUserInfo(user) : getLogins();
};
const Header = ({ user }) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>Alchemist</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>{getUser(user)}</Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.updateUserReducer.user
});
const mapDispatchToProps = dispatch => {
  dispatch({ type: "GET_USER" });
  return {};
};
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
export const updateUserReducer = reducer;
