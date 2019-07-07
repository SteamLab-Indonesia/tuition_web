import React, { Component } from 'react';
import MUsers from './MUsers';
import PermissionLevel from '../libs/PermissionLevel'

class MStudent extends Component {

    render() {
        return (
            <MUsers permission={PermissionLevel.STUDENTS} title="Student" />
        )
    }
}

export default MStudent;