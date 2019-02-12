import React, { Component } from 'react';
import './App.css';
import { Table } from './component/table';

class App extends Component {
  render() {
    return (
      <div>
        <header className="app-header">
               Movies List
        </header>
        <Table/>
      </div>
    );
  }
}

export default App;
