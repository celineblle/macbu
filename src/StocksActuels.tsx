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
import {
  prixQuantiteFrites,
  prixQuantiteNugget,
  prixQuantitePains,
  prixQuantiteFromages,
  prixQuantiteIngredientsBurger,
  prixQuantiteSauces,
  prixQuantiteIngredientSalade,
  prixQuantiteGrill,
  prixQuantiteSac,
  prixQuantiteBoisson,
  prixQuantiteAutresProduits,
  prixQuantiteGlace,
  prixQuantiteFriture,
} from "./elements/prixIngredient";

export interface StocksActuelsType {
  poste: string;
  tableauPrixQuantite: [number, number][];
  stockActuel: {
    produit: string;
    quantite: number;
  }[];
}

export interface StocksActuelInteriorType {
  produit: string;
  quantite: number;
}

export const nomDesPostesCuisine: [string, string[], [number, number][]][] = [
  ["frite", frite, prixQuantiteFrites],
  ["nugget", nomsNuggets, prixQuantiteNugget],
  ["friture", frituresCuisine, prixQuantiteFriture],
  ["pain", pains, prixQuantitePains],
  ["fromage", fromages, prixQuantiteFromages],
  ["ingredient burger", ingredientBurger, prixQuantiteIngredientsBurger],
  ["sauce", sauces, prixQuantiteSauces],
  ["ingredient salade", ingredientSalade, prixQuantiteIngredientSalade],
  ["viande", viande, prixQuantiteGrill],
];

export const nomDesPostesComptoir: [string, string[], [number, number][]][] = [
  ["boisson", boisson, prixQuantiteBoisson],
  ["glace", glaceToppings, prixQuantiteGlace],
  ["autre", frais, prixQuantiteAutresProduits],
];

export function stocksActuels(
  setStocksCuisine: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>,
  setStocksComptoir: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>
) {
  const finalStocksCuisine: StocksActuelsType[] = [];
  const finalStockComptoir: StocksActuelsType[] = [];

  function getProduct(
    tabProduit: string[],
    nomPoste: string,
    tabPrix: [number, number][]
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
      tableauPrixQuantite: tabPrix,
      stockActuel: tabDeStock,
    };
    return currentPosteStock;
  }

  function getStocksFinal(nomTab: [string, string[], [number, number][]][]) {
    for (let i = 0; i < nomTab.length; i++) {
      const currentNewStock = getProduct(
        nomTab[i][1],
        nomTab[i][0],
        nomTab[i][2]
      );
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
      tableauPrixQuantite: prixQuantiteSac,
      stockActuel: tabDeStock,
    };
    finalStockComptoir.push(currentPosteStock);
  }

  getStocksSac();
  setStocksComptoir(finalStockComptoir);
  setStocksCuisine(finalStocksCuisine);
}
