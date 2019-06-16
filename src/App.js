import React, { Component } from 'react';
import MyHeader from './components/MyHeader';
//import Dashboard from './screens/Dashboard';
import Navigation from './components/Navigation';
import firebase from './libs/firebase';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

class App extends Component {

  state = {
    loggedUser: null
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({loggedUser: user});
    });    
  }
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

export default withStyles(styles)(App);
