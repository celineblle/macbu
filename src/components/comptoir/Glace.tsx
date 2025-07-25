import React, { useEffect, useRef, useState, useContext } from "react";
import "./Glace.css";
import close from "../../assets/close.svg";
import { glaceToppings, taille } from "../../elements/stocks";
import { CommandesAPreparerContext } from "../../CommandeContext";
import { Produit, GlaceType } from "../../elements/burgers";
import {
  demantelerMenu,
  quiEstQuoi,
  retirerStock,
} from "../../elements/function";
import {
  StocksActuelsType,
  StocksActuelInteriorType,
} from "../../StocksActuels";

function Glace({
  setGlacesCommande,
  glacesCommandeRef,
  glacesCommande,
  setPosteGlaceFondue,
  posteGlaceFondueRef,
  posteGlaceFondue,
  stocksComptoir,
  setStocksComptoir,
}: {
  setGlacesCommande: React.Dispatch<React.SetStateAction<GlaceType[]>>;
  glacesCommandeRef: React.RefObject<GlaceType[]>;
  glacesCommande: GlaceType[];
  setPosteGlaceFondue: React.Dispatch<React.SetStateAction<GlaceType[]>>;
  posteGlaceFondueRef: React.RefObject<GlaceType[]>;
  posteGlaceFondue: GlaceType[];
  stocksComptoir: StocksActuelsType[];
  setStocksComptoir: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>;
}) {
  const commandeAPreparer = useContext(CommandesAPreparerContext);

  const coulis: string[] = [glaceToppings[0], glaceToppings[1]];

  function getOnlyEclats(): string[] {
    const tableauEclats: string[] = [];
    for (let i = 2; i < glaceToppings.length; i++) {
      tableauEclats.push(glaceToppings[i]);
    }
    return tableauEclats;
  }

  const toppings: string[] = getOnlyEclats();
  const taillePosteGlace: number = 11;
  let standByTimeOutGlace: number = 0;

  const [buttonActionModalGlace, setButtonActionModalGlace] =
    useState<boolean>(false);
  const [currentGlace, setCurrentGlace] = useState<GlaceType>({
    nom: "Glace",
    base: "Glace au lait",
    tailleProduit: "initial",
    temps: 0,
    timeId: 0,
    type: "dessert",
    sousType: "glace",
    prix: 0,
  });
  const [posteGlace, setPosteGlace] = useState<GlaceType[]>([]);

  const [placeVidePosteGlace, setPlaceVidePosteGlace] = useState<string[]>([]);
  const [commandeGlace, setCommandeGlace] = useState<(string | string[])[]>([]);

  const posteGlaceRef = useRef<GlaceType[]>([]);

  useEffect(() => {
    posteGlaceRef.current = posteGlace;
  }, [posteGlace]);

  function handleClickActionModal(): void {
    setButtonActionModalGlace(!buttonActionModalGlace);
  }

  function posteGlaceStandBy(element: GlaceType): void {
    const delaisFonte: number = 10000 + Date.now();
    element.temps = delaisFonte;
    standByTimeOutGlace = setTimeout(() => {
      if (element.coulis !== undefined && element.topping !== undefined) {
        element.coulis = "Glace ";
        element.topping = "fondue";
      }
      setPosteGlaceFondue([...posteGlaceFondueRef.current, element]);
      const oldestGlace: number = glacesCommandeRef.current.indexOf(element);
      const tabPosteGlacePretCopie: GlaceType[] =
        glacesCommandeRef.current.slice();
      tabPosteGlacePretCopie.splice(oldestGlace, 1);
      if (tabPosteGlacePretCopie.length === 0) {
        tabPosteGlacePretCopie.push({
          nom: "Glace",
          base: "Glace au lait",
          topping: "",
          coulis: "Vide",
          tailleProduit: "initial",
          temps: 0,
          timeId: 0,
          type: "dessert",
          sousType: "glace",
          prix: 0,
        });
      }
      setGlacesCommande(tabPosteGlacePretCopie);
    }, element.temps - Date.now());
    element.timeId = standByTimeOutGlace;
  }

  function handleClickGlaceConstruction(element: string): void {
    const stockFrigoGlace: StocksActuelInteriorType | undefined =
      stocksComptoir[1].stockActuel.find((e) => e.produit === element);
    if (stockFrigoGlace !== undefined && stockFrigoGlace.quantite > 0) {
      const copieCurentGlace: GlaceType = structuredClone(currentGlace);
      if (coulis.includes(element)) {
        copieCurentGlace.coulis = element;
      } else {
        copieCurentGlace.topping = element;
      }
      setCurrentGlace(copieCurentGlace);
      retirerStock(stocksComptoir, setStocksComptoir, "glace", stockFrigoGlace);
    }
  }

  function handleClickFrigoToPosteGlace(): void {
    const actualSizeGlace: number =
      posteGlaceRef.current.length +
      glacesCommandeRef.current.length +
      posteGlaceFondueRef.current.length;
    if (actualSizeGlace < taillePosteGlace) {
      const copieCurentGlace: GlaceType = structuredClone(currentGlace);
      if (
        copieCurentGlace.coulis !== undefined &&
        copieCurentGlace.topping !== undefined
      ) {
        copieCurentGlace.nom = "Glace";
        copieCurentGlace.base = "Glace au lait";
        copieCurentGlace.type = "dessert";
        copieCurentGlace.sousType = "glace";
        copieCurentGlace.tailleProduit = taille[1];
        copieCurentGlace.temps = 0;
        copieCurentGlace.prix = 5;
        const glacePrepa: GlaceType = copieCurentGlace;
        setPosteGlace([...posteGlaceRef.current, glacePrepa]);
        setCurrentGlace({
          nom: "Glace",
          base: "Glace au lait",
          tailleProduit: "initial",
          temps: 0,
          timeId: 0,
          type: "dessert",
          sousType: "glace",
          prix: 0,
        });
        setTimeout(() => {
          const oldestGlace: number = posteGlaceRef.current.indexOf(glacePrepa);
          const tabPosteGlaceCopie: GlaceType[] = posteGlaceRef.current.slice();
          tabPosteGlaceCopie.splice(oldestGlace, 1);
          setPosteGlace(tabPosteGlaceCopie);
          if (glacesCommandeRef.current[0].coulis === "Vide") {
            setGlacesCommande([glacePrepa]);
          } else {
            setGlacesCommande([...glacesCommandeRef.current, glacePrepa]);
          }
          posteGlaceStandBy(glacePrepa);
        }, 2000);
      }
    }
  }

  function handleClickPoubelle(element: number): void {
    const tabFondueCopie: GlaceType[] = posteGlaceFondueRef.current.slice();
    tabFondueCopie.splice(element, 1);
    setPosteGlaceFondue(tabFondueCopie);
  }

  useEffect(() => {
    const actualSizeGlace: number =
      posteGlaceRef.current.length +
      glacesCommandeRef.current.length +
      posteGlaceFondueRef.current.length;
    const placeVide: string[] = [];
    if (actualSizeGlace < taillePosteGlace) {
      for (let i = actualSizeGlace; i < taillePosteGlace; i++) {
        placeVide.push("Vide");
      }
    }
    setPlaceVidePosteGlace(placeVide);
  }, [posteGlace, glacesCommande, posteGlaceFondue]);

  useEffect(() => {
    const commandesSansMenu: Produit[][] = demantelerMenu(commandeAPreparer);

    const commandesDuPoste: string[][] = quiEstQuoi("glace", commandesSansMenu);
    setCommandeGlace(commandesDuPoste);
  }, [commandeAPreparer]);

  return (
    <div id="glaceComponent" className="component">
      <button className="buttonModal" onClick={handleClickActionModal}>
        glace
      </button>
      <h3>Pret</h3>
      <div id="glaceListePage">
        {posteGlaceFondue.map((emplacement: GlaceType, index: number) => (
          <button
            key={index}
            onClick={() => handleClickPoubelle(index)}
            className="buttonGrille"
          >
            {emplacement.coulis} {emplacement.topping}
          </button>
        ))}
        {glacesCommande.map((emplacement: GlaceType, index: number) => (
          <button key={index} disabled={true} className="buttonPret">
            {emplacement.coulis} {emplacement.topping}
          </button>
        ))}
        {placeVidePosteGlace.map((emplacement: string, index: number) => (
          <button key={index} className="buttonNeutre">
            {emplacement}
          </button>
        ))}
      </div>

      <div className={buttonActionModalGlace ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div id="headerModal">
            <h2>Glace</h2>
            <button
              onClick={handleClickActionModal}
              className="closeModalButton"
            >
              {" "}
              <img alt="fermer" title="fermer" src={close}></img>
            </button>
          </div>
          <div id="modalContentGlace">
            <div id="posteGlace">
              <h3>Pret</h3>
              <div id="ensembleButtonGlacePret">
                {posteGlaceFondue.map(
                  (emplacement: GlaceType, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleClickPoubelle(index)}
                      className="buttonGrille buttonPretGlace"
                    >
                      {emplacement.coulis} {emplacement.topping}
                    </button>
                  )
                )}
                {glacesCommande.map((emplacement: GlaceType, index: number) => (
                  <button
                    key={index}
                    disabled={true}
                    className="buttonPret buttonPretGlace"
                  >
                    {emplacement.coulis} {emplacement.topping}
                  </button>
                ))}
                {posteGlace.map((emplacement: GlaceType, index: number) => (
                  <button
                    disabled={true}
                    key={index}
                    className="buttonCuisson buttonPretGlace"
                  >
                    {emplacement.coulis} {emplacement.topping}
                  </button>
                ))}
                {placeVidePosteGlace.map(
                  (emplacement: string, index: number) => (
                    <button
                      key={index}
                      className="buttonNeutre buttonVideGlace"
                    >
                      {emplacement}
                    </button>
                  )
                )}
              </div>
            </div>
            <hr />
            <div id="frigoGlace">
              <h3>Preparation</h3>
              <h4>Coulis</h4>
              <br />
              {coulis.map((element: string, index: number) => (
                <button
                  onClick={() => handleClickGlaceConstruction(element)}
                  key={index}
                  className={
                    stocksComptoir.length > 0 &&
                    stocksComptoir[1].stockActuel[index].quantite > 0
                      ? "buttonNeutre buttonCoulis"
                      : " buttonCoulis buttonStockVide"
                  }
                >
                  {element}
                </button>
              ))}
              <h4>Toppings</h4>
              <br />
              <div>
                {toppings.map((element: string, index: number) => (
                  <button
                    onClick={() => handleClickGlaceConstruction(element)}
                    key={index}
                    className={
                      stocksComptoir.length > 0 &&
                      stocksComptoir[1].stockActuel[index + 2].quantite > 0
                        ? "buttonNeutre buttonTopping"
                        : " buttonTopping buttonStockVide"
                    }
                  >
                    {element}
                  </button>
                ))}
              </div>
              <br />
              <button onClick={handleClickFrigoToPosteGlace} id="buttonLancer">
                Lancer
              </button>
            </div>
            <hr />
            <div id="modalDroite">
              <div id="commandeModalGlace">
                <h3>Commandes</h3>
                {commandeGlace.map(
                  (glace: string | string[], index: number) => (
                    <button
                      className="commandeUniquePage commandeGlace"
                      key={index}
                      disabled={true}
                    >
                      {typeof glace === "string" ? (
                        glace
                      ) : (
                        <ul>
                          {glace.map((unique: string, i: number) => (
                            <li key={i}>{unique}</li>
                          ))}
                        </ul>
                      )}
                    </button>
                  )
                )}
              </div>
              <hr />
              <div id="stockModalGlace">
                <h3>Stock</h3>
                <ul>
                  {stocksComptoir.length > 0 &&
                    stocksComptoir[1].stockActuel.map(
                      (element, index: number) => (
                        <li key={index}>
                          {element.produit} : {element.quantite}
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Glace;
