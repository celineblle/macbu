import React, { useEffect, useRef, useState, useContext } from "react";
import "./Glace.css";
import close from "../../assets/close.svg";
import { glaceToppings, taille } from "../../elements/stocks";
import { CommandesAPreparerContext } from "../../CommandeContext";
import { Produit, GlaceType } from "../../elements/burgers";
import { demantelerMenu, quiEstQuoi } from "../../elements/function";

function Glace({
  setGlacesCommande,
  glacesCommandeRef,
  glacesCommande,
  setTimeOutPretPosteGlaceId,
  timeOutPretPosteGlaceRef,
}: {
  setGlacesCommande: React.Dispatch<
    React.SetStateAction<[GlaceType, number][]>
  >;
  glacesCommandeRef: React.RefObject<[GlaceType, number][]>;
  glacesCommande: [GlaceType, number][];
  setTimeOutPretPosteGlaceId: React.Dispatch<React.SetStateAction<number[]>>;
  timeOutPretPosteGlaceRef: React.RefObject<number[]>;
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
    topping: "initial",
    coulis: "initial",
    tailleProduit: "initial",
    type: "dessert",
    sousType: "glace",
  });
  const [posteGlace, setPosteGlace] = useState<[GlaceType, number][]>([]);
  const [posteGlaceFondue, setPosteGlaceFondue] = useState<
    [GlaceType, number][]
  >([]);

  const [placeVidePosteGlace, setPlaceVidePosteGlace] = useState<string[]>([]);
  const [commandeGlace, setCommandeGlace] = useState<(string | string[])[]>([]);

  const posteGlaceRef = useRef<[GlaceType, number][]>([]);
  const posteGlaceFondueRef = useRef<[GlaceType, number][]>([]);

  useEffect(() => {
    posteGlaceRef.current = posteGlace;
  }, [posteGlace]);

  useEffect(() => {
    posteGlaceFondueRef.current = posteGlaceFondue;
  }, [posteGlaceFondue]);

  function handleClickActionModal(): void {
    setButtonActionModalGlace(!buttonActionModalGlace);
  }

  function posteGlaceStandBy(element: [GlaceType, number]): void {
    const delaisFonte: number = 10000 + Date.now();
    element.splice(1, 1, delaisFonte);
    standByTimeOutGlace = setTimeout(() => {
      if (element[0].coulis !== undefined && element[0].topping !== undefined) {
        element[0].coulis = "Glace ";
        element[0].topping = "fondue";
      }
      setPosteGlaceFondue([...posteGlaceFondueRef.current, element]);
      const oldestGlace: number = glacesCommandeRef.current.indexOf(element);
      const tabPosteGlacePretCopie: [GlaceType, number][] =
        glacesCommandeRef.current.slice();
      tabPosteGlacePretCopie.splice(oldestGlace, 1);
      if (tabPosteGlacePretCopie.length === 0) {
        tabPosteGlacePretCopie.push([
          {
            nom: "Glace",
            base: "Glace au lait",
            topping: "glace prete",
            coulis: "Aucune ",
            tailleProduit: "initial",
            type: "dessert",
            sousType: "glace",
          },
          0,
        ]);
      }
      setGlacesCommande(tabPosteGlacePretCopie);
    }, element[1] - Date.now());
    setTimeOutPretPosteGlaceId([
      ...timeOutPretPosteGlaceRef.current,
      standByTimeOutGlace,
    ]);
    element.splice(1, 1, standByTimeOutGlace);
  }

  function handleClickGlaceConstruction(element: string): void {
    const copieCurentGlace: GlaceType = structuredClone(currentGlace);
    if (coulis.includes(element)) {
      copieCurentGlace.coulis = element;
    } else {
      copieCurentGlace.topping = element;
    }
    setCurrentGlace(copieCurentGlace);
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
        const glacePrepa: [GlaceType, number] = [copieCurentGlace, 0];
        setPosteGlace([...posteGlaceRef.current, glacePrepa]);
        setTimeout(() => {
          const oldestGlace: number = posteGlaceRef.current.indexOf(glacePrepa);
          const tabPosteGlaceCopie: [GlaceType, number][] =
            posteGlaceRef.current.slice();
          tabPosteGlaceCopie.splice(oldestGlace, 1);
          setPosteGlace(tabPosteGlaceCopie);
          if (glacesCommandeRef.current[0][0].coulis === "Aucune ") {
            setGlacesCommande([glacePrepa]);
          } else {
            setGlacesCommande([...glacesCommandeRef.current, glacePrepa]);
          }
          posteGlaceStandBy(glacePrepa);
        }, 2000);
      }
    }
  }

  function handleClickAvailabilityGlace(element: number): void {
    const timeOutIdCopie: number[] = timeOutPretPosteGlaceRef.current.slice();
    const glaceTimeOutId = timeOutIdCopie[element];
    clearTimeout(glaceTimeOutId);
    const tabPosteGlaceCopie: [GlaceType, number][] =
      glacesCommandeRef.current.slice();
    tabPosteGlaceCopie.splice(element, 1);
    setGlacesCommande(tabPosteGlaceCopie);
  }

  function handleClickPoubelle(element: number): void {
    const tabFondueCopie: [GlaceType, number][] =
      posteGlaceFondueRef.current.slice();
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
      <div id="boissonListePage">
        {posteGlaceFondue.map(
          (emplacement: [GlaceType, number], index: number) => (
            <button
              key={index}
              onClick={() => handleClickPoubelle(index)}
              className="buttonGrille"
            >
              {emplacement[0].coulis} {emplacement[0].topping}
            </button>
          )
        )}
        {glacesCommande.map(
          (emplacement: [GlaceType, number], index: number) => (
            <button
              key={index}
              onClick={() => handleClickAvailabilityGlace(index)}
              className="buttonPret"
            >
              {emplacement[0].coulis} {emplacement[0].topping}
            </button>
          )
        )}
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
              {posteGlaceFondue.map(
                (emplacement: [GlaceType, number], index: number) => (
                  <button
                    key={index}
                    onClick={() => handleClickPoubelle(index)}
                    className="buttonGrille buttonPretGlace"
                  >
                    {emplacement[0].coulis} {emplacement[0].topping}
                  </button>
                )
              )}
              {glacesCommande.map(
                (emplacement: [GlaceType, number], index: number) => (
                  <button
                    key={index}
                    onClick={() => handleClickAvailabilityGlace(index)}
                    className="buttonPret buttonPretGlace"
                  >
                    {emplacement[0].coulis} {emplacement[0].topping}
                  </button>
                )
              )}
              {posteGlace.map(
                (emplacement: [GlaceType, number], index: number) => (
                  <button
                    disabled={true}
                    key={index}
                    className="buttonCuisson buttonPretGlace"
                  >
                    {emplacement[0].coulis} {emplacement[0].topping}
                  </button>
                )
              )}
              {placeVidePosteGlace.map((emplacement: string, index: number) => (
                <button key={index} className="buttonNeutre buttonVideGlace">
                  {emplacement}
                </button>
              ))}
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
                  className="buttonNeutre buttonCoulis"
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
                    className="buttonNeutre buttonTopping"
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
                  {glaceToppings.map((element: string, index: number) => (
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

export default Glace;
