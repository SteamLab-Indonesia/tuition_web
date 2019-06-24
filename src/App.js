import React, { Component } from 'react';
import MyHeader from './components/MyHeader';
//import Dashboard from './screens/Dashboard';
import Navigation from './components/Navigation';
import firebase from './libs/firebase';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

class App extends Component {

  state = {
    loggedUser: null,
    showHeader: true
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({loggedUser: user});
    });    
  }

  hideHeader = (hidden) => {
    if (hidden)
      this.setState({showHeader: false});
    else
      this.setState({showHeader: true});
  }

  render() {
    return (
      <div className="App" id='base'>
        <MyHeader show={this.state.showHeader} />
          <main>
            <Navigation hideHeader={this.hideHeader}/>
          </main>
        </div>
    );
  }
}

export default withStyles(styles)(App);
