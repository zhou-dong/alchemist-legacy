import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";

const footer = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>Alchemist</Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={2}>Dong</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

footer();

export default () => <div />;
