import React , { Component } from 'react';
import MUsers from './MUsers';
import PermissionLevel from '../libs/PermissionLevel'

class MTeacher extends Component {

  render() {
      return (
          <MUsers permission={PermissionLevel.TEACHER} title="Teacher" />
      )
  }
}

export default MTeacher;