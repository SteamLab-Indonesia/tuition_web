import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import AddCourses from '../screens/AddCourses';


export default class Navigation extends Component{
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                {/* <Route path='/users' component={users}/>
                <Route path='/teacher' component={teacher}/> */}
                <Route path='/courses' component={AddCourses}/>
                {/* <Route path='/attendence' component={attendence}/>
                <Route path='/payment' component={payment}/>
                <Route path='/feedback' component={feedback}/> */}
            </Switch>
        );
    }
}