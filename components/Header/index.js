import React, { Component } from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.scss';

const Toggler = props => (
  <FontAwesomeIcon icon="bars" className={`d-inline d-md-none ${style.toggler}`} {...props} />
);

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
      <div className={style.header}>
        <Navbar light expand="md" className={style.navbar}>
          <NavbarBrand href="/" className={style.brand}>
            <h1 className={style.title}>HOT CITIES</h1>
            <p className={style.motto}>world&#39;s hottest city, now</p>
          </NavbarBrand>
          <NavbarToggler tag={() => <Toggler onClick={this.toggle} />} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className={`ml-auto ${style.nav}`} navbar>
              <NavItem className={style.navItem}>
                <NavLink tag={props => <Link href="/">{props.children}</Link>}>
                  <a href="#/">Home</a>
                </NavLink>
              </NavItem>
              <NavItem className={style.navItem}>
                <NavLink tag={props => <Link href="/about">{props.children}</Link>}>
                  <a href="#/">About</a>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <hr />
      </div>
    );
  }
}

export default Header;
