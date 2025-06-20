import { useState } from "react";
import { nomsNuggets } from "./elements/burgers";
import {
  frituresCuisine,
  pains,
  fromages,
  ingredientBurger,
  sauces,
  ingredientSalade,
  viande,
  sac,
  boisson,
  glaceToppings,
  frite,
  frais,
} from "./elements/stocks";

export interface StocksActuelsType {
  poste: string;
  stockActuel: {
    produit: string;
    quantite: number;
  }[];
}

function StocksActuels() {
  const [stocksCuisine, setStocksCuisine] = useState<StocksActuelsType[]>([]);
  const [stocksComptoir, setStocksComptoir] = useState<StocksActuelsType[]>([]);

  function getProduct(
    tabProduit: string[],
    nomPoste: string
  ): StocksActuelsType {
    const tabDeStock = [];

    for (let i = 0; i < tabProduit.length; i++) {
      const currentObject = {
        produit: tabProduit[i],
        quantite: 0,
      };
      tabDeStock.push(currentObject);
    }
    const currentPosteStock: StocksActuelsType = {
      poste: nomPoste,
      stockActuel: tabDeStock,
    };
    return currentPosteStock;
  }

  const nomDesPostesCuisine: [string, string[]][] = [
    ["frite", frite],
    ["nugget", nomsNuggets],
    ["friture", frituresCuisine],
    ["pain", pains],
    ["fromange", fromages],
    ["ingredient burger", ingredientBurger],
    ["sauce", sauces],
    ["ingredient salade", ingredientSalade],
    ["viande", viande],
  ];

  const nomDesPostesComptoir: [string, string[]][] = [
    ["boisson", boisson],
    ["glace", glaceToppings],
    ["autre", frais],
  ];

  function getStocksFinal(nomTab: [string, string[]][]) {
    for (let i = 0; i < nomTab.length; i++) {
      const currentNewStock = getProduct(nomTab[i][1], nomTab[i][0]);
      if (nomTab.length === 3) {
        setStocksComptoir([...stocksComptoir, currentNewStock]);
      } else {
        setStocksCuisine([...stocksCuisine, currentNewStock]);
      }
    }
  }

  getStocksFinal(nomDesPostesCuisine);
  getStocksFinal(nomDesPostesComptoir);

  function getStocksSac() {
    const tabDeStock = [];
    for (let i = 0; i < sac.length; i++) {
      const currentObject = {
        produit: sac[i][0],
        quantite: 0,
      };
      tabDeStock.push(currentObject);
    }
    const currentPosteStock: StocksActuelsType = {
      poste: "sac",
      stockActuel: tabDeStock,
    };
    setStocksCuisine([...stocksCuisine, currentPosteStock]);
  }

  getStocksSac();
}

export default StocksActuels;
