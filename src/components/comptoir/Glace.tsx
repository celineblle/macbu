import React, { useEffect, useRef, useState } from "react";
import "./Glace.css";
import { gobelet, glaceToppings } from "../../elements/stocks";

function Glace () {

    interface FinalGlace {
        coulis?: string,
        topping?: string,
        emballage?: string,
    }

    const coulis: string[] = [glaceToppings[0], glaceToppings[1]];

    function getOnlyEclats(): string[] {
        const tableauEclats: string[]= [];
        for(let i = 2; i < glaceToppings.length; i++) {
            tableauEclats.push(glaceToppings[i])
        }
        return tableauEclats;
    }

    const toppings: string[] = getOnlyEclats();
    const taillePosteGlace: number = 6;
    let standByTimeOutGlace: number = 0;


    const [toggleTabGlace, setToggleTabGlace] =
    useState<string>("poste glace");
    const [currentGlace, setCurrentGlace] = useState<FinalGlace>({})
    const [posteGlace, setPosteGlace] = useState<FinalGlace[]>([]);
    const [posteGlacePret, setPosteGlacePret] = useState<FinalGlace[]>([]);
    const [posteGlaceFondue, setPosteGlaceFondue] = useState<FinalGlace[]>([]);
    const [timeOutPretPosteGlaceId, setTimeOutPretPosteGlaceId] = useState<number[]>(
      []
    );
    const [placeVidePosteGlace, setPlaceVidePosteGlace] = useState<string[]>([])
  
    const posteGlaceRef = useRef<FinalGlace[]>([]);
    const posteGlacePretRef = useRef<FinalGlace[]>([]);
    const posteGlaceFondueRef = useRef<FinalGlace[]>([]);
    const timeOutPretPosteGlaceRef = useRef<number[]>([]);

    useEffect(() => {
        posteGlaceRef.current = posteGlace;
      }, [posteGlace]);
    
      useEffect(() => {
        posteGlacePretRef.current = posteGlacePret;
      }, [posteGlacePret]);
    
      useEffect(() => {
        posteGlaceFondueRef.current = posteGlaceFondue;
      }, [posteGlaceFondue]);
    
      useEffect(() => {
        timeOutPretPosteGlaceRef.current = timeOutPretPosteGlaceId;
      }, [timeOutPretPosteGlaceId]);


    function handleClickTabButtonGlace(element: string): void {
        setToggleTabGlace(element);
      }

      function posteGlaceStandBy(element: FinalGlace): void {
        standByTimeOutGlace = setTimeout(() => {
          setPosteGlaceFondue([...posteGlaceFondueRef.current, element]);
          const oldestGlace: number = posteGlacePretRef.current.indexOf(element);
          const tabPosteGlacePretCopie: FinalGlace[] = posteGlacePretRef.current.slice();
          tabPosteGlacePretCopie.splice(oldestGlace, 1);
          setPosteGlacePret(tabPosteGlacePretCopie);
        }, 10000)
        setTimeOutPretPosteGlaceId([...timeOutPretPosteGlaceRef.current, standByTimeOutGlace]);
      }

  function handleClickGlaceConstruction(element: string): void {
    const copieCurentGlace: FinalGlace = structuredClone(currentGlace);
    if(coulis.includes(element)) {
        copieCurentGlace.coulis = element;
    } else {
        copieCurentGlace.topping = element
    }
    setCurrentGlace(copieCurentGlace)
  }

  function handleClickFrigoToPosteGlace(): void {
    const actualSizeGlace: number =
    posteGlaceRef.current.length +
    posteGlacePretRef.current.length + posteGlaceFondueRef.current.length ;
    if(actualSizeGlace < taillePosteGlace) {
        const copieCurentGlace: FinalGlace = structuredClone(currentGlace);
            if(copieCurentGlace.coulis !== undefined && copieCurentGlace.topping !== undefined) {
                copieCurentGlace.emballage = gobelet[3]
                setPosteGlace([...posteGlaceRef.current, copieCurentGlace])
                setTimeout(() => {
                    const oldestGlace: number = posteGlaceRef.current.indexOf(copieCurentGlace)
                    const tabPosteGlaceCopie: FinalGlace[] = posteGlaceRef.current.slice();
                    tabPosteGlaceCopie.splice(oldestGlace, 1);
                    setPosteGlace(tabPosteGlaceCopie);
                    setPosteGlacePret([...posteGlacePretRef.current, copieCurentGlace]);
                    posteGlaceStandBy(copieCurentGlace)
                }, 2000)
            }
        }
    } 

    function handleClickAvailabilityGlace(element: number): void {
        const timeOutIdCopie: number[] = timeOutPretPosteGlaceRef.current.slice();
        const glaceTimeOutId = timeOutIdCopie[element];
        clearTimeout(glaceTimeOutId);
        const tabPosteGlaceCopie: FinalGlace[] = posteGlacePretRef.current.slice();
        tabPosteGlaceCopie.splice(element, 1);
        setPosteGlacePret(tabPosteGlaceCopie);
      }
    
      function handleClickPoubelle(element: number): void {
        const tabFondueCopie: FinalGlace[] = posteGlaceFondueRef.current.slice();
        tabFondueCopie.splice(element, 1);
        setPosteGlaceFondue(tabFondueCopie);
      }

    useEffect(() => {
        const actualSizeGlace: number =
        posteGlaceRef.current.length +
        posteGlacePretRef.current.length + posteGlaceFondueRef.current.length ;
        const placeVide: string[] = [];
        if (actualSizeGlace < taillePosteGlace) {
          for (let i = actualSizeGlace; i < taillePosteGlace; i++) {
            placeVide.push("Vide");
          }
        }
        setPlaceVidePosteGlace(placeVide);
      }, [posteGlace, posteGlacePret, posteGlaceFondue]);

      const style = {
        color: "blue"
      }

      console.log("pret", posteGlacePret)
      console.log("fondu", posteGlaceFondue)


    return ( <div id="glaceComponent">
        <h2 id="buttonGlace">glace</h2>
        
        <div id="tabContentGlace">
        <div className="glaceTabButton">
          <button
            className="tabLinksGlaceButton"
            onClick={() => handleClickTabButtonGlace("poste glace")}
          >
            Poste glace
          </button>
          <button
            className="tabLinksGlaceButton"
            onClick={() => handleClickTabButtonGlace("frigo")}
          >
            Frigo
          </button>
        </div>
        <div
          className={
            toggleTabGlace === "poste glace"
              ? "tabGlaceContent"
              : "tabGlaceContentHidden"
          }
          id="posteGlace"
        >
          {posteGlaceFondue.map((emplacement: FinalGlace, index: number) => (
            <button style={style} key={index} onClick={() => handleClickPoubelle(index)}>{emplacement.coulis} {emplacement.topping}</button>
          ))}
          {posteGlacePret.map((emplacement: FinalGlace, index: number) => (
            <button key={index} onClick={() => handleClickAvailabilityGlace(index)}>{emplacement.coulis} {emplacement.topping}</button>
          ))}
          {posteGlace.map((emplacement: FinalGlace, index: number) => (
            <button disabled={true} key={index}>{emplacement.coulis} {emplacement.topping}</button>
          ))}
           {placeVidePosteGlace.map((emplacement: string, index: number) => (
            <button key={index}>{emplacement}</button>
          ))} 
        </div>
        <div
          className={
            toggleTabGlace === "frigo"
              ? "tabGlaceContent"
              : "tabGlaceContentHidden"
          }
          id="frigoGlace"
        >
            <h3>Coulis</h3>
          {coulis.map(
            (element: string, index: number) => (
              <button
                onClick={() => handleClickGlaceConstruction(element)}
                key={index}
              >
                {element}
              </button>
            )
          )}
          <h3>Toppings</h3>
          {toppings.map(
            (element: string, index: number) => (
              <button
                onClick={() => handleClickGlaceConstruction(element)}
                key={index}
              >
                {element}
              </button>
            )
          )}
          <button onClick={handleClickFrigoToPosteGlace}>Lancer</button>
        </div>
      </div>
      <div>
        <h3>Pret stock</h3>
        <ul>
            {glaceToppings.map((element: string, index: number) => (
            <li key={index}>{element} : X</li>
          ))} 
        </ul>
      </div>
    </div>
        )
}

export default Glace;
