import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      foods: []
    };
  }
  render() {
    return (
      <div className='App'>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
