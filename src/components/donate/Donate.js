import React from "react";
import "./donate.css";
import { Btc, Eth, Xmr, Doge, Ltc, Xrp } from "@rimble/icons";

function Donate() {
  return (
    <div className="donate-container">
      <p className="donate-title ">Donate to help the development!</p>
      <p className="donate-subtitle">This extension is completely free and the only way that I have to keep updating it is through donations.</p>
      <p className="donate-subtitle">You can transfer ANY quantity you want to one of my addresses bellow 🥰</p>

      <div className="donate-options">
        <p className="donate-subtitle">Paypal:</p>
        <div className="donate-img-container">
          <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PEFYEJDSJTG7W" target="_blank">
            <img src="paypal.png" width="100px" />
          </a>

          <p className="img-separator">or</p>
          <img src="QRCode.png" width="100px" />
        </div>

        <p className="donate-opt">
          <Btc size={16} /> &nbsp; &nbsp;3EcS6jC3LEu6TxrGf1gy6RDU84JUeigHPS
        </p>

        <p className="donate-opt">
          <Ltc size={16} /> &nbsp; &nbsp;MKxfVcFP25saWHQiS2oiGAap3Yap3LmNiU
        </p>
        <p className="donate-opt">
          <Doge size={16} /> &nbsp; &nbsp;D7t9nvfjj73M7kgxMNr35cD9XzCA6cbYsy
        </p>
        <p className="donate-opt">
          <Eth size={16} /> &nbsp; &nbsp;0x1fcb76c03a319bac659f64bb1f8199f0be3d233a
        </p>
        <p className="donate-opt">
          <Xrp size={16} /> &nbsp; &nbsp;rnW8je5SsuFjkMSWkgfXvqZH3gLTpXxfFH
        </p>
        <p className="donate-opt">
          <Xmr size={16} /> 88GEUNi69R5EHHcJJ7r7VUZq7NAPRESvQD7NncoEyXvz6LW2oWsBa2QWyD7PC66W3NbtSxfp8WrF4K3ZFCB9AgNR5Jz6dUc
        </p>
      </div>
    </div>
  );
}
export default Donate;
