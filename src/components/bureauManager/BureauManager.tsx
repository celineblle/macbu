import React, { useContext } from "react";
import "./BureauManager.css";
import { FondDeCaisseContext } from "../../CaisseContext";

function BureauManager() {
  const fondDeCaisse = useContext(FondDeCaisseContext);
  return (
    <div id="bureauManagerComponent">
      <h1>MacBu</h1>
      <div>
        <h2>bureau manager</h2>
        <p>{fondDeCaisse}</p>
      </div>
    </div>
  );
}

export default BureauManager;
