import React, { Component } from 'react';
import Nav from '../Nav'
import style from './style.scss';

class Header extends Component {
  render() {
    return (
      <div className={style.header}>
        <h1 className={style.title}>Hello World</h1>
        <Nav />
      </div>
    );
  }
}

export default Header;