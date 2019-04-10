import React, { Component } from 'react';
import style from './style.scss';

class Header extends Component {
  render() {
    return (
      <div className={style.header}>
        <h1 className={style.title}>Hello World</h1>
      </div>
    );
  }
}

export default Header;