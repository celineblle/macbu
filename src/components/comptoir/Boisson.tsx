import React, { useEffect, useRef, useState } from "react";
import close from "../../assets/close.svg";
import { taille, boisson, gobelet } from "../../elements/stocks";
import "./Boisson.css";

function PosteBoisson() {
  interface Boisson {
    nom?: string;
    base?: string;
    emballage?: string;
    tailleProduit?: string;
    type?: string;
    sousType?: string;
  }

  const taillePosteBoisson: number = 10;

  const [buttonActionModalBoisson, setButtonActionModalBoisson] =
    useState<boolean>(false);
  const [currentBoisson, setCurrentBoisson] = useState<Boisson>({});
  const [fontaine, setFontaine] = useState<Boisson[]>([]);
  const [fontainePret, setFontainePret] = useState<Boisson[]>([]);
  const [placeVideBoisson, setPlaceVideBoisson] = useState<string[]>([]);

  const fontaineRef = useRef<Boisson[]>([]);
  const fontainePretRef = useRef<Boisson[]>([]);

  useEffect(() => {
    fontaineRef.current = fontaine;
  }, [fontaine]);

  useEffect(() => {
    fontainePretRef.current = fontainePret;
  }, [fontainePret]);

  function handleClickActionModal(): void {
    setButtonActionModalBoisson(!buttonActionModalBoisson);
  }

  function handleClickBoissonConstruction(element: string): void {
    const copieCurentBoisson: Boisson = structuredClone(currentBoisson);
    if (taille.includes(element)) {
      copieCurentBoisson.tailleProduit = element;
    } else {
      copieCurentBoisson.base = element;
    }
    setCurrentBoisson(copieCurentBoisson);
  }

  function handleClickPreparationToFontaine(): void {
    const actualSizeBoisson: number =
      fontaineRef.current.length + fontainePretRef.current.length;
    if (actualSizeBoisson < taillePosteBoisson) {
      const copieCurentBoisson: Boisson = structuredClone(currentBoisson);
      if (
        copieCurentBoisson.tailleProduit !== undefined &&
        copieCurentBoisson.base !== undefined
      ) {
        const tailleCurrentBoisson: number = taille.indexOf(
          copieCurentBoisson.tailleProduit
        );
        copieCurentBoisson.nom = copieCurentBoisson.base;
        copieCurentBoisson.emballage = gobelet[tailleCurrentBoisson];
        copieCurentBoisson.type = "boisson";
        copieCurentBoisson.sousType = "cannette";
        setFontaine([...fontaineRef.current, copieCurentBoisson]);
        setTimeout(() => {
          const oldestBoisson: number =
            fontaineRef.current.indexOf(copieCurentBoisson);
          const tabFontaineCopie: Boisson[] = fontaineRef.current.slice();
          tabFontaineCopie.splice(oldestBoisson, 1);
          setFontaine(tabFontaineCopie);
          setFontainePret([...fontainePretRef.current, copieCurentBoisson]);
        }, 2000);
      }
    }
  }

  useEffect(() => {
    const actualSizeBoisson: number =
      fontaineRef.current.length + fontainePretRef.current.length;
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

  return (
    <div id="boissonComponent" className="component">
      <button className="buttonModal" onClick={handleClickActionModal}>
        boisson
      </button>
      <div id="pageContentBoisson">
        <h3>Fontaine</h3>
        <ul id="boissonListePage">
          {fontainePret.map((emplacement: Boisson, index: number) => (
            <li key={index} onClick={() => handleClickTransfertBoisson(index)}>
              <p>
                {emplacement.tailleProduit} {emplacement.base}
              </p>
            </li>
          ))}
          {placeVideBoisson.map((emplacement: string, index: number) => (
            <li key={index}>
              <p>{emplacement}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={buttonActionModalBoisson ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div id="headerModal">
            <h2>Boisson</h2>
            <button
              onClick={handleClickActionModal}
              className="closeModalButton"
            >
              {" "}
              <img alt="fermer" title="fermer" src={close}></img>
            </button>
          </div>
          <div id="modalContentBoisson">
            <div id="modalGaucheBoisson">
              <h3>Fontaine</h3>
              <div id="fontaineBoisson">
                {fontainePret.map((emplacement: Boisson, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleClickTransfertBoisson(index)}
                    className="buttonPret buttonFontaine"
                  >
                    {emplacement.tailleProduit} {emplacement.base}
                  </button>
                ))}
                {fontaine.map((emplacement: Boisson, index: number) => (
                  <button
                    disabled={true}
                    key={index}
                    className="buttonCuisson buttonFontaine"
                  >
                    {emplacement.tailleProduit} {emplacement.base}
                  </button>
                ))}
                {placeVideBoisson.map((emplacement: string, index: number) => (
                  <button key={index} className="buttonNeutre buttonVide">
                    {emplacement}
                  </button>
                ))}
              </div>
              <br />
              <button id="buttonJeter">Jeter</button>
            </div>
            <hr />
            <div id="modalCentreBoisson">
              <h3>Preparation</h3>
              <h4>Saveur</h4>
              <div className="ensembleButton">
                {boisson.map((element: string, index: number) => (
                  <button
                    onClick={() => handleClickBoissonConstruction(element)}
                    key={index}
                    className="buttonNeutre buttonSaveur"
                  >
                    {element}
                  </button>
                ))}
              </div>
              <h4>Taille</h4>
              <div className="ensembleButton">
                {taille.map((element: string, index: number) => (
                  <button
                    onClick={() => handleClickBoissonConstruction(element)}
                    key={index}
                    className="buttonNeutre buttonTaille"
                  >
                    {element}
                  </button>
                ))}
              </div>
              <br />
              <button
                onClick={handleClickPreparationToFontaine}
                id="buttonLancer"
              >
                Lancer
              </button>
            </div>
            <hr />
            <div id="modalDroiteBoisson">
              <div className="finModalBoisson">
                <h3>Commande</h3>
              </div>
              <hr />
              <div className="finModalBoisson">
                <h3>Stock</h3>
                <ul>
                  {boisson.map((element: string, index: number) => (
                    <li key={index}>{element} : X</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosteBoisson;
