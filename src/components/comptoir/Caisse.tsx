import React, { useState } from "react";
import "./Caisse.css";
import close from "../../assets/close.svg";

function Caisse({
  aPreparerAffichage,
}: {
  aPreparerAffichage: (string | string[])[][];
}) {
  const [buttonActionModalCaisse, setButtonActionModalCaisse] =
    useState<boolean>(false);

  function handleClickActionModal(): void {
    setButtonActionModalCaisse(!buttonActionModalCaisse);
  }

  return (
    <div id="caisseComponent" className="component">
      <button className="buttonModal" onClick={handleClickActionModal}>
        Caisse
      </button>
      <ul id="listeCommandePage">
        {aPreparerAffichage.map((tab: (string | string[])[], index: number) => (
          <li key={index} className="commandeUniquePage">
            Commande {index + 1} : xx€
          </li>
        ))}
      </ul>

      <div className={buttonActionModalCaisse ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div id="headerModal">
            <h2>Caisse</h2>
            <button
              onClick={handleClickActionModal}
              className="closeModalButton"
            >
              {" "}
              <img alt="fermer" title="fermer" src={close}></img>
            </button>
          </div>
          <p>caisse</p>
        </div>
      </div>
    </div>
  );
}

export default Caisse;
