import React, { useEffect, useRef, useState } from "react";
import "./Glace.css";
import close from "../../assets/close.svg";
import { gobelet, glaceToppings, taille } from "../../elements/stocks";

function Glace() {
  interface Glace {
    nom?: string;
    base?: string;
    topping?: string | null;
    coulis?: string | null;
    emballage?: string;
    tailleProduit?: string;
    type?: string;
    sousType?: string;
  }

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
  const [currentGlace, setCurrentGlace] = useState<Glace>({});
  const [posteGlace, setPosteGlace] = useState<Glace[]>([]);
  const [posteGlacePret, setPosteGlacePret] = useState<Glace[]>([]);
  const [posteGlaceFondue, setPosteGlaceFondue] = useState<Glace[]>([]);
  const [timeOutPretPosteGlaceId, setTimeOutPretPosteGlaceId] = useState<
    number[]
  >([]);
  const [placeVidePosteGlace, setPlaceVidePosteGlace] = useState<string[]>([]);

  const posteGlaceRef = useRef<Glace[]>([]);
  const posteGlacePretRef = useRef<Glace[]>([]);
  const posteGlaceFondueRef = useRef<Glace[]>([]);
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

  function handleClickActionModal(): void {
    setButtonActionModalGlace(!buttonActionModalGlace);
  }

  function posteGlaceStandBy(element: Glace): void {
    standByTimeOutGlace = setTimeout(() => {
      setPosteGlaceFondue([...posteGlaceFondueRef.current, element]);
      const oldestGlace: number = posteGlacePretRef.current.indexOf(element);
      const tabPosteGlacePretCopie: Glace[] = posteGlacePretRef.current.slice();
      tabPosteGlacePretCopie.splice(oldestGlace, 1);
      setPosteGlacePret(tabPosteGlacePretCopie);
    }, 10000);
    setTimeOutPretPosteGlaceId([
      ...timeOutPretPosteGlaceRef.current,
      standByTimeOutGlace,
    ]);
  }

  function handleClickGlaceConstruction(element: string): void {
    const copieCurentGlace: Glace = structuredClone(currentGlace);
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
      posteGlacePretRef.current.length +
      posteGlaceFondueRef.current.length;
    if (actualSizeGlace < taillePosteGlace) {
      const copieCurentGlace: Glace = structuredClone(currentGlace);
      if (
        copieCurentGlace.coulis !== undefined &&
        copieCurentGlace.topping !== undefined
      ) {
        copieCurentGlace.nom = "Glace";
        copieCurentGlace.base = "Glace au lait";
        copieCurentGlace.emballage = gobelet[3];
        copieCurentGlace.type = "dessert";
        copieCurentGlace.sousType = "glace";
        copieCurentGlace.tailleProduit = taille[1];
        setPosteGlace([...posteGlaceRef.current, copieCurentGlace]);
        setTimeout(() => {
          const oldestGlace: number =
            posteGlaceRef.current.indexOf(copieCurentGlace);
          const tabPosteGlaceCopie: Glace[] = posteGlaceRef.current.slice();
          tabPosteGlaceCopie.splice(oldestGlace, 1);
          setPosteGlace(tabPosteGlaceCopie);
          setPosteGlacePret([...posteGlacePretRef.current, copieCurentGlace]);
          posteGlaceStandBy(copieCurentGlace);
        }, 2000);
      }
    }
  }

  function handleClickAvailabilityGlace(element: number): void {
    const timeOutIdCopie: number[] = timeOutPretPosteGlaceRef.current.slice();
    const glaceTimeOutId = timeOutIdCopie[element];
    clearTimeout(glaceTimeOutId);
    const tabPosteGlaceCopie: Glace[] = posteGlacePretRef.current.slice();
    tabPosteGlaceCopie.splice(element, 1);
    setPosteGlacePret(tabPosteGlaceCopie);
  }

  function handleClickPoubelle(element: number): void {
    const tabFondueCopie: Glace[] = posteGlaceFondueRef.current.slice();
    tabFondueCopie.splice(element, 1);
    setPosteGlaceFondue(tabFondueCopie);
  }

  useEffect(() => {
    const actualSizeGlace: number =
      posteGlaceRef.current.length +
      posteGlacePretRef.current.length +
      posteGlaceFondueRef.current.length;
    const placeVide: string[] = [];
    if (actualSizeGlace < taillePosteGlace) {
      for (let i = actualSizeGlace; i < taillePosteGlace; i++) {
        placeVide.push("Vide");
      }
    }
    setPlaceVidePosteGlace(placeVide);
  }, [posteGlace, posteGlacePret, posteGlaceFondue]);

  return (
    <div id="glaceComponent" className="component">
      <button className="buttonModal" onClick={handleClickActionModal}>
        glace
      </button>
      <h3>Pret</h3>
      <div id="boissonListePage">
        {posteGlaceFondue.map((emplacement: Glace, index: number) => (
          <button
            key={index}
            onClick={() => handleClickPoubelle(index)}
            className="buttonGrille"
          >
            {emplacement.coulis} {emplacement.topping}
          </button>
        ))}
        {posteGlacePret.map((emplacement: Glace, index: number) => (
          <button
            key={index}
            onClick={() => handleClickAvailabilityGlace(index)}
            className="buttonPret"
          >
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
              {posteGlaceFondue.map((emplacement: Glace, index: number) => (
                <button
                  key={index}
                  onClick={() => handleClickPoubelle(index)}
                  className="buttonGrille buttonPretGlace"
                >
                  {emplacement.coulis} {emplacement.topping}
                </button>
              ))}
              {posteGlacePret.map((emplacement: Glace, index: number) => (
                <button
                  key={index}
                  onClick={() => handleClickAvailabilityGlace(index)}
                  className="buttonPret buttonPretGlace"
                >
                  {emplacement.coulis} {emplacement.topping}
                </button>
              ))}
              {posteGlace.map((emplacement: Glace, index: number) => (
                <button
                  disabled={true}
                  key={index}
                  className="buttonCuisson buttonPretGlace"
                >
                  {emplacement.coulis} {emplacement.topping}
                </button>
              ))}
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
              <div className="finModal">
                <h3>Commandes</h3>
              </div>
              <hr />
              <div className="finModal">
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
