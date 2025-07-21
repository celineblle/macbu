import { frituresCuisine, frite, taille } from "./stocks";

export interface Friture {
  friture: string;
  quantiteSachet: number;
}

export interface PortionFrite {
  base: string;
  quantite: number;
  tailleProduit: string;
}

export interface BacTimeOut {
  timeout?: number;
  bac?: string;
}

export interface EtatBacAFrite {
  friture: string;
  quantiteSachet: number;
  grille: boolean;
}

export const frituresCuisineQuantite: Friture[] = [
  {
    friture: frituresCuisine[0],
    quantiteSachet: 20,
  },
  {
    friture: frituresCuisine[1],
    quantiteSachet: 20,
  },
  {
    friture: frituresCuisine[2],
    quantiteSachet: 10,
  },
  {
    friture: frituresCuisine[3],
    quantiteSachet: 15,
  },
  {
    friture: frituresCuisine[4],
    quantiteSachet: 10,
  },
];

export const frites: Friture[] = [
  {
    friture: frite[0],
    quantiteSachet: 20,
  },
  {
    friture: frite[1],
    quantiteSachet: 20,
  },
];

function getPortionFrite(): PortionFrite[] {
  const allFrites: PortionFrite[] = [];

  for (let i = 0; i < frites.length; i++) {
    let quantite: number = 3;
    for (let j = 0; j < taille.length; j++) {
      allFrites.push({
        base: frite[i],
        quantite: quantite,
        tailleProduit: taille[j],
      });
      quantite = quantite - 1;
    }
  }
  return allFrites;
}

export const portionFrite: PortionFrite[] = getPortionFrite();
