import React from "react";
import { connect } from "react-redux";
import { herokuBaseURL, returnUrl } from "configs/config";
import { MenuItem, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { locationReplace } from "utils/window-helper";
const logOut = () => {
  localStorage.removeItem("auth_token");
  locationReplace();
};

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

const getAvatar = user => {
  const image = () => <img src={user.avatar} alt={user.username} width="30" />;
  return (
    (user && user.avatar && image()) || (user && user.username) || "Log In"
  );
};

const getUserInfo = (user, updateUser) => (
  <Nav pullRight>
    <NavDropdown eventKey={3} title={getAvatar(user)} id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>{user && user.username}</MenuItem>
      <MenuItem eventKey={3.2} onClick={() => logOut(updateUser)}>
        Log Out
      </MenuItem>
    </NavDropdown>
  </Nav>
);

const getUser = (user, updateUser) => {
  return user ? getUserInfo(user, updateUser) : getLogins();
};
const Header = ({ user, updateUser }) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Alchemist</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>{getUser(user, updateUser)}</Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.updateUserReducer.user
});

const mapDispatchToProps = dispatch => {
  dispatch({ type: "GET_USER" });
  return { updateUser: () => dispatch({ type: "UPDATE_USER", user: {} }) };
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
