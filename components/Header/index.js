import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../style/theme';

const Toggler = ({ toggle }) => (
  <button
    type="button"
    className="toggler d-inline d-md-none"
    aria-label="toggler"
    onClick={toggle}
  >
    <FontAwesomeIcon icon="bars" fixedWidth />
    <style jsx>
      {`
        .toggler {
          transform: translateY(-2px);
        }
      `}
    </style>
  </button>
);

Toggler.propTypes = {
  toggle: PropTypes.func.isRequired
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div className="header">
        <Navbar light expand="md">
          <NavbarBrand href="/" aria-label="home">
            <h1 className="title">HOT CITIES</h1>
            <p className="motto">world&#39;s hottest city, now</p>
          </NavbarBrand>
          <NavbarToggler tag={() => <Toggler toggle={this.toggle} />} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink tag={props => <Link href="/">{props.children}</Link>}>
                  <a href="#/">Live</a>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={props => <Link href="/stats">{props.children}</Link>}
                >
                  <a href="#/">Stats</a>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={props => <Link href="/about">{props.children}</Link>}
                >
                  <a href="#/">About</a>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <hr />
        <style jsx global>
          {`
            .navbar {
              display: flex;
              flex-direction: row;
              align-items: flex-end;
              align-content: flex-end;
            }
            .navbar-brand {
              margin: 0;
              padding: 0;
            }
            .navbar-collapse {
              display: flex;
            }
            .navbar-nav {
              transform: translateY(-2px);
              flex: 1;
              display: flex;
              justify-content: flex-end;
            }
            .nav-item {
              margin-top: 10px;
              margin-right: 10px;
            }
            .nav-item a {
              text-decoration: none;
              font-size: ${theme.font.size.medium};
            }
          `}
        </style>
        <style jsx>
          {`
            .title {
              margin: 0;
              color: ${theme.palette.accent};
              font-size: ${theme.font.size.big};
            }
            .motto {
              margin: 0;
              color: ${theme.palette.secondary}88;
              font-size: ${theme.font.size.medium};
            }
            @media (max-width: ${theme.dim.break.small}) {
              .motto {
                font-size: ${theme.font.size.small};
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default Header;
