import React, { useEffect, useState } from "react";

import "./App.css";
import List from "./components/list/list";
function App() {
  const [mangaData, setMangaData] = useState([
    {
      id: 0,
      nome: "Boku no Hero",
      cap: 9,
    },
    {
      id: 1,
      nome: "Tensei shittara",
      cap: 1,
    },
    {
      id: 2,
      nome: "Solo Leveling",
      cap: 3,
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newCap, setNewCap] = useState();
  function handleNew() {
    setIsCreatingNew(true);
  }
  function handleSubmitNew(e) {
    e.preventDefault();
    let aux = {
      id: mangaData.length,
      nome: newName,
      cap: newCap,
    };
    let newAux = mangaData;
    console.log(aux);
    newAux.push(aux);
    setMangaData(newAux);
    setIsCreatingNew(false);
  }

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <small>Meus Bookmarks</small>
        {!isCreatingNew && (
          <div className="createN">
            <button onClick={handleNew} className="text-new">
              Adicionar Novo
            </button>
          </div>
        )}
      </header>
      {isCreatingNew && (
        <form onSubmit={handleSubmitNew}>
          <div className="creatingNew">
            <input
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              name="manga"
              placeholder="manga name"
            ></input>
            <input
              type="number"
              onChange={(e) => setNewCap(parseInt(e.target.value))}
              name="chapter"
              placeholder="chapter"
            />
          </div>
          <button className="newmanga" type="submit">
            +
          </button>
        </form>
      )}
      <List mangaData={mangaData} setMangaData={setMangaData} />
    </div>
  );
}

export default App;
