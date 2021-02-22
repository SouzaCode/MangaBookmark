import React, { useState } from "react";
import "./options.css";
import Donate from "../donate/Donate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFileUpload,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";

function Options({
  allMangasSet,
  allMangasData,
  googleFunctions,
  abasNames,
  setInOptions,
}) {
  const [donate, setDonate] = useState(false);
  function handleDonate() {
    setDonate(!donate);
  }
  function downloadTxtFile() {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(allMangasData)], {
      type: "text/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "backup.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  function updateMangaData(obj) {
    for (let i in abasNames) {
      const func = allMangasSet[abasNames[i]];
      func(obj[abasNames[i]]);
    }
    setInOptions(false);
  }
  async function handleUploadBackup(e) {
    let reader = new FileReader();
    reader.onload = async function (e) {
      let jsonObj = await JSON.parse(e.target.result);
      updateMangaData(jsonObj);
    };

    reader.readAsText(e.target.files[0]);
  }
  return (
    <div className="opt-container">
      {!donate ? (
        <>
          <p className="opt-title">Backup</p>
          <div className="backupMenu">
            <a className="bckp-btn" onClick={() => downloadTxtFile()}>
              <FontAwesomeIcon icon={faDownload} /> Download
            </a>
            <a
              className="up-bckp-btn"
              onClick={() => {
                const element = document.getElementById("upload_bckp");
                element.click();
              }}
            >
              <FontAwesomeIcon icon={faFileUpload} /> Upload
            </a>
            <input
              style={{ display: "none" }}
              type="file"
              id="upload_bckp"
              onChange={handleUploadBackup}
            />
          </div>
        </>
      ) : (
        <Donate></Donate>
      )}
      <div className="donate-menu">
        <a className="donate-btn" onClick={() => handleDonate()}>
          <FontAwesomeIcon icon={faHandHoldingUsd} /> Donate
        </a>
      </div>
    </div>
  );
}
export default Options;
