import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Timelines</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/schedules'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Test planning tools table
                </NavItem>
            </LinkContainer>
            <LinkContainer to={'/clickup-table'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Test clickup table
                </NavItem>
            </LinkContainer>
            <LinkContainer to={'/combined-table'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Test combined table
                </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
