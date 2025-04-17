import React, { useState, useRef, useEffect } from "react";
import "./Cuisine.css";
import { viande } from "../../elements/stocks";
import {
  Friture,
  frituresCuisineQuantite,
} from "../../elements/ingredientsQuantite";
import PosteAssemblage from "./PosteAssemblage";
import Friteuse from "./Friteuse";
import FriteuseNugget from "./FriteuseNugget";
import Grill from "./Grill";

export interface ViandePret {
  nom: string;
  quantite: number;
}

function Cuisine() {
  function getStockPret(): ViandePret[] {
    const viandePretTab: ViandePret[] = [];
    for (let i = 0; i < viande.length; i++) {
      const currentViande: ViandePret = {
        nom: viande[i],
        quantite: 0,
      };
      viandePretTab.push(currentViande);
    }
    return viandePretTab;
  }

  const viandePretTab: ViandePret[] = getStockPret();
  const [viandePret, setViandePret] = useState<ViandePret[]>(viandePretTab);
  const viandePretRef = useRef<ViandePret[]>(viandePretTab);

  useEffect(() => {
    viandePretRef.current = viandePret;
  }, [viandePret]);

  function getFinalStockFriture(): Friture[] {
    const tabBacFriture: Friture[] = [];

    for (let i = 0; i < frituresCuisineQuantite.length; i++) {
      const currentFriture: Friture = {
        friture: frituresCuisineQuantite[i].friture,
        quantiteSachet: 0,
      };
      tabBacFriture.push(currentFriture);
    }

    return tabBacFriture;
  }

  const tabBacFriture: Friture[] = getFinalStockFriture();
  const [bacFriture, setBacFriture] = useState<Friture[]>(tabBacFriture);
  const bacFritureRef = useRef<Friture[]>(tabBacFriture);

  useEffect(() => {
    bacFritureRef.current = bacFriture;
  }, [bacFriture]);

  return (
    <div id="cuisineComponent">
      <div id="lesFriteuses">
        <Friteuse />
        <FriteuseNugget
          bacFriture={bacFriture}
          setBacFriture={setBacFriture}
          bacFritureRef={bacFritureRef}
        />
      </div>
      <PosteAssemblage
        viandePretRef={viandePretRef}
        setViandePret={setViandePret}
        bacFritureRef={bacFritureRef}
        setBacFriture={setBacFriture}
      />
      <Grill
        viandePret={viandePret}
        setViandePret={setViandePret}
        viandePretRef={viandePretRef}
      />
    </div>
  );
}

export default Cuisine;
