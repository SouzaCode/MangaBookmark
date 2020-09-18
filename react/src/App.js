import React, { useEffect, useState } from "react";

import "./App.css";
import List from "./components/list/list";
function App() {
  const [newManga, setNewManga] = useState({
    id: null,
    nome: "",
    cap: "",
  });
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
  function handleNew() {
    setIsCreatingNew(true);
  }
  function handleSubmitNew(e) {
    e.preventDefault();
    let aux = mangaData;
    let newAux = newManga;
    console.log(newAux);
    setIsCreatingNew(false);
    newManga.id = aux[aux.length - 1].id + 1;
    aux.push(newAux);
    console.log(newAux);
  }
  function handleChangeName(name) {
    let aux = newManga;
    aux.nome = name;
    setNewManga(aux);
  }
  function handleChangeCap(cap) {
    let aux = newManga;
    aux.cap = cap;
    setNewManga(aux);
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
              onChange={(e) => handleChangeName(e.target.value)}
              name="manga"
              placeholder="manga name"
            ></input>
            <input
              type="number"
              onChange={(e) => handleChangeCap(e.target.value)}
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
