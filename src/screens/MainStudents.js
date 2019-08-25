import React, { Component } from 'react';
import MainUsers from './MainUsers';
import PermissionLevel from '../libs/PermissionLevel'

class MainStudents extends Component {

    render() {
        return (
            <MainUsers permission={PermissionLevel.STUDENTS} title="Student" />
        )
    }
}

export default MainStudents;