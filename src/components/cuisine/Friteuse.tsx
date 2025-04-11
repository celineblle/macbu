import React, { useEffect, useRef, useState } from "react";
import "./Friteuse.css";
import close from "../../assets/close.svg"
import {
  Friture,
  PortionFrite,
  frites,
  portionFrite,
} from "../../elements/ingredientsQuantite";
import { Accompagnement } from "../../elements/burgers";
import { emballageFrite, taille } from "../../elements/stocks";

function Friteuse() {
  interface BacTimeOut {
    timeout?: number;
    bac?: string;
  }

  interface EtatBacAFrite {
    friture: string;
    quantiteSachet: number;
    grille: boolean;
  }

  const styleGrille = {
    color: "blue",
  };
  const styleNormal = {
    color: "black",
  };

  const tailleFriteuse: number = 4;
  const tailleRackAFrite: number = 20;
  let standByTimeOutFriteuse: number = 0;
  const friteVide: Friture = {
    friture: "Vide",
    quantiteSachet: 0,
  };
  const [modalActionFriteuse, setModalActionFriteuse] =
    useState<boolean>(false);

  const [toggleTabFriteuse, setToggleTabFriteuse] =
    useState<string>("bac a frites");
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

  const friteuseRef = useRef<Friture[]>([]);
  const friteusePretRef = useRef<Friture[]>([]);
  const friteuseGrilleRef = useRef<Friture[]>([]);
  const bacAFriteRef = useRef<EtatBacAFrite[]>([]);
  const portionRef = useRef<string>("");
  const rackAFriteRef = useRef<Accompagnement[]>([]);
  const timeOutFriteuseRef = useRef<number[]>([]);
  const timeOutBacRef = useRef<BacTimeOut[]>([]);

  function handleClickToggleModal(): void {
    setModalActionFriteuse(!modalActionFriteuse);
  }

  function emplacementVide(
    taille: number,
    tableauActuel:
      | React.RefObject<Friture[]>
      | React.RefObject<Accompagnement[]>,
    tableauActuelPret: React.RefObject<Friture[]> | null,
    tableauActuelGrille: React.RefObject<Friture[]> | null,
    setterTableau: React.Dispatch<React.SetStateAction<Friture[]>>
  ) {
    let placeVide: number = taille - tableauActuel.current.length;

    if (tableauActuelPret !== null) {
      placeVide = placeVide - tableauActuelPret.current.length;
    }
    if (tableauActuelGrille !== null) {
      placeVide = placeVide - tableauActuelGrille.current.length;
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
    bacAFriteRef.current = bacAFrite;
  }, [bacAFrite]);

  useEffect(() => {
    rackAFriteRef.current = rackAFrite;
    emplacementVide(
      tailleRackAFrite,
      rackAFriteRef,
      null,
      null,
      setPlaceVideRack
    );
  }, [rackAFrite]);

  useEffect(() => {
    portionRef.current = portion;
  }, [portion]);

  useEffect(() => {
    timeOutFriteuseRef.current = timeOutFriteuse;
  }, [timeOutFriteuse]);

  useEffect(() => {
    timeOutBacRef.current = timeOutBac;
  }, [timeOutBac]);

  useEffect(() => {
    emplacementVide(
      tailleFriteuse,
      friteuseRef,
      friteusePretRef,
      friteuseGrilleRef,
      setPlaceVideFriteuse
    );
  }, [friteuse, friteusePret, friteuseGrille]);

  function handleClickTabButtonFriteuse(element: string): void {
    setToggleTabFriteuse(element);
  }

  function friteuseStandBy(element: Friture): void {
    standByTimeOutFriteuse = setTimeout(() => {
      setFriteuseGrille([...friteuseGrilleRef.current, element]);
      const oldestFriture: number = friteuseGrilleRef.current.indexOf(element);
      const tabFriturePretCopie: Friture[] = friteuseRef.current.slice();
      tabFriturePretCopie.splice(oldestFriture, 1);
      setFriteusePret(tabFriturePretCopie);
    }, 10000);
    setTimeOutFriteuse([...timeOutFriteuseRef.current, standByTimeOutFriteuse]);
  }

  function handleClickFrigoToFriteuse(element: Friture): void {
    const actualSizeFriteuse: number =
      friteuseRef.current.length + friteuseGrilleRef.current.length;
    if (actualSizeFriteuse < tailleFriteuse) {
      setFriteuse([...friteuseRef.current, element]);
    }
    setTimeout(() => {
      setFriteusePret([...friteusePretRef.current, element]);
      const oldestFriture: number = friteuseRef.current.indexOf(element);
      const tabFritureCopie: Friture[] = friteuseRef.current.slice();
      tabFritureCopie.splice(oldestFriture, 1);
      setFriteuse(tabFritureCopie);
      friteuseStandBy(element);
    }, 1000);
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
    setTimeOutBac([...timeOutBacRef.current, newTimeout]);
  }

  function handleClickFriteuseToBac(element: Friture, index: number): void {
    const bac: EtatBacAFrite[] = bacAFriteRef.current.filter(
      (e) => e.friture === element.friture
    );
    const autreBac: EtatBacAFrite[] = bacAFriteRef.current.filter(
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
    const timeOutFriteuseCopie: number[] = timeOutFriteuseRef.current.slice();
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
    if (portionRef.current !== "") {
      const portionChoisie: PortionFrite[] = portionFrite.filter(
        (e) => e.base === portionRef.current && e.tailleProduit === element
      );

      const bac: EtatBacAFrite[] = bacAFriteRef.current.filter(
        (e) => e.friture === portionRef.current
      );
      const autreBac: EtatBacAFrite[] = bacAFriteRef.current.filter(
        (e) => e.friture !== portionRef.current
      );

      if (bac[0].quantiteSachet >= portionChoisie[0].quantite) {
        bac[0].quantiteSachet =
          bac[0].quantiteSachet - portionChoisie[0].quantite;
        const emballage: number = taille.indexOf(
          portionChoisie[0].tailleProduit
        );

        const finalPortion: Accompagnement = {
          nom: portionChoisie[0].base,
          base: portionChoisie[0].base,
          emballage: emballageFrite[emballage],
          tailleProduit: portionChoisie[0].tailleProduit,
          type: "accompagnement",
          sousType: "frite",
        };

        setRackAFrite([...rackAFriteRef.current, finalPortion]);

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
    tableauRef: React.RefObject<Friture[]>,
    setter: React.Dispatch<React.SetStateAction<Friture[]>>
  ): void {
    const oldestFrite: number = tableauRef.current.indexOf(element);
    const tabGrilleCopie: Friture[] = tableauRef.current.slice();
    tabGrilleCopie.splice(oldestFrite, 1);
    setter(tabGrilleCopie);
  }

  function clearTimeOutBac(index: number): void {
    if (bacAFriteRef.current[index].quantiteSachet === 0) {
      if (timeOutBacRef.current.length > 0) {
        const actualTimeOut: number = timeOutBacRef.current.findIndex(
          (e) => e.bac === bacAFriteRef.current[index].friture
        );
        if (actualTimeOut !== -1) {
          clearTimeout(timeOutBacRef.current[actualTimeOut].timeout);
        }
      }
    }
  }

  useEffect(() => {
    clearTimeOutBac(0);
    clearTimeOutBac(1);
  }, [bacAFrite]);

  function handleClickPoubelleBac(element: EtatBacAFrite): void {
    const bac: EtatBacAFrite[] = bacAFriteRef.current.filter(
      (e) => e.friture === element.friture
    );
    const autreBac: EtatBacAFrite[] = bacAFriteRef.current.filter(
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
    const rackFriteCopie: Accompagnement[] = rackAFriteRef.current.slice();
    const indexfrite: number = rackAFriteRef.current.findIndex((e) => e === element);

    rackFriteCopie.splice(indexfrite, 1)
    setRackAFrite(rackFriteCopie)
  }

  return (
    <div id="friteuseComponent" className="component">
      <button onClick={handleClickToggleModal} className="buttonModal">
        Friteuse
      </button>
      <div
        className={
          modalActionFriteuse ? "modalOpen" : "modalClose"
        }
        id="modalFriteuse"
      >
        <div className="modalContent">
        <div id="headerModal">
        <h2>Friteuse</h2>
          <button onClick={handleClickToggleModal} className="closeModalButton">
            {" "}
            <img alt="fermer" title="fermer" src={close}></img>
          </button>
          </div>
          <div className="friteuseTabButton">
            <button
              className="tabLinksButton"
              onClick={() => handleClickTabButtonFriteuse("bac a frites")}
            >
              Cuisson
            </button>
            <button
              className="tabLinksButton"
              onClick={() => handleClickTabButtonFriteuse("friteuse")}
            >
              Friteuses
            </button>
          </div>
          <div
            className={
              toggleTabFriteuse === "bac a frites"
                ? "tabFriteuseContent"
                : "tabContentHidden"
            }
            id="bacFriteuse"
          >
            <div>
              {bacAFrite.map((emplacement: EtatBacAFrite, index: number) => (
                <button
                  key={index}
                  style={
                    emplacement.grille === true ? styleGrille : styleNormal
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
            <div>
              {taille.map((emplacement: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleClickFabriquerPortion(emplacement)}
                >
                  {emplacement}
                </button>
              ))}
            </div>
            <div>
              {rackAFrite.map((emplacement: Accompagnement, index: number) => (
                <button key={index} onClick={() => handleClickAvailabilityFrite(emplacement)}>
                  {emplacement.tailleProduit} {emplacement.nom}
                </button>
              ))}
              {placeVideRack.map((emplacement: Friture, index: number) => (
                <button key={index}>{emplacement.friture}</button>
              ))}
            </div>
          </div>

          <div
            className={
              toggleTabFriteuse === "friteuse"
                ? "tabFriteuseContent"
                : "tabContentHidden"
            }
            id="frigoFriteuse"
          >
            <div>
              {frites.map((emplacement: Friture, index: number) => (
                <button
                  onClick={() => handleClickFrigoToFriteuse(emplacement)}
                  key={index}
                >
                  {emplacement.friture} : {emplacement.quantiteSachet}
                </button>
              ))}
            </div>
            <div>
              {friteuseGrille.map((emplacement: Friture, index: number) => (
                <button
                  key={index}
                  onClick={() =>
                    handleClickPoubelle(
                      emplacement,
                      friteuseGrilleRef,
                      setFriteuseGrille
                    )
                  }
                >
                  {emplacement.friture} à jeter
                </button>
              ))}
              {friteusePret.map((emplacement: Friture, index: number) => (
                <button
                  key={index}
                  onClick={() => handleClickFriteuseToBac(emplacement, index)}
                >
                  {emplacement.friture}
                </button>
              ))}
              {friteuse.map((emplacement: Friture, index: number) => (
                <button disabled={true} key={index}>
                  {emplacement.friture}
                </button>
              ))}
              {placeVideFriteuse.map((emplacement: Friture, index: number) => (
                <button key={index}>{emplacement.friture}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friteuse;
