import React, { useEffect, useRef, useState } from "react";
import "./FriteuseNugget.css";
import close from "../../assets/close.svg";
import {
  Friture,
  frituresCuisineQuantite,
} from "../../elements/ingredientsQuantite";

function FriteuseNugget() {
  const tailleFriteuseGp: number = 4;
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

  const friteuseGpRef = useRef<Friture[]>([]);
  const pretGpRef = useRef<Friture[]>([]);
  const grilleGpRef = useRef<Friture[]>([]);
  const timeOutPretFriteuseGpRef = useRef<number[]>([]);

  useEffect(() => {
    friteuseGpRef.current = friteuseGp;
  }, [friteuseGp]);

  useEffect(() => {
    pretGpRef.current = friteuseGpPret;
  }, [friteuseGpPret]);

  useEffect(() => {
    grilleGpRef.current = friteuseGpGrille;
  }, [friteuseGpGrille]);

  useEffect(() => {
    timeOutPretFriteuseGpRef.current = timeOutPretFriteuseGpId;
  }, [timeOutPretFriteuseGpId]);

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
      ...timeOutPretFriteuseGpRef.current,
      standByTimeOutFriteuseGp,
    ]);
  }

  function handleClickFrigoToFriteuseGp(element: Friture): void {
    const actualSizeFriteuseGp: number =
      friteuseGpRef.current.length +
      pretGpRef.current.length +
      grilleGpRef.current.length;

    if (actualSizeFriteuseGp < tailleFriteuseGp) {
      setFriteuseGp([...friteuseGp, element]);
      setTimeout(() => {
        setFriteuseGpPret([...pretGpRef.current, element]);
        const oldestFritureGp: number = friteuseGpRef.current.indexOf(element);
        const tabFritureGpCopie: Friture[] = friteuseGpRef.current.slice();
        tabFritureGpCopie.splice(oldestFritureGp, 1);
        setFriteuseGp(tabFritureGpCopie);
        friteuseGpStandBy(element);
      }, 2000);
    }
  }

  useEffect(() => {
    const actualSizeFriteuseGp: number =
      friteuseGpRef.current.length +
      pretGpRef.current.length +
      grilleGpRef.current.length;
    const placeVide: string[] = [];
    if (actualSizeFriteuseGp < tailleFriteuseGp) {
      for (let i = actualSizeFriteuseGp; i < tailleFriteuseGp; i++) {
        placeVide.push("Vide");
      }
    }
    setPlaceVideFriteuseGp(placeVide);
  }, [friteuseGp, friteuseGpPret, friteuseGpGrille]);

  function handleClickAvailabilityFriture(element: Friture): void {
    const getReadyFriture: number = pretGpRef.current.indexOf(element);
    const timeOutIdCopie: number[] = timeOutPretFriteuseGpRef.current.slice();
    const friteTimeOutId = timeOutIdCopie[getReadyFriture];
    clearTimeout(friteTimeOutId);
    const tabCuissonCopie: Friture[] = pretGpRef.current.slice();
    tabCuissonCopie.splice(getReadyFriture, 1);
    setFriteuseGpPret(tabCuissonCopie);
  }

  function handleClickPoubelle(element: Friture): void {
    const oldestFritureNugget: number = grilleGpRef.current.indexOf(element);
    const tabGrilleCopie: Friture[] = grilleGpRef.current.slice();
    tabGrilleCopie.splice(oldestFritureNugget, 1);
    setFriteuseGpGrille(tabGrilleCopie);
  }

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
              <h3>Pret</h3>
              <div></div>
              <h3>Boite à nugget</h3>
              <h3>Stocks boites</h3>
            </div>
            <hr />
            <div className="nuggetConstructeur" id="cuissonNugget">
              <h3>Cuisson</h3>
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
              {placeVideFriteuseGp.map((emplacement: string, index: number) => (
                <button key={index} className="buttonNeutre cuissonNugget">
                  {emplacement}
                </button>
              ))}
              <h3>Frigo</h3>
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
              <h3>Stocks frigo</h3>
            </div>
            <hr />
            <div className="nuggetConstructeur" id="commandeNugget">
              <h3>Commandes</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriteuseNugget;
