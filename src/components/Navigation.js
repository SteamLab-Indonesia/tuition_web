import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import MCourses from '../screens/MCourses';
import AddCourses from '../screens/AddCourses';
import MTeacher from '../screens/MTeacher';
import MUsers from '../screens/MUsers';
import AddUsers from '../screens/AddUsers';
import AddTeachers from '../screens/AddTeachers';
import Login from '../screens/Login';
import VCourses from '../screens/VCourses';
import Attendance from '../screens/MAttendance'
import VUser from '../screens/VUser'
import Payment from '../screens/MPayment'
import Classroom from '../screens/MClassroom'
import VClassroom from '../screens/VClassroom'
import AddClassroom from '../screens/AddClassroom'
import MLesson from '../screens/MLesson';
import AddLesson from '../screens/AddLesson';
import MStaffAttendance from '../screens/MStaffAttendance';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class Navigation extends Component{

    hideHeader = (hidden) => {
        if (this.props.hideHeader)
            this.props.hideHeader(hidden);
    }

    checkHeader = () => {
        switch(this.props.location.pathname)
        {
            case '/login':
                this.hideHeader(true);
                break;
            default:
                this.hideHeader(false);
                break;
        }
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.location.pathname !== this.props.location.pathname)
        {
            this.checkHeader();
        }
    }

    componentDidMount = () => {
        this.checkHeader();
    }

    render() {

        return (
            <Switch history={history}>
                <Route exact path='/' component={Login}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/users' component={MUsers}/>
                <Route path='/teacher' component={MTeacher}/>
                <Route path='/courses' component={MCourses}/>
                <Route path='/addcourses' component={AddCourses}/>
                <Route path='/addusers' component={AddUsers}/>
                <Route path='/addteachers' component={AddTeachers}/>
                <Route path='/login' component={Login}/>
                <Route path='/viewcourses/:id' component={VCourses}/>
                <Route path='/attendance' component={Attendance}/>
                <Route path='/viewuser/:id' component={VUser}/>
                <Route path='/classroom' component={Classroom}/>
                <Route path='/viewclassroom/:id' component={VClassroom}/>
                <Route path='/addclassroom' component={AddClassroom}/>
                <Route path='/lesson/:id' component={MLesson}/>
                <Route path='/addlesson/:id' component={AddLesson}/>
                <Route path='/payment' component={Payment}/>
                <Route path='/staffattendance' component={MStaffAttendance}/>
                {/*<Route path='/feedback' component={feedback}/> */}
            </Switch>
        );
    }
}
export default withRouter(props => <Navigation {...props}/>);