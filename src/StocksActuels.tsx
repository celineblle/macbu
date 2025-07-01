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

export const nomDesPostesCuisine: [string, string[]][] = [
  ["frite", frite],
  ["nugget", nomsNuggets],
  ["friture", frituresCuisine],
  ["pain", pains],
  ["fromage", fromages],
  ["ingredient burger", ingredientBurger],
  ["sauce", sauces],
  ["ingredient salade", ingredientSalade],
  ["viande", viande],
];

export const nomDesPostesComptoir: [string, string[]][] = [
  ["boisson", boisson],
  ["glace", glaceToppings],
  ["autre", frais],
];

export function StocksActuels(
  setStocksCuisine: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>,
  setStocksComptoir: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>
) {
  const finalStocksCuisine: StocksActuelsType[] = [];
  const finalStockComptoir: StocksActuelsType[] = [];

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

  function getStocksFinal(nomTab: [string, string[]][]) {
    for (let i = 0; i < nomTab.length; i++) {
      const currentNewStock = getProduct(nomTab[i][1], nomTab[i][0]);
      if (nomTab.length === 3) {
        finalStockComptoir.push(currentNewStock);
      } else {
        finalStocksCuisine.push(currentNewStock);
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
    finalStockComptoir.push(currentPosteStock);
  }

  getStocksSac();

  setStocksComptoir(finalStockComptoir);
  setStocksCuisine(finalStocksCuisine);
}
