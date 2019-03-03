import React, { Component } from 'react';
import MyHeader from './components/MyHeader';
//import Dashboard from './screens/Dashboard';
import Navigation from './components/Navigation';
import {initFirebase} from './libs/firebase';
import {getOrganization} from './libs/Organization';
// var Organization = require('./libs/Organization');

initFirebase();
getOrganization((list) => {
  console.log(list);
})
class App extends Component {
  render() {
    return (
      <div className="App" id='base'>
        <MyHeader />
        <main>
            <Navigation />
        </main>
      </div>
    );
  }
}

export default App;
