import React, { useEffect, useRef, useState } from "react";
import "./FriteuseNugget.css";
import {
  Friture,
  frituresCuisineQuantite,
} from "../../elements/ingredientsQuantite";

function FriteuseNugget() {
  const tailleFriteuseGp: number = 4;
  let standByTimeOutFriteuseGp: number = 0;

  const [toggleTabFriteuseNugget, setToggleTabFriteuseNugget] =
    useState<string>("cuisson");

  function handleClickTabButtonFriteuseNugget(element: string): void {
    setToggleTabFriteuseNugget(element);
  }

  const [friteuseGp, setFriteuseGp] = useState<Friture[]>([]);
  const [friteuseGpPret, setFriteuseGpPret] = useState<Friture[]>([]);
  const [friteuseGpGrille, setFriteuseGpGrille] = useState<Friture[]>([]);
  const [timeOutPretFriteuseGpId, setTimeOutPretFriteuseGpId] = useState<number[]>(
    []
  );
  const [placeVideFriteuseGp, setPlaceVideFiteuseGp] = useState<string[]>([])

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

  function friteuseGpStandBy(element: Friture): void {
    standByTimeOutFriteuseGp = setTimeout(() => {
      setFriteuseGpGrille([...grilleGpRef.current, element]);
      const oldestFritureGp: number = pretGpRef.current.indexOf(element);
      const tabFritureGpPretCopie: Friture[] = pretGpRef.current.slice();
      tabFritureGpPretCopie.splice(oldestFritureGp, 1);
      setFriteuseGpPret(tabFritureGpPretCopie);
    }, 5000)
    setTimeOutPretFriteuseGpId([...timeOutPretFriteuseGpRef.current, standByTimeOutFriteuseGp]);
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
      setPlaceVideFiteuseGp(placeVide);
    }, [friteuseGp, friteuseGpPret, friteuseGpGrille]);
  
    function handleClickAvailabilityFriture(element: Friture): void {
      const getReadyFriture: number = pretGpRef.current.indexOf(element);
      const timeOutIdCopie: number[] = timeOutPretFriteuseGpRef.current.slice();
      const steakTimeOutId = timeOutIdCopie[getReadyFriture];
      clearTimeout(steakTimeOutId);
      const tabCuissonCopie: Friture[] = pretGpRef.current.slice();
      tabCuissonCopie.splice(getReadyFriture, 1);
      setFriteuseGpPret(tabCuissonCopie);
    }
  
    function handleClickPoubelle(element: Friture): void {
      const oldestSteak: number = grilleGpRef.current.indexOf(element);
      const tabGrilleCopie: Friture[] = grilleGpRef.current.slice();
      tabGrilleCopie.splice(oldestSteak, 1);
      setFriteuseGpGrille(tabGrilleCopie);
    }





  return (
    <div id="friteuseNuggetComponent">
      <h2 id="buttonFriteuseNugget">Friteuse Nugget</h2>
      <div id="tabContentFriteuseNugget">
        <div className="friteuseNuggetTabButton">
          <button
            className="tabLinksFriteuseNuggetButton"
            onClick={() => handleClickTabButtonFriteuseNugget("cuisson")}
          >
            Cuisson
          </button>
          <button
            className="tabLinksFriteuseNuggetButton"
            onClick={() => handleClickTabButtonFriteuseNugget("frigo")}
          >
            Frigo
          </button>
        </div>
        <div
          className={
            toggleTabFriteuseNugget === "cuisson"
              ? "tabFriteuseNuggetContent"
              : "tabFriteuseNuggetContentHidden"
          }
          id="CuissonFriteuseNugget"
        >
          {friteuseGpGrille.map((emplacement: Friture, index: number) => (
            <button key={index} onClick={() => handleClickPoubelle(emplacement)}>{emplacement.friture}</button>
          ))}
          {friteuseGpPret.map((emplacement: Friture, index: number) => (
            <button key={index} onClick={() => handleClickAvailabilityFriture(emplacement)}>{emplacement.friture}</button>
          ))}
          {friteuseGp.map((emplacement: Friture, index: number) => (
            <button disabled={true} key={index}>{emplacement.friture}</button>
          ))}
           {placeVideFriteuseGp.map((emplacement: string, index: number) => (
            <button key={index}>{emplacement}</button>
          ))} 
        </div>
        <div
          className={
            toggleTabFriteuseNugget === "frigo"
              ? "tabFriteuseNuggetContent"
              : "tabFriteuseNuggetContentHidden"
          }
          id="frigoFriteuseNugget"
        >
          {frituresCuisineQuantite.map(
            (emplacement: Friture, index: number) => (
              <button
                onClick={() => handleClickFrigoToFriteuseGp(emplacement)}
                key={index}
              >
                {emplacement.friture} : {emplacement.quantiteSachet}
              </button>
            )
          )}
        </div>
      </div>
      <div>
        <h3>Pret stock</h3>
        <ul>
           {frituresCuisineQuantite.map((element: Friture, index: number) => (
            <li key={index}>{element.friture} : X</li>
          ))} 
        </ul>
      </div>
    </div>
  );
}

export default FriteuseNugget;
