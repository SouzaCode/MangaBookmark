import React from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./components/list/list";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <List />
    </div>
  );
}

export default App;
