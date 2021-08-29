import React from 'react';
import {NavLink} from 'react-router-dom';

export default class NoPermissions extends React.Component {
  render() {
    return (
      <>
      <h1>没权限</h1>
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
