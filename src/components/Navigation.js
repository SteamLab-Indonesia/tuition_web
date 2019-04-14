import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import MCourses from '../screens/MCourses';
import AddCourses from '../screens/AddCourses';
import MTeacher from '../screens/MTeacher';
import MUsers from '../screens/MUsers';
import AddUsers from '../screens/AddUsers';
import AddTeachers from '../screens/AddTeachers';
import Login from '../screens/Login';
import VCourses from '../screens/VCourses';


export default class Navigation extends Component{
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/users' component={MUsers}/>
                <Route path='/teacher' component={MTeacher}/>
                <Route path='/courses' component={MCourses}/>
                <Route path='/addcourses' component={AddCourses}/>
                <Route path='/addusers' component={AddUsers}/>
                <Route path='/addTeachers' component={AddTeachers}/>
                <Route path='/login' component={Login}/>
                <Route path='/viewcourses' component={VCourses}/>
                {/* <Route path='/attendence' component={attendence}/>
                <Route path='/payment' component={payment}/>
                <Route path='/feedback' component={feedback}/> */}
            </Switch>
        );
    }
}