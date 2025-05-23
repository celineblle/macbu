import { Produit, ProduitEtMenu, Salade, Nugget, Burger, Accompagnement, Boisson, GlaceType, allProduits, salade, saladeCesar, boissons, adultAccompagnement, pouce, legume, jusDefruit, fruits } from "../../elements/burgers";
import { Menu, MenuEnfant, menuEnfant } from "../../elements/menus";
import * as stocks from "../../elements/stocks";

const tailleMaxCommande: number = 8;

export function triProduit(commande: ProduitEtMenu[]): [(Salade | Nugget | Burger)[], Accompagnement[], Boisson[], (GlaceType | Accompagnement | Boisson)[]] {
    const plat: (Salade | Nugget | Burger)[] = [];
    const complement: Accompagnement[] = [];
    const boissonCommande: Boisson[] = [];
    const autreProduit: (GlaceType | Accompagnement | Boisson)[] = [];

    for (let i = 0; i < commande.length; i++) {
      const actuelProduit: ProduitEtMenu = commande[i];
      if (
        ("feculent" in actuelProduit ||
          "nombreNugget" in actuelProduit ||
          "pain" in actuelProduit) &&
        actuelProduit.sousType !== "enfant"
      ) {
        plat.push(actuelProduit);
      } else if (
        "complement" in actuelProduit &&
        actuelProduit.sousType !== "enfant"
      ) {
        complement.push(actuelProduit);
      } else if (
        "saveur" in actuelProduit &&
        actuelProduit.sousType !== "enfant"
      ) {
        boissonCommande.push(actuelProduit);
      } else if ("coulis" in actuelProduit) {
        autreProduit.push(actuelProduit);
      } else if (
        ("complement" in actuelProduit || "saveur" in actuelProduit) &&
        actuelProduit.sousType === "enfant"
      ) {
        autreProduit.push(actuelProduit);
      }
    }

    const finalProduitTriee: [(Salade | Nugget | Burger)[], Accompagnement[], Boisson[], (GlaceType | Accompagnement | Boisson)[]] = [plat, complement, boissonCommande, autreProduit];
    return finalProduitTriee;
  }

  export function triProduitEnfant(tableauToutProduit: Produit[][]): [(Salade | Nugget | Burger)[], Accompagnement[], Boisson[], (GlaceType | Accompagnement)[]] {
      const petitPlat: (Salade | Nugget | Burger)[] = [];
      const petitComplement: Accompagnement[] = [];
      const petiteBoisson: Boisson[] = [];
      const dessert: (GlaceType | Accompagnement)[] = [];
      const autreProduitEnfant: (GlaceType | Accompagnement | Boisson)[] = [];  

      function triParTaille(
        tableauProduit: Produit[],
        tableauEnfant: Produit[]
      ): void {
        if (tableauProduit.length === 0) {
          return;
        } else {
          for (let i = 0; i < tableauProduit.length; i++) {
            if (
              tableauProduit[i].tailleProduit === stocks.taille[2] &&
              tableauProduit[i].sousType !== "salade"
            ) {
              tableauEnfant.push(tableauProduit[i]);
              tableauProduit.splice(i, 1);
              i = 0;
            }
          }
        }
      }
  
      triParTaille(tableauToutProduit[0], petitPlat);
      triParTaille(tableauToutProduit[1], petitComplement);
      triParTaille(tableauToutProduit[2], petiteBoisson);
      triParTaille(tableauToutProduit[3], autreProduitEnfant);
  
      for (let i = 0; i < autreProduitEnfant.length; i++) {
        const actuelProduit: GlaceType | Accompagnement | Boisson =
          autreProduitEnfant[i];
        if (
          "coulis" in actuelProduit ||
          ("complement" in actuelProduit && actuelProduit.type === "dessert")
        ) {
          dessert.push(actuelProduit);
        } else if ("saveur" in actuelProduit) {
          petiteBoisson.push(actuelProduit);
        } else if (
          "complement" in actuelProduit &&
          actuelProduit.sousType === "enfant"
        ) {
          petitComplement.push(actuelProduit);
        }
      }
  
      const toutProduitEnfant:  [(Salade | Nugget | Burger)[], Accompagnement[], Boisson[], (GlaceType | Accompagnement)[]] = [petitPlat, petitComplement, petiteBoisson, dessert];
      return toutProduitEnfant;
    }
  
    export function randomCommande() {
        function getRandom(max: number): number {
          let random: number = Math.floor(Math.random() * max);
          if (random === 0) {
            random = 1;
          }
          return random;
        }
    
        const tailleCommande: number = getRandom(tailleMaxCommande);
        let commande = [];
 
        for (let i = 0; i < tailleCommande; i++) {
          const currentProduit: number = getRandom(allProduits.length - 1);
          const finalCurrentProduit: Produit = allProduits[currentProduit];
          commande.push(finalCurrentProduit);
        }
            
        function getAllMenu(commande: Produit[]) {

          const finalCommande: ProduitEtMenu[] = [];
          const commandeTrie: [(Salade | Nugget | Burger)[], Accompagnement[], Boisson[], (GlaceType | Accompagnement | Boisson)[]] = triProduit(commande);
          const commandeTrieEnfant: [(Salade | Nugget | Burger)[], Accompagnement[], Boisson[], (GlaceType | Accompagnement)[]] = triProduitEnfant(commandeTrie);
    
          const resteBurger: Produit[] = commandeTrie[0].slice();

          if (
            commandeTrie[0].length !== 0 &&
            (commandeTrie[1].length !== 0 || commandeTrie[2].length !== 0)
          ) {
            for (let i = 0; i < commandeTrie[0].length; i++) {
              if (!(commandeTrie[1].length === 0 && commandeTrie[2].length === 0)) {

                const currentSize: string = commandeTrie[0][i].tailleProduit;
                const currentMenu: Menu = {
                  sandwich: saladeCesar,
                  accompagnement: salade,
                  boisson: boissons[0],
                  taille: 0,
                };
    
                currentMenu.sandwich = commandeTrie[0][i];
                
                 resteBurger.splice(i, 1)
                let currentAccompagnement;
    
                if (commandeTrie[1].length !== 0) {
                  const produit: number = commandeTrie[1].findIndex(
                    (e) => e.tailleProduit === currentSize
                  );
                  if (produit === -1) {
                    currentAccompagnement = commandeTrie[1][0];
                    commandeTrie[1].shift();
                  } else {
                    currentAccompagnement = commandeTrie[1][produit];
                    commandeTrie[1].splice(produit, 1);
                  }
                } else {
                  const randomSaveur: number = getRandom(
                    adultAccompagnement.length - 1
                  );
                  currentAccompagnement = adultAccompagnement[randomSaveur];
                }
    
                if (currentAccompagnement.nom !== stocks.frais[0]) {
                  currentAccompagnement.tailleProduit = currentSize;
                }
                currentMenu.accompagnement =
                  currentAccompagnement;
    
                let currentBoisson;
    
                if (commandeTrie[2].length !== 0) {
                  const produit: number = commandeTrie[2].findIndex(
                    (e) => e.tailleProduit === currentSize
                  );
                  if (produit === -1) {
                    currentBoisson = commandeTrie[2][0];
                    commandeTrie[2].shift();
                  } else {
                    currentBoisson = commandeTrie[2][produit];
                    commandeTrie[2].splice(produit, 1);
                  }
                } else {
                  const randomSaveur: number = getRandom(boissons.length - 1);
                  currentBoisson = boissons[randomSaveur];
                }
    
                currentBoisson.tailleProduit = currentSize;
                currentMenu.boisson = currentBoisson;
    
                let tailleMenu: number = currentSize === stocks.taille[0] ? 3 : 2;
                tailleMenu = tailleMenu * 3;
                currentMenu.taille = tailleMenu;
                finalCommande.push(currentMenu);
              }
            }
          }
    
          if (commandeTrieEnfant[0].length !== 0) {
            for (let i = 0; i < commandeTrieEnfant[0].length; i++) {
              const currentMenu: MenuEnfant = {
                sandwich: pouce,
                accompagnement: legume,
                boisson: jusDefruit,
                dessert: fruits,
                taille: 4,
              };
    
              currentMenu.sandwich = commandeTrieEnfant[0][i];
    
              if (commandeTrieEnfant[1].length !== 0) {
                currentMenu.accompagnement =
                  commandeTrieEnfant[1][0];
                commandeTrieEnfant[1].shift();
              } else {
                const randomSaveur: number = getRandom([1].length - 1);
                currentMenu.accompagnement = menuEnfant[1][
                  randomSaveur
                ];
              }
    
              if (commandeTrieEnfant[2].length !== 0) {
                currentMenu.boisson = commandeTrieEnfant[2][0];
                commandeTrieEnfant[2].shift();
              } else {
                const randomSaveur: number = getRandom(menuEnfant[2].length - 1);
                currentMenu.boisson = menuEnfant[2][randomSaveur];
              }
    
              if (commandeTrieEnfant[3].length !== 0) {
                currentMenu.dessert = commandeTrieEnfant[3][0];
                commandeTrieEnfant[3].shift();
              } else {
                const randomSaveur: number = getRandom(menuEnfant[3].length - 1);
                currentMenu.dessert = menuEnfant[3][randomSaveur];
              }
    
              finalCommande.push(currentMenu);
            }
          }
    
          function finirCommande(tableauProduit: Produit[]): void {
            for (let i = 0; i < tableauProduit.length; i++) {
              finalCommande.push(tableauProduit[i]);
            }
          }
    
          for (let i = 1; i < commandeTrie.length; i++) {
            if (commandeTrie[i].length > 0) {
              finirCommande(commandeTrie[i]);
            }
            if (commandeTrieEnfant[i].length !== 0) {
              finirCommande(commandeTrieEnfant[i]);
            }
          }

          if(resteBurger.length > 0) {
            finirCommande(resteBurger)
          }

          return finalCommande;
        }
        commande = getAllMenu(commande);

        return commande;
      }

