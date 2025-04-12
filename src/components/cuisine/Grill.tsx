import React, { useEffect, useState, useRef } from "react";
import "./Grill.css";
import close from "../../assets/close.svg";
import { viande } from "../../elements/stocks";

function Grill() {
  const limitSizeGrill: number = 8;
  let standByTimeOut: number = 0;
  const [toggleModalGrill, setToggleModalGrill] = useState<boolean>(false);
  const [plaqueDeCuisson, setPlaqueDeCuisson] = useState<string[]>([]);
  const [plaqueDeCuissonPret, setPlaqueDeCuissonPret] = useState<string[]>([]);
  const [plaqueDeCuissonGrille, setPlaqueDeCuissonGrille] = useState<string[]>(
    []
  );
  const [placeVideGrill, setPlaceVideGrill] = useState<string[]>([]);
  const [timeOutPretId, setTimeOutPretId] = useState<number[]>([]);

  const tabCuisson = useRef<string[]>([]);
  const tabPret = useRef<string[]>([]);
  const tabGrille = useRef<string[]>([]);
  const timeOutPretRef = useRef<number[]>([]);

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
  }, [timeOutPretId]);

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
    const placeVide: string[] = [];
    if (actualSizeGrill < limitSizeGrill) {
      for (let i = actualSizeGrill; i < limitSizeGrill; i++) {
        placeVide.push("Vide");
      }
    }
    setPlaceVideGrill(placeVide);
  }, [plaqueDeCuisson, plaqueDeCuissonPret, plaqueDeCuissonGrille]);

  function handleClickAvailabilitySteak(element: string): void {
    const getReadySteak: number = tabPret.current.indexOf(element);
    const timeOutIdCopie: number[] = timeOutPretRef.current.slice();
    const steakTimeOutId = timeOutIdCopie[getReadySteak];
    clearTimeout(steakTimeOutId);
    const tabCuissonCopie: string[] = tabPret.current.slice();
    tabCuissonCopie.splice(getReadySteak, 1);
    setPlaqueDeCuissonPret(tabCuissonCopie);
  }

  function handleClickPoubelle(element: string): void {
    const oldestSteak: number = tabGrille.current.indexOf(element);
    const tabGrilleCopie: string[] = tabGrille.current.slice();
    tabGrilleCopie.splice(oldestSteak, 1);
    setPlaqueDeCuissonGrille(tabGrilleCopie);
  }

  return (
    <div id="grillComponent" className="component">
      <button className="buttonModal" onClick={handleClickToggleModal}>
        grill
      </button>
    <div id="pageContent">
      <div id="stockPretPage">
        <h3>Pret</h3>
        <ul className="listStock">
          {viande.map((element) => (
            <li key={element}>{element} : X</li>
          ))}
        </ul>
      </div>
      <hr />
      <div id="stockFrigoPage">
        <h3>Stock</h3>
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
          <div id="modalGrillContent">
            <div id="stockPretGrill">
              <h3>Pret</h3>
              <ul>
                {viande.map((element) => (
                  <li key={element}>{element} : X</li>
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
                {viande.map((element) => (
                  <>
                    <button
                      key={element}
                      onClick={() => handleClickFrigoToGrill(element)}
                      className="buttonNeutre buttonGrill"
                    >
                      {element}
                    </button>
                    <p>quantité : x</p>
                  </>
                ))}
              </div>
            </div>
            <hr />
            <div id="stockFrigoGrill">
              <h3>Stock</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grill;
