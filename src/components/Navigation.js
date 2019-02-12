import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import MCourses from '../screens/MCourses';
import AddCourses from '../screens/AddCourses';
import Teacher from '../screens/Teacher';
import Users from '../screens/Users'


export default class Navigation extends Component{
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/users' component={Users}/>
                <Route path='/teacher' component={Teacher}/>
                <Route path='/courses' component={MCourses}/>
                <Route path='/addcourses' component={AddCourses}/>
                {/* <Route path='/attendence' component={attendence}/>
                <Route path='/payment' component={payment}/>
                <Route path='/feedback' component={feedback}/> */}
            </Switch>
        );
    }
}