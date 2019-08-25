import React , { Component } from 'react';
import MainUsers from './MainUsers';
import PermissionLevel from '../libs/PermissionLevel'

class MainTeachers extends Component {

  render() {
      return (
          <MainUsers permission={PermissionLevel.TEACHER} title="Teacher" />
      )
  }
}

export default MainTeachers;