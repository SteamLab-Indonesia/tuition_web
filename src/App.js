import React, { Component } from 'react';
import MyHeader from './components/MyHeader';
//import Dashboard from './screens/Dashboard';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyHeader />
        <main>
            <Navigation />
        </main>
      </div>
    );
  }
}

export default App;
