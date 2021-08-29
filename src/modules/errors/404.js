import React from 'react';
import {NavLink} from 'react-router-dom';

export default class ERR404 extends React.Component {
  render() {
    return (
      <>
      <h1>404错误，请输入正确的地址！！！</h1>
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
