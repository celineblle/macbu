import React, { useState, useContext } from "react";
import "./Caisse.css";
import close from "../../assets/close.svg";
import { TailleEtPrixCommandeContext } from "../../CommandeContext";
import { FondDeCaisseContext } from "../../CaisseContext";

function Caisse() {
  const tailleEtPrixCommande = useContext(TailleEtPrixCommandeContext);
  const fondDeCaisse = useContext(FondDeCaisseContext);

  const [buttonActionModalCaisse, setButtonActionModalCaisse] =
    useState<boolean>(false);

  function handleClickActionModal(): void {
    setButtonActionModalCaisse(!buttonActionModalCaisse);
  }

  return (
    <div id="caisseComponent" className="component">
      <div>
        <button className="buttonModal" onClick={handleClickActionModal}>
          Caisse
        </button>
        <p>Fond de caisse : {fondDeCaisse}</p>
      </div>
      <ul id="listeCommandePage">
        {tailleEtPrixCommande.map((tab: [number, number], index: number) => (
          <li key={index} className="commandeUniquePage">
            Commande {index + 1} : {tab[1]}€
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
