import React, { Component } from 'react';
import MyHeader from './components/MyHeader';
//import Dashboard from './screens/Dashboard';
import Navigation from './components/Navigation';
import firebase from './libs/firebase';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

class App extends Component {

  state = {
    user: null,
    showHeader: true
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
        this.setState({user});
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
        <MyHeader user={this.state.user} show={this.state.showHeader} />
          <main>
            <Navigation user={this.state.user} hideHeader={this.hideHeader}/>
          </main>
        </div>
    );
  }
}

export default withStyles(styles)(App);
