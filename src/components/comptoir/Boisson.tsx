import React, { useEffect, useRef, useState, useContext } from "react";
import close from "../../assets/close.svg";
import { taille, boisson } from "../../elements/stocks";
import "./Boisson.css";
import { CommandesAPreparerContext } from "../../CommandeContext";
import { quiEstQuoi, demantelerMenu } from "../../elements/function";
import { Produit, Boisson, boissons } from "../../elements/burgers";

function PosteBoisson({
  fontainePret,
  setFontainePret,
  fontainePretRef,
}: {
  fontainePret: Boisson[];
  setFontainePret: React.Dispatch<React.SetStateAction<Boisson[]>>;
  fontainePretRef: React.RefObject<Boisson[]>;
}) {
  interface BoissonOptionnel {
    nom?: string;
    saveur?: string;
    tailleProduit?: string;
    type?: string;
    sousType?: string;
  }

  const commandeAPreparer = useContext(CommandesAPreparerContext);
  const taillePosteBoisson: number = 10;

  const [buttonActionModalBoisson, setButtonActionModalBoisson] =
    useState<boolean>(false);
  const [currentBoisson, setCurrentBoisson] = useState<BoissonOptionnel>({});
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
    const copieCurentBoisson: BoissonOptionnel =
      structuredClone(currentBoisson);
    if (taille.includes(element)) {
      copieCurentBoisson.tailleProduit = element;
    } else {
      copieCurentBoisson.saveur = element;
    }
    setCurrentBoisson(copieCurentBoisson);
  }

  function handleClickPreparationToFontaine(): void {
    const actualSizeBoisson: number =
      fontaineRef.current.length + fontainePretRef.current.length;
    const boissonPrete: Boisson = {
      nom: "initial",
      saveur: "initial",
      tailleProduit: "initial",
      type: "boisson",
      sousType: "cannette",
      prix: 0,
    };
    if (actualSizeBoisson < taillePosteBoisson) {
      const copieCurentBoisson: BoissonOptionnel =
        structuredClone(currentBoisson);
      if (
        copieCurentBoisson.tailleProduit !== undefined &&
        copieCurentBoisson.saveur !== undefined
      ) {
        boissonPrete.nom = copieCurentBoisson.saveur;
        boissonPrete.saveur = copieCurentBoisson.saveur;
        boissonPrete.tailleProduit = copieCurentBoisson.tailleProduit;
        const prixBoisson: Boisson | undefined = boissons.find(
          (e) => e.tailleProduit === copieCurentBoisson.tailleProduit
        );
        if (prixBoisson !== undefined) {
          boissonPrete.prix = prixBoisson.prix;
        }

        setFontaine([...fontaineRef.current, boissonPrete]);
      }
    }
    setTimeout(() => {
      const oldestBoisson: number = fontaineRef.current.indexOf(boissonPrete);
      const tabFontaineCopie: Boisson[] = fontaineRef.current.slice();
      tabFontaineCopie.splice(oldestBoisson, 1);
      setFontaine(tabFontaineCopie);
      setFontainePret([...fontainePretRef.current, boissonPrete]);
    }, 2000);
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

  useEffect(() => {
    const commandesSansMenu: Produit[][] = demantelerMenu(commandeAPreparer);

    const commandesDuPoste: string[][] = quiEstQuoi(
      "boisson",
      commandesSansMenu
    );

    setCommandeBoisson(commandesDuPoste);
  }, [commandeAPreparer]);

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
                {emplacement.tailleProduit} {emplacement.saveur}
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
                    {emplacement.tailleProduit} {emplacement.saveur}
                  </button>
                ))}
                {fontaine.map((emplacement: Boisson, index: number) => (
                  <button
                    disabled={true}
                    key={index}
                    className="buttonCuisson buttonFontaine"
                  >
                    {emplacement.tailleProduit} {emplacement.saveur}
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
