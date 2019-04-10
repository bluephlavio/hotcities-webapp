import React, { Component } from 'react';
import Link from 'next/link';
import style from './style.scss';

class Nav extends Component {
  render() {
    return (
      <nav className={style.nav}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;