export function affichageCommande(
        commandeActuelle: ProduitEtMenu[]
      ): (string | string[])[] {
        const newVersionCommande: (string | string[])[] = [];
        let menuVersion: string[] = [];
    
        for (let i = 0; i < commandeActuelle.length; i++) {
          let finalProduct: string | string[] = "";
          const produitEnCour = commandeActuelle[i];
          if ("sandwich" in produitEnCour) {
            menuVersion.push("menu");
            menuVersion.push(produitEnCour.sandwich.nom);
            menuVersion.push(
              `${produitEnCour.accompagnement.tailleProduit} ${produitEnCour.accompagnement.nom}`
            );
            menuVersion.push(
              `${produitEnCour.boisson.tailleProduit} ${produitEnCour.boisson.nom}`
            );
            if ("dessert" in produitEnCour) {
              if ("coulis" in produitEnCour.dessert) {
                menuVersion.push(
                  `${produitEnCour.dessert.coulis} ${produitEnCour.dessert.topping}`
                );
              } else {
                menuVersion.push(produitEnCour.dessert.nom);
              }
            }
            finalProduct = menuVersion;
            menuVersion = [];
          } else if ("feculent" in produitEnCour || "pain" in produitEnCour) {
            finalProduct = produitEnCour.nom;
          } else if ("nombreNugget" in produitEnCour) {
            finalProduct = produitEnCour.nom;
          } else if ("coulis" in produitEnCour) {
            finalProduct = `${produitEnCour.nom} ${produitEnCour.coulis} ${produitEnCour.topping}`;
          } else if (
            ("saveur" in produitEnCour || "complement" in produitEnCour) &&
            produitEnCour.sousType === "enfant"
          ) {
            finalProduct = produitEnCour.nom;
          } else if (
            ("saveur" in produitEnCour && produitEnCour.type === "boisson") ||
            ("complement" in produitEnCour &&
              produitEnCour.type === "accompagnement")
          ) {
            finalProduct = `${produitEnCour.tailleProduit} ${produitEnCour.nom}`;
          }
          newVersionCommande.push(finalProduct);
          finalProduct = "";
        }
        return newVersionCommande;
      }
    