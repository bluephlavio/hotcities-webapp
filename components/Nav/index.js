import React, { Component } from 'react';
import style from './style.scss';

class Nav extends Component {
  render() {
    return (
      <nav>
        <h1 className={style.title}>Hello World</h1>
      </nav>
    );
  }
}

export default Nav;