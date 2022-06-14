import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Toggler from './components/Toggler';
import styles from './Header.module.scss';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  return (
    <div className={styles.header}>
      <Navbar light expand="md">
        <NavbarBrand href="/" aria-label="home">
          <h1 className={styles.title}>HOT CITIES</h1>
          <p className={styles.motto}>world&#39;s hottest city, now</p>
        </NavbarBrand>
        <NavbarToggler tag={() => <Toggler toggle={handleToggle} />} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={(props) => <Link href="/">{props.children}</Link>}>
                <a href="/">Live</a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={(props) => <Link href="/about">{props.children}</Link>}
              >
                <a href="about">About</a>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <hr />
    </div>
  );
};

export default Header;
