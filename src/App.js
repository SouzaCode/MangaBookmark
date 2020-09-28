import React, { useEffect, useState } from "react";

import "./App.css";
import List from "./components/list/list";
function App() {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [mangaData, setMangaData] = useState([]);
  const [newName, setNewName] = useState("");
  const [newCap, setNewCap] = useState();
  useEffect(() => {
    chrome.storage.sync.get(["mangaData"], function (r) {
      let data;
      if (r.mangaData === undefined) {
        chrome.storage.sync.set({ mangaData: [] }, function () {});
        data = [];
      } else {
        console.log(r.mangaData);
        data = r.mangaData;
      }
      setMangaData(data);
    });
  }, []);
  useEffect(() => {
    console.log(mangaData);
    chrome.storage.sync.set({ mangaData: mangaData }, function () {});
  }, [mangaData]);
  function handleNew() {
    setIsCreatingNew(true);
  }
  function handleSubmitNew(e) {
    e.preventDefault();
    let aux = {
      id: mangaData.length,
      nome: newName != undefined ? newName : "NO NAME",
      cap: newCap != undefined ? newCap : 0,
    };
    let newAux = mangaData;
    newAux.push(aux);
    setMangaData(newAux);
    chrome.storage.sync.set({ mangaData: newAux }, function () {});
    setIsCreatingNew(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <small className="app-title">Meus Bookmarks</small>
        {!isCreatingNew ? (
          <div className="createN">
            <button onClick={handleNew} className="text-new">
              Adicionar Novo
            </button>
          </div>
        ) : (
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
            <button
              className="canceladd"
              onClick={() => setIsCreatingNew(false)}
            >
              close
            </button>
          </form>
        )}
      </header>

      <List mangaData={mangaData} setMangaData={setMangaData} />
    </div>
  );
}

export default App;
