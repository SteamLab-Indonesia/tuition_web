import React, { Component } from 'react';
import MyHeader from './components/MyHeader';
//import Dashboard from './screens/Dashboard';
import Navigation from './components/Navigation';
import {initFirebase} from './libs/firebase';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Background } from "./img/abstract-art-background-370799.jpg";
import Paper from '@material-ui/core/Paper';


initFirebase();
// getOrganization((list) => {
//   console.log(list);
// })
class App extends Component {
  render() {
    const classes = this.props;
    // console.log("Line 1");
    // setTimeout(() => {
    //   console.log("wait 2 sec")
    // }, 2000);
    // console.log("Line 2"); className={classes.tes}

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
