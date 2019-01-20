import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from '../screens/Dashboard';


export default class Navigation extends Component{
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/dashboard' component={Dashboard}/>
            </Switch>
        );
    }
}