import React , { Component } from 'react';
import MainUsers from './MainUsers';
import PermissionLevel from '../libs/PermissionLevel'

const permissionList = [
    PermissionLevel.BRANCH_ADMIN,
    PermissionLevel.COORDINATOR,
    PermissionLevel.FINANCE,
    PermissionLevel.OPERATOR
];

class MStaff extends Component {

  render() {
      return (
          <MainUsers permission={permissionList} title="Staff" />
      )
  }
}

export default MStaff;