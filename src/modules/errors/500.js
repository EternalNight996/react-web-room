import React from 'react';
import {NavLink} from 'react-router-dom';

export default class ERR500 extends React.Component {
  render() {
    return (
      <>
      <h1>500错误！！！</h1>
      <NavLink to="/" activeStyle={{
          top: '50%',
          left: '50%',
          fontWeight: "bold",
          color: "red"
      }}>返回首页</NavLink>
      </>
    );
  }
}
