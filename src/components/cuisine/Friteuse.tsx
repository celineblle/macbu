import React, { useEffect, useRef, useState, useContext } from "react";
import "./Friteuse.css";
import close from "../../assets/close.svg";
import {
  Friture,
  PortionFrite,
  frites,
  portionFrite,
  BacTimeOut,
  EtatBacAFrite,
} from "../../elements/ingredientsQuantite";
import { taille } from "../../elements/stocks";
import {
  FritesContextSetter,
  CommandesAPreparerContext,
} from "../../CommandeContext";
import {
  Accompagnement,
  accompagnements,
  Produit,
} from "../../elements/burgers";
import {
  demantelerMenu,
  quiEstQuoi,
  retirerStock,
} from "../../elements/function";
import {
  StocksActuelsType,
  StocksActuelInteriorType,
} from "../../StocksActuels";

function Friteuse({
  stocksCuisine,
  setStocksCuisine,
}: {
  stocksCuisine: StocksActuelsType[];
  setStocksCuisine: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>;
}) {
  const setFrites = useContext(FritesContextSetter);
  const commandeAPreparer = useContext(CommandesAPreparerContext);

  const tailleFriteuse: number = 6;
  const tailleRackAFrite: number = 18;
  let standByTimeOutFriteuse: number = 0;
  const friteVide: Friture = {
    friture: "Vide",
    quantiteSachet: 0,
  };
  const [modalActionFriteuse, setModalActionFriteuse] =
    useState<boolean>(false);

  const [friteuse, setFriteuse] = useState<Friture[]>([]);
  const [friteusePret, setFriteusePret] = useState<Friture[]>([]);
  const [friteuseGrille, setFriteuseGrille] = useState<Friture[]>([]);
  const [bacAFrite, setBacAFrite] = useState<EtatBacAFrite[]>([
    {
      friture: "Frite",
      quantiteSachet: 0,
      grille: false,
    },
    {
      friture: "Potatoe",
      quantiteSachet: 0,
      grille: false,
    },
  ]);
  const [portion, setPortion] = useState<string>("");
  const [rackAFrite, setRackAFrite] = useState<Accompagnement[]>([]);
  const [timeOutFriteuse, setTimeOutFriteuse] = useState<number[]>([]);
  const [timeOutBac, setTimeOutBac] = useState<BacTimeOut[]>([]);
  const [placeVideFriteuse, setPlaceVideFriteuse] = useState<Friture[]>([]);
  const [placeVideRack, setPlaceVideRack] = useState<Friture[]>([]);
  const [commandeFrite, setCommandeFrite] = useState<(string | string[])[]>([]);

  const friteuseRef = useRef<Friture[]>([]);
  const friteusePretRef = useRef<Friture[]>([]);
  const friteuseGrilleRef = useRef<Friture[]>([]);

  function handleClickToggleModal(): void {
    setModalActionFriteuse(!modalActionFriteuse);
  }

  function emplacementVide(
    taille: number,
    tableauActuel: Friture[] | Accompagnement[],
    tableauActuelPret: Friture[] | null,
    tableauActuelGrille: Friture[] | null,
    setterTableau: React.Dispatch<React.SetStateAction<Friture[]>>
  ) {
    let placeVide: number = taille - tableauActuel.length;

    if (tableauActuelPret !== null) {
      placeVide = placeVide - tableauActuelPret.length;
    }
    if (tableauActuelGrille !== null) {
      placeVide = placeVide - tableauActuelGrille.length;
    }

    const tableauVide: Friture[] = [];

    if (placeVide === 0) {
      setterTableau([]);
    } else if (placeVide <= taille) {
      for (let i = 0; i < placeVide; i++) {
        tableauVide.push(friteVide);
      }

      setterTableau(tableauVide);
    }
  }

  useEffect(() => {
    friteuseRef.current = friteuse;
  }, [friteuse]);

  useEffect(() => {
    friteusePretRef.current = friteusePret;
  }, [friteusePret]);

  useEffect(() => {
    friteuseGrilleRef.current = friteuseGrille;
  }, [friteuseGrille]);

  useEffect(() => {
    emplacementVide(tailleRackAFrite, rackAFrite, null, null, setPlaceVideRack);
    if (setFrites !== undefined && rackAFrite.length > 0) {
      const newFrite: Accompagnement[] = rackAFrite.slice();
      setFrites(newFrite);
    }
  }, [rackAFrite]);

  useEffect(() => {
    emplacementVide(
      tailleFriteuse,
      friteuse,
      friteusePret,
      friteuseGrille,
      setPlaceVideFriteuse
    );
  }, [friteuse, friteusePret, friteuseGrille]);

  function friteuseStandBy(element: Friture): void {
    standByTimeOutFriteuse = setTimeout(() => {
      setFriteuseGrille([...friteuseGrilleRef.current, element]);
      const oldestFriture: number = friteuseGrilleRef.current.indexOf(element);
      const tabFriturePretCopie: Friture[] = friteuseRef.current.slice();
      tabFriturePretCopie.splice(oldestFriture, 1);
      setFriteusePret(tabFriturePretCopie);
    }, 10000);
    setTimeOutFriteuse([...timeOutFriteuse, standByTimeOutFriteuse]);
  }

  function handleClickFrigoToFriteuse(element: Friture): void {
    const stockFrigoFrite: StocksActuelInteriorType | undefined =
      stocksCuisine[0].stockActuel.find((e) => e.produit === element.friture);
    if (stockFrigoFrite !== undefined && stockFrigoFrite.quantite > 0) {
      const actualSizeFriteuse: number =
        friteuseRef.current.length + friteuseGrilleRef.current.length;
      if (actualSizeFriteuse < tailleFriteuse) {
        setFriteuse([...friteuse, element]);
      }

      retirerStock(stocksCuisine, setStocksCuisine, "frite", stockFrigoFrite);

      setTimeout(() => {
        setFriteusePret([...friteusePretRef.current, element]);
        const oldestFriture: number = friteuseRef.current.indexOf(element);
        const tabFritureCopie: Friture[] = friteuseRef.current.slice();
        tabFritureCopie.splice(oldestFriture, 1);
        setFriteuse(tabFritureCopie);
        friteuseStandBy(element);
      }, 1000);
    }
  }

  function standByBacAFrite(bac: EtatBacAFrite, autreBac: EtatBacAFrite): void {
    standByTimeOutFriteuse = setTimeout(() => {
      bac.grille = true;
      if (bac.friture === "Frite") {
        setBacAFrite([bac, autreBac]);
      } else {
        setBacAFrite([autreBac, bac]);
      }
    }, 15000);
    const newTimeout: BacTimeOut = {
      timeout: standByTimeOutFriteuse,
      bac: bac.friture,
    };
    setTimeOutBac([...timeOutBac, newTimeout]);
  }

  function handleClickFriteuseToBac(element: Friture, index: number): void {
    const bac: EtatBacAFrite[] = bacAFrite.filter(
      (e) => e.friture === element.friture
    );
    const autreBac: EtatBacAFrite[] = bacAFrite.filter(
      (e) => e.friture !== element.friture
    );
    if (bac[0].quantiteSachet === 0) {
      standByBacAFrite(bac[0], autreBac[0]);
    }
    bac[0].quantiteSachet = bac[0].quantiteSachet + element.quantiteSachet;

    if (bac[0].friture === "Frite") {
      setBacAFrite([bac[0], autreBac[0]]);
    } else {
      setBacAFrite([autreBac[0], bac[0]]);
    }
    clearTimeout(timeOutFriteuse[index]);
    const timeOutFriteuseCopie: number[] = timeOutFriteuse.slice();
    timeOutFriteuseCopie.splice(index, 1);
    setTimeOutFriteuse(timeOutFriteuseCopie);
    const friteusePretCopie: Friture[] = friteusePretRef.current.slice();
    friteusePretCopie.splice(index, 1);
    setFriteusePret(friteusePretCopie);
  }

  function choisirIngredient(element: EtatBacAFrite): void {
    setPortion(element.friture);
  }

  function handleClickFabriquerPortion(element: string): void {
    if (portion !== "") {
      const portionChoisie: PortionFrite[] = portionFrite.filter(
        (e) => e.base === portion && e.tailleProduit === element
      );

      const bac: EtatBacAFrite[] = bacAFrite.filter(
        (e) => e.friture === portion
      );
      const autreBac: EtatBacAFrite[] = bacAFrite.filter(
        (e) => e.friture !== portion
      );

      if (bac[0].quantiteSachet >= portionChoisie[0].quantite) {
        bac[0].quantiteSachet =
          bac[0].quantiteSachet - portionChoisie[0].quantite;
        const prixFrite: Accompagnement | undefined = accompagnements.find(
          (e) => e.tailleProduit === portionChoisie[0].tailleProduit
        );
        let finalPrix: number = 0;
        if (prixFrite !== undefined) {
          finalPrix = prixFrite.prix;
        }

        const finalPortion: Accompagnement = {
          nom: portionChoisie[0].base,
          complement: portionChoisie[0].base,
          tailleProduit: portionChoisie[0].tailleProduit,
          type: "accompagnement",
          sousType: "frite",
          prix: finalPrix,
        };

        setRackAFrite([...rackAFrite, finalPortion]);

        if (bac[0].friture === "Frite") {
          setBacAFrite([bac[0], autreBac[0]]);
        } else {
          setBacAFrite([autreBac[0], bac[0]]);
        }
        setPortion("");
      }
    }
  }
  function handleClickPoubelle(
    element: Friture,
    tableau: Friture[],
    setter: React.Dispatch<React.SetStateAction<Friture[]>>
  ): void {
    const oldestFrite: number = tableau.indexOf(element);
    const tabGrilleCopie: Friture[] = tableau.slice();
    tabGrilleCopie.splice(oldestFrite, 1);
    setter(tabGrilleCopie);
  }

  function clearTimeOutBac(index: number): void {
    if (bacAFrite[index].quantiteSachet === 0) {
      if (timeOutBac.length > 0) {
        const actualTimeOut: number = timeOutBac.findIndex(
          (e) => e.bac === bacAFrite[index].friture
        );
        if (actualTimeOut !== -1) {
          clearTimeout(timeOutBac[actualTimeOut].timeout);
        }
      }
    }
  }

  useEffect(() => {
    clearTimeOutBac(0);
    clearTimeOutBac(1);
  }, [bacAFrite]);

  function handleClickPoubelleBac(element: EtatBacAFrite): void {
    const bac: EtatBacAFrite[] = bacAFrite.filter(
      (e) => e.friture === element.friture
    );
    const autreBac: EtatBacAFrite[] = bacAFrite.filter(
      (e) => e.friture !== element.friture
    );

    bac[0].grille = false;
    bac[0].quantiteSachet = 0;
    if (bac[0].friture === "Frite") {
      setBacAFrite([bac[0], autreBac[0]]);
      clearTimeOutBac(0);
    } else {
      setBacAFrite([autreBac[0], bac[0]]);
      clearTimeOutBac(1);
    }
  }

  function handleClickAvailabilityFrite(element: Accompagnement): void {
    const rackFriteCopie: Accompagnement[] = rackAFrite.slice();
    const indexfrite: number = rackAFrite.findIndex(
      (e) => e.nom === element.nom && e.tailleProduit === element.tailleProduit
    );

    rackFriteCopie.splice(indexfrite, 1);
    setRackAFrite(rackFriteCopie);
  }

  useEffect(() => {
    const commandesSansMenu: Produit[][] = demantelerMenu(commandeAPreparer);

    const commandesDuPoste: string[][] = quiEstQuoi("frite", commandesSansMenu);
    setCommandeFrite(commandesDuPoste);
  }, [commandeAPreparer]);

  return (
    <div id="friteuseComponent" className="component">
      <button onClick={handleClickToggleModal} className="buttonModal">
        Friteuse
      </button>
      <div id="pageContent">
        <div>
          <h4>pret</h4>
          {bacAFrite.map((emplacement: EtatBacAFrite, index: number) => (
            <button
              key={index}
              className={
                emplacement.grille === true
                  ? "buttonGrille bacFriteuse"
                  : emplacement.quantiteSachet === 0
                    ? "buttonNeutre bacFriteuse"
                    : "buttonPret bacFriteuse"
              }
              onClick={
                emplacement.grille === true
                  ? () => handleClickPoubelleBac(emplacement)
                  : () => choisirIngredient(emplacement)
              }
            >
              {emplacement.friture} : {emplacement.quantiteSachet}
            </button>
          ))}
        </div>
        <hr />
        <div>
          <h4>Stock</h4>
        </div>
      </div>
      <div
        className={modalActionFriteuse ? "modalOpen" : "modalClose"}
        id="modalFriteuse"
      >
        <div className="modalContent">
          <div id="headerModal">
            <h2>Friteuse</h2>
            <button
              onClick={handleClickToggleModal}
              className="closeModalButton"
            >
              {" "}
              <img alt="fermer" title="fermer" src={close}></img>
            </button>
          </div>

          <div id="modalFriteuseContent">
            <div id="pretFriteuse" className="modalComponent">
              <h3 className="titreModalContent">Pret</h3>
              <br />
              <div className="fritureConstructeur">
                {bacAFrite.map((emplacement: EtatBacAFrite, index: number) => (
                  <button
                    key={index}
                    className={
                      emplacement.grille === true
                        ? "buttonGrille bacFriteuse"
                        : emplacement.quantiteSachet === 0
                          ? "buttonNeutre bacFriteuse"
                          : "buttonPret bacFriteuse"
                    }
                    onClick={
                      emplacement.grille === true
                        ? () => handleClickPoubelleBac(emplacement)
                        : () => choisirIngredient(emplacement)
                    }
                  >
                    {emplacement.friture} : {emplacement.quantiteSachet}
                  </button>
                ))}
              </div>
              <div className="fritureConstructeur">
                {taille.map((emplacement: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleClickFabriquerPortion(emplacement)}
                    className="buttonNeutre bacFriteuse"
                  >
                    {emplacement}
                  </button>
                ))}
              </div>
              <br />
              <div className="fritureConstructeur">
                {rackAFrite.map(
                  (emplacement: Accompagnement, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleClickAvailabilityFrite(emplacement)}
                      className="buttonPret rackFrite"
                    >
                      {emplacement.tailleProduit} {emplacement.nom}
                    </button>
                  )
                )}
                {placeVideRack.map((emplacement: Friture, index: number) => (
                  <button className="buttonNeutre rackFrite" key={index}>
                    {emplacement.friture}
                  </button>
                ))}
              </div>
            </div>
            <hr />
            <div id="preparationFriteuse" className="modalComponent">
              <h3 className="titreModalContent">Preparation</h3>
              <br />
              <div className="fritureConstructeur">
                {frites.map((emplacement: Friture, index: number) => (
                  <button
                    onClick={() => handleClickFrigoToFriteuse(emplacement)}
                    key={index}
                    className="buttonNeutre bacFriteuse"
                  >
                    {emplacement.friture} : {emplacement.quantiteSachet}
                  </button>
                ))}
              </div>
              <div className="fritureConstructeur">
                {friteuseGrille.map((emplacement: Friture, index: number) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleClickPoubelle(
                        emplacement,
                        friteuseGrille,
                        setFriteuseGrille
                      )
                    }
                    className="buttonGrille bacFriteuse"
                  >
                    {emplacement.friture} à jeter
                  </button>
                ))}
                {friteusePret.map((emplacement: Friture, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleClickFriteuseToBac(emplacement, index)}
                    className="buttonPret bacFriteuse"
                  >
                    {emplacement.friture}
                  </button>
                ))}
                {friteuse.map((emplacement: Friture, index: number) => (
                  <button
                    className="buttonCuisson bacFriteuse"
                    disabled={true}
                    key={index}
                  >
                    {emplacement.friture}
                  </button>
                ))}
                {placeVideFriteuse.map(
                  (emplacement: Friture, index: number) => (
                    <button className="buttonNeutre bacFriteuse" key={index}>
                      {emplacement.friture}
                    </button>
                  )
                )}
              </div>
              <br />
              <div>
                <h3>Stock</h3>
                <ul>
                  {stocksCuisine.length > 0 &&
                    stocksCuisine[0].stockActuel.map(
                      (element, index: number) => (
                        <li key={index}>
                          {element.produit} : {element.quantite}
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>
            <hr />
            <div id="commandeFriteuse" className="modalComponent">
              <h3 className="titreModalContent">Commande</h3>
              {commandeFrite.map((frite: string | string[], index: number) => (
                <button
                  key={index}
                  disabled={true}
                  className="commandeUniquePage commandeFrite"
                >
                  {typeof frite === "string" ? (
                    frite
                  ) : (
                    <ul>
                      {frite.map((unique: string, i: number) => (
                        <li key={i}>{unique}</li>
                      ))}
                    </ul>
                  )}
                </button>
              ))}
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friteuse;
