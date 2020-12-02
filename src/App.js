import React, { useEffect, useState } from "react";

import "./App.css";
import List from "./components/list/list";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faDownload } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [mangaData, setMangaData] = useState([]);
  const [mangaWaitingData, setMangaWaitingData] = useState([]);
  const [mangaLaterData, setMangaLaterData] = useState([]);
  const [mangaFinishData, setMangaFinishData] = useState([]);

  const [newName, setNewName] = useState("");
  const [newCap, setNewCap] = useState();
  const [selectedAba, setSelectedAba] = useState(0);

  function getInitialData(dataName, mData, setFunc) {
    console.log(mData);
    chrome.storage.sync.get([dataName], function (r) {
      let data;
      if (r[dataName] === undefined) {
        chrome.storage.sync.set(mData, function () {});
        data = [];
      } else {
        data = r[dataName];
      }
      setFunc(data);
    });
  }
  useEffect(() => {
    getInitialData("mangaData", { mangaData: [] }, setMangaData);
    getInitialData(
      "mangaWaitingData",
      { mangaWaitingData: [] },
      setMangaWaitingData
    );
    getInitialData("mangaLaterData", { mangaLaterData: [] }, setMangaLaterData);
    getInitialData(
      "mangaFinishData",
      { mangaFinishData: [] },
      setMangaFinishData
    );
  }, []);
  useEffect(() => {
    chrome.storage.sync.set({ mangaData: mangaData }, function () {});
  }, [mangaData]);
  useEffect(() => {
    chrome.storage.sync.set(
      { mangaWaitingData: mangaWaitingData },
      function () {}
    );
  }, [mangaWaitingData]);
  useEffect(() => {
    chrome.storage.sync.set({ mangaLaterData: mangaLaterData }, function () {});
  }, [mangaLaterData]);
  useEffect(() => {
    chrome.storage.sync.set(
      { mangaFinishData: mangaFinishData },
      function () {}
    );
  }, [mangaFinishData]);
  function handleNew() {
    setIsCreatingNew(true);
  }
  function submitNew(dataName, setFunc, saveObj) {
    let mData = saveObj[dataName];
    let aux = {
      id:
        mData.reduce((max, num) => {
          num.id > max ? (max = num.id) : (max = max);
          return max;
        }, 0) + 2,
      nome: newName ? newName : "NO NAME",
      cap: newCap != undefined ? newCap : 0,
    };
    let newAux = mData;
    newAux.push(aux);
    setFunc(newAux);
    saveObj[dataName] = newAux;
    chrome.storage.sync.set(saveObj, function () {});
    setIsCreatingNew(false);
  }
  function handleSubmitNew(e) {
    e.preventDefault();
    if (selectedAba == 0)
      submitNew("mangaData", setMangaData, { mangaData: mangaData });
    if (selectedAba == 1)
      submitNew("mangaWaitingData", setMangaWaitingData, {
        mangaWaitingData: mangaWaitingData,
      });
    if (selectedAba == 2)
      submitNew("mangaLaterData", setMangaLaterData, {
        mangaLaterData: mangaLaterData,
      });
    if (selectedAba == 3)
      submitNew("mangaFinishData", setMangaFinishData, {
        mangaFinishData: mangaFinishData,
      });
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
  function handleChangeAba(id) {
    setSelectedAba(id);
  }

  return (
    <div className="App">
      <header className="App-header">
        <small className="app-title">Meus Bookmarks</small>
        {!isCreatingNew ? (
          <>
            <a className="bckp-btn" onClick={() => downloadTxtFile()}>
              <FontAwesomeIcon icon={faDownload} /> Backup
            </a>
            <div className="createN">
              <a onClick={handleNew} className="text-new">
                <FontAwesomeIcon icon={faPlusCircle} /> New
              </a>
            </div>
          </>
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
      <div className="menu cantSelect">
        <div
          onClick={() => handleChangeAba(0)}
          className={"menu-aba " + (selectedAba == 0 ? "aba-selected" : "")}
        >
          <small>Reading: {mangaData.length}</small>
        </div>
        <div
          onClick={() => handleChangeAba(1)}
          className={"menu-aba " + (selectedAba == 1 ? "aba-selected" : "")}
        >
          <small>Waiting: {mangaWaitingData.length}</small>
        </div>

        <div
          onClick={() => handleChangeAba(2)}
          className={"menu-aba " + (selectedAba == 2 ? "aba-selected" : "")}
        >
          <small>Later: {mangaLaterData.length}</small>
        </div>
        <div
          onClick={() => handleChangeAba(3)}
          className={"menu-aba " + (selectedAba == 3 ? "aba-selected" : "")}
        >
          <small>Finished: {mangaFinishData.length}</small>
        </div>
      </div>
      {selectedAba == 0 && (
        <List mangaData={mangaData} setMangaData={setMangaData} />
      )}
      {selectedAba == 1 && (
        <List mangaData={mangaWaitingData} setMangaData={setMangaWaitingData} />
      )}
      {selectedAba == 2 && (
        <List mangaData={mangaLaterData} setMangaData={setMangaLaterData} />
      )}
      {selectedAba == 3 && (
        <List mangaData={mangaFinishData} setMangaData={setMangaFinishData} />
      )}
    </div>
  );
}

export default App;
