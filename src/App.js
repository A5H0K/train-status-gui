import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div>
      <header className="App-header">
        <h1 style={{textAlign : "center"}}>Realtime Train status display</h1>
        <Home></Home>
        
      </header>
    </div>
  );
}

export default App;
