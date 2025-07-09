import React, { useEffect, useRef, useState, useContext } from "react";
import "./FriteuseNugget.css";
import close from "../../assets/close.svg";
import { Produit } from "../../elements/burgers";
import {
  Friture,
  frituresCuisineQuantite,
} from "../../elements/ingredientsQuantite";
import {
  NuggetsContextSetter,
  CommandesAPreparerContext,
  BoiteNugget,
  NuggetsContext,
} from "../../CommandeContext";
import {
  demantelerMenu,
  quiEstQuoi,
  retirerStock,
} from "../../elements/function";
import {
  StocksActuelsType,
  StocksActuelInteriorType,
} from "../../StocksActuels";

function FriteuseNugget({
  bacFriture,
  setBacFriture,
  bacFritureRef,
  stocksCuisine,
  setStocksCuisine,
}: {
  bacFriture: Friture[];
  setBacFriture: React.Dispatch<React.SetStateAction<Friture[]>>;
  bacFritureRef: React.RefObject<Friture[]>;
  stocksCuisine: StocksActuelsType[];
  setStocksCuisine: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>;
}) {
  const nuggetsStateContext = useContext(NuggetsContext);
  const setNuggetsStateContext = useContext(NuggetsContextSetter);
  const commandeAPreparer = useContext(CommandesAPreparerContext);

  const tailleFriteuseGp: number = 5;
  let standByTimeOutFriteuseGp: number = 0;
  const [modalActionFriteuseNugget, setModalActionFriteuseNugget] =
    useState<boolean>(false);
  const [friteuseGp, setFriteuseGp] = useState<Friture[]>([]);
  const [friteuseGpPret, setFriteuseGpPret] = useState<Friture[]>([]);
  const [friteuseGpGrille, setFriteuseGpGrille] = useState<Friture[]>([]);
  const [timeOutPretFriteuseGpId, setTimeOutPretFriteuseGpId] = useState<
    number[]
  >([]);
  const [placeVideFriteuseGp, setPlaceVideFriteuseGp] = useState<string[]>([]);
  const [commandeNugget, setCommandeNugget] = useState<(string | string[])[]>(
    []
  );

  const friteuseGpRef = useRef<Friture[]>([]);
  const pretGpRef = useRef<Friture[]>([]);
  const grilleGpRef = useRef<Friture[]>([]);

  useEffect(() => {
    friteuseGpRef.current = friteuseGp;
  }, [friteuseGp]);

  useEffect(() => {
    pretGpRef.current = friteuseGpPret;
  }, [friteuseGpPret]);

  useEffect(() => {
    grilleGpRef.current = friteuseGpGrille;
  }, [friteuseGpGrille]);

  function handleClickToggleModal(): void {
    setModalActionFriteuseNugget(!modalActionFriteuseNugget);
  }

  function friteuseGpStandBy(element: Friture): void {
    standByTimeOutFriteuseGp = setTimeout(() => {
      setFriteuseGpGrille([...grilleGpRef.current, element]);
      const oldestFritureGp: number = pretGpRef.current.indexOf(element);
      const tabFritureGpPretCopie: Friture[] = pretGpRef.current.slice();
      tabFritureGpPretCopie.splice(oldestFritureGp, 1);
      setFriteuseGpPret(tabFritureGpPretCopie);
    }, 5000);
    setTimeOutPretFriteuseGpId([
      ...timeOutPretFriteuseGpId,
      standByTimeOutFriteuseGp,
    ]);
  }

  function handleClickFrigoToFriteuseGp(element: Friture): void {
    const stockFrigoFriture: StocksActuelInteriorType | undefined =
      stocksCuisine[1].stockActuel.find((e) => e.produit === element.friture);

    if (stockFrigoFriture !== undefined && stockFrigoFriture.quantite > 0) {
      const actualSizeFriteuseGp: number =
        friteuseGp.length + friteuseGpPret.length + friteuseGpGrille.length;

      if (actualSizeFriteuseGp < tailleFriteuseGp) {
        setFriteuseGp([...friteuseGp, element]);

        retirerStock(
          stocksCuisine,
          setStocksCuisine,
          "friture",
          stockFrigoFriture
        );

        setTimeout(() => {
          setFriteuseGpPret([...pretGpRef.current, element]);
          const oldestFritureGp: number =
            friteuseGpRef.current.indexOf(element);
          const tabFritureGpCopie: Friture[] = friteuseGpRef.current.slice();
          tabFritureGpCopie.splice(oldestFritureGp, 1);
          setFriteuseGp(tabFritureGpCopie);
          friteuseGpStandBy(element);
        }, 2000);
      }
    }
  }

  useEffect(() => {
    const actualSizeFriteuseGp: number =
      friteuseGp.length + friteuseGpPret.length + friteuseGpGrille.length;
    const placeVide: string[] = [];
    if (actualSizeFriteuseGp < tailleFriteuseGp) {
      for (let i = actualSizeFriteuseGp; i < tailleFriteuseGp; i++) {
        placeVide.push("Vide");
      }
    }
    setPlaceVideFriteuseGp(placeVide);
  }, [friteuseGp, friteuseGpPret, friteuseGpGrille]);

  function handleClickAvailabilityFriture(element: Friture): void {
    const getReadyFriture: number = friteuseGpPret.indexOf(element);
    let timeOutIdCopie: number[] = timeOutPretFriteuseGpId.slice();
    const friteTimeOutId = timeOutIdCopie[getReadyFriture];
    clearTimeout(friteTimeOutId);
    timeOutIdCopie = timeOutIdCopie.filter((e) => e !== friteTimeOutId);
    setTimeOutPretFriteuseGpId(timeOutIdCopie);
    const tabCuissonCopie: Friture[] = friteuseGpPret.slice();
    tabCuissonCopie.splice(getReadyFriture, 1);
    setFriteuseGpPret(tabCuissonCopie);
    const indexCurrentFrit: number = bacFritureRef.current.findIndex(
      (e) => e.friture === element.friture
    );
    const copieBacFriture: Friture[] = bacFritureRef.current.slice();
    copieBacFriture[indexCurrentFrit].quantiteSachet =
      copieBacFriture[indexCurrentFrit].quantiteSachet + element.quantiteSachet;
    setBacFriture(copieBacFriture);
  }

  function handleClickPoubelle(element: Friture): void {
    const oldestFritureNugget: number = friteuseGpGrille.indexOf(element);
    const tabGrilleCopie: Friture[] = friteuseGpGrille.slice();
    tabGrilleCopie.splice(oldestFritureNugget, 1);
    setFriteuseGpGrille(tabGrilleCopie);
  }

  function handleClickGetNuggetBox(
    nugget: BoiteNugget,
    indexBoite: number
  ): void {
    if (bacFritureRef.current[0].quantiteSachet > nugget.nombreNugget) {
      const allBoite: BoiteNugget[] = nuggetsStateContext.slice();
      allBoite[indexBoite].quantitePret = allBoite[indexBoite].quantitePret + 1;
      if (setNuggetsStateContext !== undefined) {
        setNuggetsStateContext(allBoite);
      }
      const copieBacFriture = bacFritureRef.current.slice();
      copieBacFriture[0].quantiteSachet =
        copieBacFriture[0].quantiteSachet - nugget.nombreNugget;
      setBacFriture(copieBacFriture);
    }
  }

  useEffect(() => {
    const commandesSansMenu: Produit[][] = demantelerMenu(commandeAPreparer);

    const commandesDuPoste: string[][] = quiEstQuoi(
      "nugget",
      commandesSansMenu
    );
    setCommandeNugget(commandesDuPoste);
  }, [commandeAPreparer]);

  return (
    <div id="friteuseNuggetComponent" className="component">
      <button className="buttonModal" onClick={handleClickToggleModal}>
        Friteuse Nugget
      </button>
      <div id="pageContentNugget">
        <div>
          <h4>Pret</h4>
        </div>
        <hr />
        <div>
          <h4>Stock</h4>
        </div>
      </div>

      <div
        id="modalFriteuseNugget"
        className={modalActionFriteuseNugget ? "modalOpen" : "modalClose"}
      >
        <div className="modalContent">
          <div id="headerModal">
            <h2>Nugget</h2>
            <button
              onClick={handleClickToggleModal}
              className="closeModalButton"
            >
              {" "}
              <img alt="fermer" title="fermer" src={close}></img>
            </button>
          </div>
          <div id="modalNuggetContent">
            <div className="nuggetConstructeur" id="pretNugget">
              <div>
                <h3>Pret</h3>
                {bacFriture.map((emplacement: Friture, index: number) => (
                  <button key={index} className="buttonNeutre buttonFrigo">
                    {emplacement.friture} : {emplacement.quantiteSachet}
                  </button>
                ))}
              </div>
              <div>
                <h3>Boite à nugget</h3>
                {nuggetsStateContext.map((nugget, index) => (
                  <div key={index}>
                    <button
                      className="buttonNeutre buttonFrigo"
                      onClick={() => handleClickGetNuggetBox(nugget, index)}
                    >
                      {nugget.friture}
                    </button>
                    <p className="compteurBoite">{`Boite pret : ${nugget.quantitePret}`}</p>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="nuggetConstructeur" id="cuissonNugget">
              <h3>Cuisson</h3>
              <div className="preparationFriteuseNugget">
                {friteuseGpGrille.map((emplacement: Friture, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleClickPoubelle(emplacement)}
                    className="buttonGrille cuissonNugget"
                  >
                    {emplacement.friture}
                  </button>
                ))}
                {friteuseGpPret.map((emplacement: Friture, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleClickAvailabilityFriture(emplacement)}
                    className="buttonPret cuissonNugget"
                  >
                    {emplacement.friture}
                  </button>
                ))}
                {friteuseGp.map((emplacement: Friture, index: number) => (
                  <button
                    disabled={true}
                    key={index}
                    className="buttonCuisson cuissonNugget"
                  >
                    {emplacement.friture}
                  </button>
                ))}
                {placeVideFriteuseGp.map(
                  (emplacement: string, index: number) => (
                    <button key={index} className="buttonNeutre cuissonNugget">
                      {emplacement}
                    </button>
                  )
                )}
              </div>
              <h3>Frigo</h3>
              <div className="preparationFriteuseNugget">
                {frituresCuisineQuantite.map(
                  (emplacement: Friture, index: number) => (
                    <button
                      onClick={() => handleClickFrigoToFriteuseGp(emplacement)}
                      key={index}
                      className="buttonNeutre buttonFrigo"
                    >
                      {emplacement.friture} : {emplacement.quantiteSachet}
                    </button>
                  )
                )}
              </div>
              <h3>Stocks frigo</h3>
              <ul>
                {stocksCuisine.length > 0 &&
                  stocksCuisine[1].stockActuel.map((element, index: number) => (
                    <li key={index}>
                      {element.produit} : {element.quantite}
                    </li>
                  ))}
              </ul>
            </div>
            <hr />
            <div className="nuggetConstructeur" id="commandeNugget">
              <h3>Commandes</h3>
              {commandeNugget.map((nug: string | string[], index: number) => (
                <button
                  key={index}
                  className="commandeUniquePage commandeNuggetButton"
                  disabled={true}
                >
                  {typeof nug === "string" ? (
                    nug
                  ) : (
                    <ul>
                      {nug.map((unique: string, i: number) => (
                        <li key={i}>{unique}</li>
                      ))}
                    </ul>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriteuseNugget;
