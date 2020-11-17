import React, { useEffect, useState } from "react";

import "./App.css";
import List from "./components/list/list";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

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
      id:
        mangaData.reduce((max, num) => {
          num.id > max ? (max = num.id) : (max = max);
          return max;
        }, 0) + 2,
      nome: newName ? newName : "NO NAME",
      cap: newCap != undefined ? newCap : 0,
    };
    let newAux = mangaData;
    newAux.push(aux);
    setMangaData(newAux);
    chrome.storage.sync.set({ mangaData: newAux }, function () {});
    setIsCreatingNew(false);
  }

  function downloadTxtFile() {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(mangaData)], {
      type: "text/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "backup.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className="App">
      <header className="App-header">
        <small className="app-title">Meus Bookmarks</small>
        {!isCreatingNew ? (
          <div className="createN">
            <a onClick={handleNew} className="text-new">
              <FontAwesomeIcon icon={faPlusCircle} /> Novo
            </a>
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

      <button onClick={() => downloadTxtFile()}>Download txt</button>
    </div>
  );
}

export default App;
