import React, { useEffect, useRef, useState, useContext } from "react";
import close from "../../assets/close.svg";
import { taille, boisson } from "../../elements/stocks";
import "./Boisson.css";
import { CommandesAPreparerContext } from "../../CommandeContext";
import { Produit, ProduitEtMenu } from "../../elements/burgers";

function PosteBoisson({
  fontainePret,
  setFontainePret,
  fontainePretRef,
}: {
  fontainePret: string[];
  setFontainePret: React.Dispatch<React.SetStateAction<string[]>>;
  fontainePretRef: React.RefObject<string[]>;
}) {
  interface Boisson {
    nom?: string;
    base?: string;
    tailleProduit?: string;
    type?: string;
    sousType?: string;
  }

  const commandeAPreparer = useContext(CommandesAPreparerContext);
  const taillePosteBoisson: number = 10;

  const [buttonActionModalBoisson, setButtonActionModalBoisson] =
    useState<boolean>(false);
  const [currentBoisson, setCurrentBoisson] = useState<Boisson>({});
  const [fontaine, setFontaine] = useState<Boisson[]>([]);
  const [placeVideBoisson, setPlaceVideBoisson] = useState<string[]>([]);
  const [commandeBoisson, setCommandeBoisson] = useState<(string[] | string)[]>(
    []
  );

  const fontaineRef = useRef<Boisson[]>([]);

  useEffect(() => {
    fontaineRef.current = fontaine;
  }, [fontaine]);

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
        copieCurentBoisson.nom = copieCurentBoisson.base;
        copieCurentBoisson.type = "boisson";
        copieCurentBoisson.sousType = "cannette";
        setFontaine([...fontaineRef.current, copieCurentBoisson]);
        setTimeout(() => {
          const oldestBoisson: number =
            fontaineRef.current.indexOf(copieCurentBoisson);
          const tabFontaineCopie: Boisson[] = fontaineRef.current.slice();
          tabFontaineCopie.splice(oldestBoisson, 1);
          setFontaine(tabFontaineCopie);
          const finalBoisson: string = `${copieCurentBoisson.tailleProduit} ${copieCurentBoisson.base}`;
          setFontainePret([...fontainePretRef.current, finalBoisson]);
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
    const fontainePretCopie: string[] = fontainePretRef.current.slice();
    fontainePretCopie.splice(boisson, 1);
    setFontainePret(fontainePretCopie);
  }

  useEffect(() => {
    const currentCommande: string[][] = [];
    let commandeUnique: string[] = [];
    function isItBoisson(element: Produit) {
      if ("saveur" in element) {
        const boissonAffichageCommande: string = `${element.tailleProduit} ${element.saveur}`;
        commandeUnique.push(boissonAffichageCommande);
      }
    }

    for (let i = 0; i < commandeAPreparer.length; i++) {
      for (let j = 0; j < commandeAPreparer[i].length; j++) {
        const currentElement: ProduitEtMenu = commandeAPreparer[i][j];
        if ("boisson" in currentElement) {
          isItBoisson(currentElement.boisson);
        } else if (!("boisson" in currentElement)) {
          isItBoisson(currentElement);
        }
      }
      if (commandeUnique.length > 0) {
        currentCommande.push(commandeUnique);
        commandeUnique = [];
      }
    }
    setCommandeBoisson(currentCommande);
  }, [commandeAPreparer]);

  return (
    <div id="boissonComponent" className="component">
      <button className="buttonModal" onClick={handleClickActionModal}>
        boisson
      </button>
      <div id="pageContentBoisson">
        <h3>Fontaine</h3>
        <ul id="boissonListePage">
          {fontainePret.map((emplacement: string, index: number) => (
            <li key={index} onClick={() => handleClickTransfertBoisson(index)}>
              <p>{emplacement}</p>
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
                {fontainePret.map((emplacement: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleClickTransfertBoisson(index)}
                    className="buttonPret buttonFontaine"
                  >
                    {emplacement}
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
              <div id="commandeModalBoisson">
                <h3>Commande</h3>
                {commandeBoisson.map(
                  (boisson: string | string[], index: number) => (
                    <button
                      className="commandeUniquePage commandeBoisson"
                      key={index}
                      disabled={true}
                    >
                      {typeof boisson === "string" ? (
                        boisson
                      ) : (
                        <ul>
                          {boisson.map((unique: string, i: number) => (
                            <li key={i}>{unique}</li>
                          ))}
                        </ul>
                      )}
                    </button>
                  )
                )}
              </div>
              <hr />
              <div id="modalStockBoisson">
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
