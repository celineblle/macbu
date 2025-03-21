import React, { useEffect, useRef, useState } from "react";
import "./Friteuse.css"
import {
    Friture,
    frites,
  } from "../../elements/ingredientsQuantite";
  


function Friteuse () {

    const tailleFriteuse: number = 4;
    let standByTimeOutFriteuse: number = 0;
  
    const [toggleTabFriteuse, setToggleTabFriteuse] =
    useState<string>("cuisson");
    const [friteuse, setFriteuse] = useState<Friture[]>([]);
    const [friteusePret, setFriteusePret] = useState<Friture[]>([]);
    const [friteuseGrille, setFriteuseGrille] = useState<Friture[]>([]);
    const [timeOutPretFriteuseId, setTimeOutPretFriteuseId] = useState<number[]>(
      []
    );
    const [placeVideFriteuse, setPlaceVideFiteuse] = useState<string[]>([])
  
    const friteuseRef = useRef<Friture[]>([]);
    const pretRef = useRef<Friture[]>([]);
    const grilleRef = useRef<Friture[]>([]);
    const timeOutPretFriteuseRef = useRef<number[]>([]);

    useEffect(() => {
        friteuseRef.current = friteuse;
      }, [friteuse]);
    
      useEffect(() => {
        pretRef.current = friteusePret;
      }, [friteusePret]);
    
      useEffect(() => {
        grilleRef.current = friteuseGrille;
      }, [friteuseGrille]);
    
      useEffect(() => {
        timeOutPretFriteuseRef.current = timeOutPretFriteuseId;
      }, [timeOutPretFriteuseId]);

    function handleClickTabButtonFriteuse(element: string): void {
        setToggleTabFriteuse(element);
      }

      function friteuseStandBy(element: Friture): void {
        standByTimeOutFriteuse = setTimeout(() => {
          setFriteuseGrille([...grilleRef.current, element]);
          const oldestFriture: number = pretRef.current.indexOf(element);
          const tabFriturePretCopie: Friture[] = pretRef.current.slice();
          tabFriturePretCopie.splice(oldestFriture, 1);
          setFriteusePret(tabFriturePretCopie);
        }, 5000)
        setTimeOutPretFriteuseId([...timeOutPretFriteuseRef.current, standByTimeOutFriteuse]);
      }

      function handleClickFrigoToFriteuse(element: Friture): void {
        const actualSizeFriteuse: number =
          friteuseRef.current.length +
          pretRef.current.length +
          grilleRef.current.length;
    
        if (actualSizeFriteuse < tailleFriteuse) {
          setFriteuse([...friteuse, element]);
          setTimeout(() => {
            setFriteusePret([...pretRef.current, element]);
            const oldestFriture: number = friteuseRef.current.indexOf(element);
            const tabFritureCopie: Friture[] = friteuseRef.current.slice();
            tabFritureCopie.splice(oldestFriture, 1);
            setFriteuse(tabFritureCopie);
            friteuseStandBy(element);
          }, 2000);
        }
      }

      useEffect(() => {
        const actualSizeFriteuse: number =
          friteuseRef.current.length +
          pretRef.current.length +
          grilleRef.current.length;
        const placeVide: string[] = [];
        if (actualSizeFriteuse < tailleFriteuse) {
          for (let i = actualSizeFriteuse; i < tailleFriteuse; i++) {
            placeVide.push("Vide");
          }
        }
        setPlaceVideFiteuse(placeVide);
      }, [friteuse, friteusePret, friteuseGrille]);

      function handleClickAvailabilityFriture(element: Friture): void {
        const getReadyFriture: number = pretRef.current.indexOf(element);
        const timeOutIdCopie: number[] = timeOutPretFriteuseRef.current.slice();
        const steakTimeOutId = timeOutIdCopie[getReadyFriture];
        clearTimeout(steakTimeOutId);
        const tabCuissonCopie: Friture[] = pretRef.current.slice();
        tabCuissonCopie.splice(getReadyFriture, 1);
        setFriteusePret(tabCuissonCopie);
      }
    
      function handleClickPoubelle(element: Friture): void {
        const oldestSteak: number = grilleRef.current.indexOf(element);
        const tabGrilleCopie: Friture[] = grilleRef.current.slice();
        tabGrilleCopie.splice(oldestSteak, 1);
        setFriteuseGrille(tabGrilleCopie);
      }

    return (
        <div id="friteuseComponent">
        <h2 id="buttonFriteuse">Friteuse</h2>
      <div id="tabContentFriteuse">
        <div className="friteuseTabButton">
          <button
            className="tabLinksFriteuseButton"
            onClick={() => handleClickTabButtonFriteuse("cuisson")}
          >
            Cuisson
          </button>
          <button
            className="tabLinksFriteuseButton"
            onClick={() => handleClickTabButtonFriteuse("frigo")}
          >
            Frigo
          </button>
        </div>
        <div
          className={
            toggleTabFriteuse === "cuisson"
              ? "tabFriteuseContent"
              : "tabFriteuseContentHidden"
          }
          id="CuissonFriteuse"
        >
          {friteuseGrille.map((emplacement: Friture, index: number) => (
            <button key={index} onClick={() => handleClickPoubelle(emplacement)}>{emplacement.friture}</button>
          ))}
          {friteusePret.map((emplacement: Friture, index: number) => (
            <button key={index} onClick={() => handleClickAvailabilityFriture(emplacement)}>{emplacement.friture}</button>
          ))}
          {friteuse.map((emplacement: Friture, index: number) => (
            <button disabled={true} key={index}>{emplacement.friture}</button>
          ))}
           {placeVideFriteuse.map((emplacement: string, index: number) => (
            <button key={index}>{emplacement}</button>
          ))} 
        </div>
        <div
          className={
            toggleTabFriteuse === "frigo"
              ? "tabFriteuseContent"
              : "tabFriteuseContentHidden"
          }
          id="frigoFriteuse"
        >
          {frites.map(
            (emplacement: Friture, index: number) => (
              <button
                onClick={() => handleClickFrigoToFriteuse(emplacement)}
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
           {frites.map((element: Friture, index: number) => (
            <li key={index}>{element.friture} : X</li>
          ))} 
        </ul>
      </div>
    </div>
       
    )
}

export default Friteuse;


  

 
