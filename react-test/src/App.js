import React from "react";
import "./App.css";
import List from "./components/list/list";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Meus Bookmarks</p>
      </header>
      <List />
    </div>
  );
}

export default App;
