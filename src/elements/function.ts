import { ProduitEtMenu, Produit } from "./burgers";
import { frituresCuisine, viande } from "./stocks";

function isItBoisson(element: Produit): string | undefined {
  if ("saveur" in element) {
    const boissonAffichageCommande: string = `${element.tailleProduit} ${element.saveur}`;
    return boissonAffichageCommande;
  } else {
    return undefined;
  }
}

function isItGlace(element: Produit): string | undefined {
  if ("topping" in element && "coulis" in element) {
    const glaceAffichageCommande: string = `${element.topping} ${element.coulis}`;
    return glaceAffichageCommande;
  } else {
    return undefined;
  }
}

function isItFrite(element: Produit): string | undefined {
  if ("complement" in element && element.sousType === "frite") {
    const friteAffichageCommande: string = `${element.tailleProduit} ${element.complement}`;
    return friteAffichageCommande;
  } else {
    return undefined;
  }
}

function isItNugget(element: Produit): string | undefined {
  if ("nombreNugget" in element) {
    return element.nom;
  } else if ("pain" in element) {
    if (frituresCuisine.includes(element.viande)) {
      return element.viande;
    }
  } else if ("feculent" in element) {
    if (frituresCuisine.includes(element.topping)) {
      return element.topping;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

function isItSteak(element: Produit) {
  if ("viande" in element) {
    if (viande.includes(element.viande)) {
      return element.viande;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

function isItBurger(element: Produit) {
  if ("viande" in element) {
    return element.nom;
  } else {
    return undefined;
  }
}

export function demantelerMenu(commandes: ProduitEtMenu[][]): Produit[][] {
  let currentCommande: Produit[] = [];
  const allCommandes: Produit[][] = [];

  for (let i = 0; i < commandes.length; i++) {
    for (let j = 0; j < commandes[i].length; j++) {
      const currentElement: ProduitEtMenu = commandes[i][j];
      if ("boisson" in currentElement) {
        currentCommande.push(
          currentElement.boisson,
          currentElement.accompagnement,
          currentElement.sandwich
        );
        if ("dessert" in currentElement) {
          currentCommande.push(currentElement.dessert);
        }
      } else {
        currentCommande.push(currentElement);
      }
    }
    allCommandes.push(currentCommande);
    currentCommande = []
  }

  return allCommandes;
}

export function quiEstQuoi(poste: string, commandes: Produit[][]): string[][] {
  const commandesParPoste: string[][] = [];
  let currentCommandes: string[] = [];
  let fonction = isItBoisson;

  switch (poste) {
    case "boisson":
      fonction = isItBoisson;
      break;
    case "glace":
      fonction = isItGlace;
      break;
    case "frite":
      fonction = isItFrite;
      break;
    case "nugget":
      fonction = isItNugget;
      break;
    case "steak":
      fonction = isItSteak;
      break;
    case "burger":
      fonction = isItBurger;
      break;
  }
  for (let i = 0; i < commandes.length; i++) {
    for (let j = 0; j < commandes[i].length; j++) {
      const currentProduit = fonction(commandes[i][j]);
      if (currentProduit !== undefined) {
        currentCommandes.push(currentProduit);
      }
    }   
    if (currentCommandes.length > 0) {
      commandesParPoste.push(currentCommandes);
      currentCommandes = []
    }
  }
  return commandesParPoste;
}
