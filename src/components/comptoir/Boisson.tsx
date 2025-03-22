import React, { useEffect, useRef, useState } from "react";
import { taille, boisson, gobelet } from "../../elements/stocks";
import "./Boisson.css";

function PosteBoisson() {

  interface Boisson {
    nom?: string,
    base?: string,
    emballage?: string,
    tailleProduit?: string,
    type?: string,
    sousType?: string,
};

  const taillePosteBoisson: number = 10;

  const [toggleTabBoisson, setToggleTabBoisson] = useState<string>("fontaine");
  const [currentBoisson, setCurrentBoisson] = useState<Boisson>({})
  const [fontaine, setFontaine] = useState<Boisson[]>([])
  const [fontainePret, setFontainePret] = useState<Boisson[]>([]);
  const [placeVideBoisson, setPlaceVideBoisson] = useState<string[]>([]);

  const fontaineRef = useRef<Boisson[]>([])
  const fontainePretRef = useRef<Boisson[]>([])

  useEffect(() => {
    fontaineRef.current = fontaine;
  }, [fontaine])

  useEffect(() => {
    fontainePretRef.current = fontainePret
  }, [fontainePret])

  function handleClickTabButtonBoisson(element: string): void {
    setToggleTabBoisson(element);
  }

  function handleClickBoissonConstruction(element: string): void {
    const copieCurentBoisson: Boisson = structuredClone(currentBoisson);
    if(taille.includes(element)) {
        copieCurentBoisson.tailleProduit = element;
    } else {
        copieCurentBoisson.base = element
    }
    setCurrentBoisson(copieCurentBoisson)
  }

  function handleClickPreparationToFontaine(): void {
    const actualSizeBoisson: number =
    fontaineRef.current.length +
    fontainePretRef.current.length ;
    if(actualSizeBoisson < taillePosteBoisson) {
        const copieCurentBoisson: Boisson = structuredClone(currentBoisson);
            if(copieCurentBoisson.tailleProduit !== undefined && copieCurentBoisson.base !== undefined) {
                const tailleCurrentBoisson: number = taille.indexOf(copieCurentBoisson.tailleProduit)
                copieCurentBoisson.nom = copieCurentBoisson.base;
                copieCurentBoisson.emballage = gobelet[tailleCurrentBoisson]
                copieCurentBoisson.type = "boisson";
                copieCurentBoisson.sousType = "cannette"
                setFontaine([...fontaineRef.current, copieCurentBoisson])
                setTimeout(() => {
                    const oldestBoisson: number = fontaineRef.current.indexOf(copieCurentBoisson)
                    const tabFontaineCopie: Boisson[] = fontaineRef.current.slice();
                    tabFontaineCopie.splice(oldestBoisson, 1);
                    setFontaine(tabFontaineCopie);
                    setFontainePret([...fontainePretRef.current, copieCurentBoisson]);

                }, 2000)
            }
        }
    } 

  useEffect(() => {
    const actualSizeBoisson: number =
      fontaineRef.current.length +
      fontainePretRef.current.length ;
    const placeVide: string[] = [];
    if (actualSizeBoisson < taillePosteBoisson) {
      for (let i = actualSizeBoisson; i < taillePosteBoisson; i++) {
        placeVide.push("Vide");
      }
    }
    setPlaceVideBoisson(placeVide);
  }, [fontaine, fontainePret]);
  
  function handleClickTransfertBoisson(boisson: number): void {
 const fontainePretCopie: Boisson[] = fontainePretRef.current.slice();
  fontainePretCopie.splice(boisson, 1);
  setFontainePret(fontainePretCopie);
  }

  console.log(fontainePret[0])

  return (
    <div id="boissonComponent">
      <h2 id="buttonBoisson">boisson</h2>
      <div id="tabContentBoisson">
        <div className="boissonTabButton">
          <button
            className="tabLinksBoissonButton"
            onClick={() => handleClickTabButtonBoisson("fontaine")}
          >
            Fontaine
          </button>
          <button
            className="tabLinksBoissonButton"
            onClick={() => handleClickTabButtonBoisson("preparation")}
          >
            Preparation
          </button>
        </div>
        <div
          className={
            toggleTabBoisson === "fontaine"
              ? "tabBoissonContent"
              : "tabBoissonContentHidden"
          }
          id="fontaineBoisson"
        >
          {fontainePret.map((emplacement: Boisson, index: number) => (
            <button key={index} onClick={() => handleClickTransfertBoisson(index)} >{emplacement.tailleProduit} {emplacement.base}</button>
          ))}
          {fontaine.map((emplacement: Boisson, index: number) => (
            <button disabled={true} key={index}>{emplacement.tailleProduit} {emplacement.base}</button>
          ))}
           {placeVideBoisson.map((emplacement: string, index: number) => (
            <button key={index}>{emplacement}</button>
          ))} 
        </div>
        <button>Jeter</button>
        <div
          className={
            toggleTabBoisson === "preparation"
              ? "tabBoissonContent"
              : "tabBoissonContentHidden"
          }
          id="preparationBoisson"
        >
            <h3>Saveur</h3>
          {boisson.map(
            (element: string, index: number) => (
              <button
                onClick={() => handleClickBoissonConstruction(element)}
                key={index}
              >
                {element}
              </button>
            )
          )}
          <h3>Taille</h3>
          {taille.map(
            (element: string, index: number) => (
              <button
                onClick={() => handleClickBoissonConstruction(element)}
                key={index}
              >
                {element}
              </button>
            )
          )}
          <button onClick={handleClickPreparationToFontaine}>Lancer</button>
        </div>
      </div>
      <div>
        <h3>Pret stock</h3>
        <ul>
          {boisson.map((element: string, index: number) => (
            <li key={index}>{element} : X</li>
          ))} 
        </ul>
      </div>
    </div>
  );
}

export default PosteBoisson;
