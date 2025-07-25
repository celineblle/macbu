import React, { useEffect, useState, useRef, useContext } from "react";
import "./Grill.css";
import close from "../../assets/close.svg";
import { ViandePret } from "./Cuisine";
import { CommandesAPreparerContext } from "../../CommandeContext";
import { Produit } from "../../elements/burgers";
import {
  demantelerMenu,
  quiEstQuoi,
  retirerStock,
} from "../../elements/function";
import {
  StocksActuelInteriorType,
  StocksActuelsType,
} from "../../StocksActuels";
import { viande } from "../../elements/stocks";

function Grill({
  viandePret,
  setViandePret,
  viandePretRef,
  stocksCuisine,
  setStocksCuisine,
}: {
  viandePret: ViandePret[];
  setViandePret: React.Dispatch<React.SetStateAction<ViandePret[]>>;
  viandePretRef: React.RefObject<ViandePret[]>;
  stocksCuisine: StocksActuelsType[];
  setStocksCuisine: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>;
}) {
  const commandeAPreparer = useContext(CommandesAPreparerContext);

  const limitSizeGrill: number = 8;
  let standByTimeOut: number = 0;
  const [toggleModalGrill, setToggleModalGrill] = useState<boolean>(false);
  const [plaqueDeCuisson, setPlaqueDeCuisson] = useState<string[]>([]);
  const [plaqueDeCuissonGrille, setPlaqueDeCuissonGrille] = useState<string[]>(
    []
  );
  const [plaqueDeCuissonPret, setPlaqueDeCuissonPret] = useState<string[]>([]);
  const [placeVideGrill, setPlaceVideGrill] = useState<string[]>([]);
  const [timeOutPretId, setTimeOutPretId] = useState<number[]>([]);
  const [commandeSteak, setCommandeSteak] = useState<(string | string[])[]>([]);

  const tabCuisson = useRef<string[]>([]);
  const tabGrille = useRef<string[]>([]);
  const tabPret = useRef<string[]>([]);

  useEffect(() => {
    tabCuisson.current = plaqueDeCuisson;
  }, [plaqueDeCuisson]);

  useEffect(() => {
    tabGrille.current = plaqueDeCuissonGrille;
  }, [plaqueDeCuissonGrille]);

  useEffect(() => {
    tabPret.current = plaqueDeCuissonPret;
  }, [plaqueDeCuissonPret]);

  function handleClickToggleModal(): void {
    setToggleModalGrill(!toggleModalGrill);
  }

  function steakCuitStandBy(element: string): void {
    standByTimeOut = setTimeout(() => {
      setPlaqueDeCuissonGrille([...tabGrille.current, element]);
      const oldestSteak: number = tabPret.current.indexOf(element);
      const tabPretCopie: string[] = tabPret.current.slice();
      tabPretCopie.splice(oldestSteak, 1);
      setPlaqueDeCuissonPret(tabPretCopie);
    }, 10000);
    setTimeOutPretId([...timeOutPretId, standByTimeOut]);
  }

  function handleClickFrigoToGrill(element: string): void {
    const stockFrigoGrill: StocksActuelInteriorType | undefined =
      stocksCuisine[7].stockActuel.find((e) => e.produit === element);
    if (stockFrigoGrill !== undefined && stockFrigoGrill.quantite > 0) {
      const actualSizeGrill: number =
        plaqueDeCuisson.length +
        plaqueDeCuissonPret.length +
        plaqueDeCuissonGrille.length;

      if (actualSizeGrill < limitSizeGrill) {
        setPlaqueDeCuisson([...plaqueDeCuisson, element]);

        retirerStock(
          stocksCuisine,
          setStocksCuisine,
          "viande",
          stockFrigoGrill
        );

        setTimeout(() => {
          setPlaqueDeCuissonPret([...tabPret.current, element]);
          const oldestSteak: number = tabCuisson.current.indexOf(element);
          const tabCuissonCopie: string[] = tabCuisson.current.slice();
          tabCuissonCopie.splice(oldestSteak, 1);
          setPlaqueDeCuisson(tabCuissonCopie);
          steakCuitStandBy(element);
        }, 2000);
      }
    }
  }

  useEffect(() => {
    const actualSizeGrill: number =
      plaqueDeCuisson.length +
      plaqueDeCuissonPret.length +
      plaqueDeCuissonGrille.length;
    const placeVide: string[] = [];
    if (actualSizeGrill < limitSizeGrill) {
      for (let i = actualSizeGrill; i < limitSizeGrill; i++) {
        placeVide.push("Vide");
      }
    }
    setPlaceVideGrill(placeVide);
  }, [plaqueDeCuisson, plaqueDeCuissonPret, plaqueDeCuissonGrille]);

  function handleClickAvailabilitySteak(element: string): void {
    const getReadySteak: number = plaqueDeCuissonPret.indexOf(element);
    let timeOutIdCopie: number[] = timeOutPretId.slice();
    const steakTimeOutId = timeOutIdCopie[getReadySteak];
    clearTimeout(steakTimeOutId);
    timeOutIdCopie = timeOutIdCopie.filter((e) => e !== steakTimeOutId);
    setTimeOutPretId(timeOutIdCopie);
    const tabCuissonCopie: string[] = plaqueDeCuissonPret.slice();
    tabCuissonCopie.splice(getReadySteak, 1);
    setPlaqueDeCuissonPret(tabCuissonCopie);
    const viandePretCopie: ViandePret[] = viandePretRef.current.slice();
    const indexViandePrete: number = viandePretCopie.findIndex(
      (e) => e.nom === element
    );
    viandePretCopie[indexViandePrete].quantite =
      viandePretCopie[indexViandePrete].quantite + 1;
    setViandePret(viandePretCopie);
  }

  function handleClickPoubelle(element: string): void {
    const oldestSteak: number = plaqueDeCuissonGrille.indexOf(element);
    const tabGrilleCopie: string[] = plaqueDeCuissonGrille.slice();
    tabGrilleCopie.splice(oldestSteak, 1);
    setPlaqueDeCuissonGrille(tabGrilleCopie);
  }

  useEffect(() => {
    const commandesSansMenu: Produit[][] = demantelerMenu(commandeAPreparer);
    const commandesDuPoste: string[][] = quiEstQuoi("steak", commandesSansMenu);
    setCommandeSteak(commandesDuPoste);
  }, [commandeAPreparer]);

  return (
    <div id="grillComponent" className="component">
      <button className="buttonModal" onClick={handleClickToggleModal}>
        grill
      </button>
      <div id="pageContent">
        <div id="stockPretPage">
          <h3>Pret</h3>
          <ul className="listStock">
            {viandePret.map((element) => (
              <li key={element.nom}>
                {element.nom} : {element.quantite}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div id="stockFrigoPage">
          <h3>Stock</h3>
          <ul className="listStock">
            {stocksCuisine.length > 0
              ? stocksCuisine[7].stockActuel.map((e, i) => (
                  <li key={i}>
                    {e.produit} : {e.quantite}
                  </li>
                ))
              : viande.map((e, i) => <li key={i}>{e} : 0</li>)}
          </ul>
        </div>
      </div>
      <div className={toggleModalGrill ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div id="headerModal">
            <h2>Grill</h2>
            <button
              onClick={handleClickToggleModal}
              className="closeModalButton"
            >
              {" "}
              <img alt="fermer" title="fermer" src={close}></img>
            </button>
          </div>
          <br />
          <div id="modalGrillContent">
            <div id="stockPretGrill">
              <h3>Pret</h3>
              <ul>
                {viandePret.map((element) => (
                  <li key={element.nom}>
                    {element.nom} : {element.quantite}
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div id="cuissonGrill">
              <h3>Cuisson</h3>
              <br />
              {plaqueDeCuissonGrille.map(
                (emplacement: string, index: number) => (
                  <button
                    onClick={() => handleClickPoubelle(emplacement)}
                    key={index}
                    className="buttonGrille buttonGrill"
                  >
                    {emplacement}
                  </button>
                )
              )}
              {plaqueDeCuissonPret.map((emplacement: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleClickAvailabilitySteak(emplacement)}
                  className="buttonPret buttonGrill"
                >
                  {emplacement}
                </button>
              ))}
              {plaqueDeCuisson.map((emplacement: string, index: number) => (
                <button
                  disabled={true}
                  key={index}
                  className="buttonCuisson buttonGrill"
                >
                  {emplacement}
                </button>
              ))}
              {placeVideGrill.map((emplacement: string, index: number) => (
                <button
                  disabled={true}
                  key={index}
                  className="buttonNeutre buttonGrill"
                >
                  {emplacement}
                </button>
              ))}
            </div>
            <hr />
            <div id="frigoGrill">
              <h3>Frigo</h3>
              <br />
              <div id="buttonFrigoGrill">
                {stocksCuisine.length > 0 &&
                  stocksCuisine[7].stockActuel.map((element, i) => (
                    <div key={i} className="buttonUniqueFrigoGrill">
                      <button
                        onClick={() => handleClickFrigoToGrill(element.produit)}
                        className={
                          element.quantite > 0
                            ? "buttonNeutre buttonGrill"
                            : "buttonGrill buttonStockVide"
                        }
                      >
                        {element.produit}
                      </button>
                      <p>quantité : {element.quantite}</p>
                    </div>
                  ))}
              </div>
            </div>
            <hr />
            <div id="finModal">
              <div id="commandeFrigoGrill">
                <h3>Commande</h3>
                <div id="ensembleCommandeGrill">
                  {commandeSteak.map(
                    (steak: string | string[], index: number) => (
                      <button
                        key={index}
                        disabled={true}
                        className="commandeUniquePage commandeSteak"
                      >
                        {typeof steak === "string" ? (
                          steak
                        ) : (
                          <ul>
                            {steak.map((unique: string, i: number) => (
                              <li key={i}>{unique}</li>
                            ))}
                          </ul>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grill;
