import React , { Component } from 'react';
import MUsers from './MUsers';
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
          <MUsers permission={permissionList} title="Staff" />
      )
  }
}

export default MStaff;