import React, { useEffect, useState, useRef } from "react";
import "./Grill.css";
//import { taille } from "../../elements/stocks";

function Grill() {

  const viande: string[] = [
    "oeuf",
    "jambon",
    "steak",
    "mayo",
    "ketchup",
    "moutarde",
    "pain",
    "salade",
    "bougie",
  ];
  const limitSizeGrill: number = 8;
  let standByTimeOut: number = 0;
  const [toggleTabGrill, setToggleTabGrill] = useState<string>("cuisson");

  function handleClickTabButtonGrill(element: string): void {
    setToggleTabGrill(element);
  }

  const [plaqueDeCuisson, setPlaqueDeCuisson] = useState<string[]>([]);
  const [plaqueDeCuissonPret, setPlaqueDeCuissonPret] = useState<string[]>([]);
  const [plaqueDeCuissonGrille, setPlaqueDeCuissonGrille] = useState<string[]>(
    []
  );
  const [placeVideGrill, setPlaceVideGrill] = useState<string[]>([]);
  const [timeOutPretId, setTimeOutPretId] = useState<number[]>([])

  const tabCuisson = useRef<string[]>([]);
  const tabPret = useRef<string[]>([]);
  const tabGrille = useRef<string[]>([]);
  const timeOutPretRef = useRef<number[]>([])

  useEffect(() => {
    tabCuisson.current = plaqueDeCuisson;
  }, [plaqueDeCuisson]);

  useEffect(() => {
    tabPret.current = plaqueDeCuissonPret;
  }, [plaqueDeCuissonPret]);

  useEffect(() => {
    tabGrille.current = plaqueDeCuissonGrille;
  }, [plaqueDeCuissonGrille]);

  useEffect(() => {
    timeOutPretRef.current = timeOutPretId;
  }, [timeOutPretId])


  function steakCuitStandBy(element: string): void {
    standByTimeOut = setTimeout(() => {
        setPlaqueDeCuissonGrille([...tabGrille.current, element]);
        const oldestSteak: number = tabPret.current.indexOf(element);
        const tabPretCopie: string[] = tabPret.current.slice();
        tabPretCopie.splice(oldestSteak, 1);
        setPlaqueDeCuissonPret(tabPretCopie);
      }, 10000);
      setTimeOutPretId([...timeOutPretRef.current, standByTimeOut]);
  }

  function handleClickFrigoToGrill(element: string): void {
    const actualSizeGrill: number =
      tabCuisson.current.length +
      tabPret.current.length +
      tabGrille.current.length;

    if (actualSizeGrill < limitSizeGrill) {
      setPlaqueDeCuisson([...plaqueDeCuisson, element]);
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

  useEffect(() => {
    const actualSizeGrill: number =
      tabCuisson.current.length +
      tabPret.current.length +
      tabGrille.current.length;
    const placeVide: string[] = []
    if (actualSizeGrill < limitSizeGrill) {
      for (let i = actualSizeGrill; i < limitSizeGrill; i++) {

        placeVide.push("Vide");
      }
    }
    setPlaceVideGrill(placeVide)
  }, [plaqueDeCuisson, plaqueDeCuissonPret, plaqueDeCuissonGrille]);

  function handleClickAvailabilitySteak(element: string): void {
    const getReadySteak: number = tabPret.current.indexOf(element);
    const timeOutIdCopie: number[] = timeOutPretRef.current.slice();
    const steakTimeOutId = timeOutIdCopie[getReadySteak]
    clearTimeout(steakTimeOutId)
    const tabCuissonCopie: string[] = tabPret.current.slice();
    tabCuissonCopie.splice(getReadySteak, 1)
    setPlaqueDeCuissonPret(tabCuissonCopie)
  }

  function handleClickPoubelle(element: string): void {
    const oldestSteak: number = tabGrille.current.indexOf(element);
    const tabGrilleCopie: string[] = tabGrille.current.slice();
    tabGrilleCopie.splice(oldestSteak, 1);
    setPlaqueDeCuissonGrille(tabGrilleCopie)
  }


  console.log("plaque", plaqueDeCuisson);
  console.log("pret", plaqueDeCuissonPret);
  console.log("grille", plaqueDeCuissonGrille)


  return (
    <div id="grillComponent">
      <h2 id="buttonGrill">grill</h2>
      <div id="tabContentGrill">
        <div className="grillTabButton">
          <button
            className="tabLinksGrillButton"
            onClick={() => handleClickTabButtonGrill("cuisson")}
          >
            Cuisson
          </button>
          <button
            className="tabLinksGrillButton"
            onClick={() => handleClickTabButtonGrill("frigo")}
          >
            Frigo
          </button>
        </div>
        <div
          className={
            toggleTabGrill === "cuisson"
              ? "tabGrillContent"
              : "tabGrillContentHidden"
          }
          id="CuissonGrill"
        >
          {plaqueDeCuisson.map((emplacement: string, index: number) => (
            <button disabled={true} key={index}>
              {emplacement}
            </button>
          ))}
          {plaqueDeCuissonPret.map((emplacement: string, index: number) => (
            <button key={index} onClick={() => handleClickAvailabilitySteak(emplacement)}>{emplacement}</button>
          ))}
          {plaqueDeCuissonGrille.map((emplacement: string, index: number) => (
            <button onClick={() => handleClickPoubelle(emplacement)} key={index}>{emplacement}</button>
          ))}
            {placeVideGrill.map((emplacement: string, index: number) => (
            <button disabled={true} key={index}>{emplacement}</button>
          ))}

        </div>
        <div
          className={
            toggleTabGrill === "frigo"
              ? "tabGrillContent"
              : "tabGrillContentHidden"
          }
          id="frigoGrill"
        >
          {viande.map((element) => (
            <div key={element}>
              <button onClick={() => handleClickFrigoToGrill(element)}>
                {element}
              </button>
              <p>quantité : x</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Pret</h3>
        <ul>
          {viande.map((element) => (
            <li key={element}>{element} : X</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Grill;
