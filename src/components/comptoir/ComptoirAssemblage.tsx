import React, { useEffect, useRef, useState } from "react";
import * as stocks from "../../elements/stocks";
import close from "../../assets/close.svg"
import {
  Accompagnement,
  Boisson,
  Burger,
  Salade,
  Nugget,
  Glace,
  boissons,
  adultAccompagnement,
  glaces,
  allProduits,
  saladeCesar,
  salade,
  jusDefruit,
  fruits,
  legume,
  pouce,
} from "../../elements/burgers";
import { Menu, menuEnfant, MenuEnfant } from "../../elements/menus";
import "./ComptoirAssemblage.css";

function ComptoirAssemblage() {
  const burger = [
    {
      nom: "Origin Burger",
      pain: stocks.pains[6],
      viande: stocks.viande[3],
      ingredient: [stocks.ingredientBurger[2], stocks.ingredientBurger[5]],
      sauce: [stocks.sauces[5], stocks.sauces[7]],
      emballage: stocks.boiteBurger[2],
      tailleProduit: stocks.taille[2],
      type: "sandwich",
      sousType: "burger",
      conforme: true,
    },
    {
      nom: "Opti Bacon",
      pain: stocks.pains[1],
      viande: stocks.viande[4],
      fromage: [stocks.fromages[1]],
      ingredient: [
        stocks.ingredientBurger[4],
        stocks.ingredientBurger[5],
        stocks.ingredientBurger[2],
      ],
      sauce: [stocks.sauces[5], stocks.sauces[7]],
      emballage: stocks.boiteBurger[0],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      conforme: true,
    },
    {
      nom: "Classic Big",
      pain: stocks.pains[1],
      viande: stocks.viande[4],
      fromage: [stocks.fromages[2]],
      ingredient: [
        stocks.ingredientBurger[1],
        stocks.ingredientBurger[0],
        stocks.ingredientBurger[2],
      ],
      sauce: [stocks.sauces[4]],
      emballage: stocks.boiteBurger[0],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      conforme: true,
    },
    {
      nom: "Fish N Pan",
      pain: stocks.pains[7],
      viande: stocks.frituresCuisine[2],
      fromage: [stocks.fromages[1]],
      ingredient: [stocks.ingredientBurger[0], stocks.ingredientBurger[1]],
      sauce: [stocks.sauces[2]],
      emballage: stocks.boiteBurger[0],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      conforme: true,
    },
    {
      nom: "Special Bu",
      pain: stocks.pains[1],
      viande: stocks.viande[2],
      fromage: [stocks.fromages[2]],
      ingredient: [
        stocks.ingredientBurger[2],
        stocks.ingredientBurger[0],
        stocks.ingredientBurger[3],
      ],
      sauce: [stocks.sauces[3]],
      emballage: stocks.boiteBurger[0],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      conforme: false,
    },
    {
      nom: "Big Cheese Origin",
      pain: stocks.pains[1],
      viande: stocks.viande[2],
      fromage: [stocks.fromages[1]],
      ingredient: [stocks.ingredientBurger[5], stocks.ingredientBurger[2]],
      sauce: [stocks.sauces[5], stocks.sauces[3]],
      emballage: stocks.boiteBurger[0],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      conforme: false,
    },
    {
      nom: "Italicain",
      pain: stocks.pains[1],
      viande: stocks.viande[4],
      fromage: [stocks.fromages[3], stocks.fromages[2]],
      ingredient: [stocks.ingredientBurger[1]],
      sauce: [stocks.sauces[0]],
      emballage: stocks.boiteBurger[0],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      conforme: false,
    },
    {
      nom: "Bacon Basic",
      pain: stocks.pains[4],
      viande: stocks.frituresCuisine[4],
      fromage: [stocks.fromages[1]],
      ingredient: [
        stocks.ingredientBurger[0],
        stocks.ingredientBurger[2],
        stocks.ingredientBurger[6],
      ],
      sauce: [stocks.sauces[1]],
      emballage: stocks.boiteBurger[0],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      conforme: false,
    },
  ];

  const frites = [
    {
      nom: stocks.frite[1],
      complement: stocks.frite[1],
      emballage: stocks.emballageFrite[0],
      tailleProduit: stocks.taille[0],
      type: "accompagnement",
      sousType: "frite",
    },
    {
      nom: stocks.frite[1],
      complement: stocks.frite[1],
      emballage: stocks.emballageFrite[1],
      tailleProduit: stocks.taille[1],
      type: "accompagnement",
      sousType: "frite",
    },
    {
      nom: stocks.frite[0],
      complement: stocks.frite[0],
      emballage: stocks.emballageFrite[2],
      tailleProduit: stocks.taille[2],
      type: "accompagnement",
      sousType: "frite",
    },
    {
      nom: stocks.frite[0],
      complement: stocks.frite[0],
      emballage: stocks.emballageFrite[0],
      tailleProduit: stocks.taille[0],
      type: "accompagnement",
      sousType: "frite",
    },
  ];

  const boissonsTest = [
    {
      nom: stocks.boisson[5],
      saveur: stocks.boisson[5],
      emballage: stocks.gobelet[2],
      tailleProduit: stocks.taille[2],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[6],
      saveur: stocks.boisson[6],
      emballage: stocks.gobelet[2],
      tailleProduit: stocks.taille[2],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[4],
      saveur: stocks.boisson[4],
      emballage: stocks.gobelet[1],
      tailleProduit: stocks.taille[1],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[2],
      saveur: stocks.boisson[2],
      emballage: stocks.gobelet[1],
      tailleProduit: stocks.taille[1],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[0],
      saveur: stocks.boisson[0],
      emballage: stocks.gobelet[0],
      tailleProduit: stocks.taille[0],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[3],
      saveur: stocks.boisson[3],
      emballage: stocks.gobelet[0],
      tailleProduit: stocks.taille[0],
      type: "boisson",
      sousType: "cannette",
    },
  ];

  const glace = [
    {
      nom: "Glace",
      base: "Glace au lait",
      topping: stocks.glaceToppings[2],
      coulis: stocks.glaceToppings[0],
      emballage: stocks.gobelet[3],
      tailleProduit: stocks.taille[1],
      type: "dessert",
      sousType: "glace",
    },
    {
      nom: "Glace",
      base: "Glace au lait",
      topping: stocks.glaceToppings[3],
      coulis: stocks.glaceToppings[0],
      emballage: stocks.gobelet[3],
      tailleProduit: stocks.taille[1],
      type: "dessert",
      sousType: "glace",
    },
    {
      nom: "Glace",
      base: "Glace au lait",
      topping: stocks.glaceToppings[2],
      coulis: stocks.glaceToppings[1],
      emballage: stocks.gobelet[3],
      tailleProduit: stocks.taille[1],
      type: "dessert",
      sousType: "glace",
    },
    {
      nom: "Glace",
      base: "Glace au lait",
      topping: stocks.glaceToppings[3],
      coulis: stocks.glaceToppings[1],
      emballage: stocks.gobelet[3],
      tailleProduit: stocks.taille[1],
      type: "dessert",
      sousType: "glace",
    },
  ];

  const elementsCommandes = [
    {
      nom: "Burgers",
      produit: burger,
      maxLength: burger.length,
    },
    {
      nom: "Frites",
      produit: frites,
      maxLength: frites.length,
    },
    {
      nom: "Boisson",
      produit: boissonsTest,
      maxLength: boissonsTest.length,
    },
    {
      nom: "Glaces",
      produit: glaces,
      maxLength: glaces.length,
    },
  ];

  const tailleAPreparer: number = 4;
  const tailleEnCour: number = 4;
  const tailleMaxCommande: number = 8;

  type Produit = Salade | Nugget | Burger | Glace | Accompagnement | Boisson;
  type ProduitEtMenu = Produit | Menu | MenuEnfant;

  const [buttonActionModalComptoirA, setButtonActionModalComptoirA] =
    useState<boolean>(false);
  const [tabActionComptoirA, setTabActionComptoirA] = useState<string>(
    elementsCommandes[0].nom
  );
  const [commandeAPreparer, setCommandeAPreparer] = useState<ProduitEtMenu[][]>(
    []
  );
  const [aPreparerAffichage, setAPreparerAffichage] = useState<
    (string | string[])[][]
  >([]);
  const [aPreparerVide, setAPreparerVide] = useState<string[]>([]);
  const [timeAPreparer, setTimeAPreparer] = useState<number[]>([]);
  const [commandeEnCour, setCommandeEnCour] = useState<ProduitEtMenu[][]>([]);
  const [idPlateauPrepa, setIdPlateauPrepa] = useState<number>(0);
  const [enCourAffichage, setEnCourAffichage] = useState<
    (string | string[])[][]
  >([]);
  const [enCourVide, setEnCourVide] = useState<string[]>([]);
  const [validerPlateau, setValiderPlateau] = useState<boolean>(false);

  const aPreparerRef = useRef<ProduitEtMenu[][]>([]);
  const aPreparerAffichageRef = useRef<(string | string[])[][]>([]);
  const timeAPreparerRef = useRef<number[]>([]);
  const enCourRef = useRef<ProduitEtMenu[][]>([]);
  const enCourAffichageRef = useRef<(string | string[])[][]>([]);
  const idPlateauRef = useRef<number>(0);

  useEffect(() => {
    aPreparerRef.current = commandeAPreparer;
  }, [commandeAPreparer]);

  useEffect(() => {
    aPreparerAffichageRef.current = aPreparerAffichage;
  }, [aPreparerAffichage]);

  useEffect(() => {
    timeAPreparerRef.current = timeAPreparer;
  }, [timeAPreparer]);

  useEffect(() => {
    enCourRef.current = commandeEnCour;
  }, [commandeEnCour]);

  useEffect(() => {
    enCourAffichageRef.current = enCourAffichage;
  }, [enCourAffichage]);

  useEffect(() => {
    idPlateauRef.current = idPlateauPrepa;
  }, [idPlateauPrepa]);

  function handleClickActionModal(): void {
    setButtonActionModalComptoirA(!buttonActionModalComptoirA);
  }

  function handleClickTab(nom: string): void {
    setTabActionComptoirA(nom);
  }

  function triProduit(commande: ProduitEtMenu[]): Produit[][] {
    const plat: (Salade | Nugget | Burger)[] = [];
    const complement: Accompagnement[] = [];
    const boissonCommande: Boisson[] = [];
    const autreProduit: (Glace | Accompagnement | Boisson)[] = [];
    const finalProduitTriee: Produit[][] = [];

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

    finalProduitTriee.push(plat, complement, boissonCommande, autreProduit);
    return finalProduitTriee;
  }
  
  function triProduitEnfant(tableauToutProduit: Produit[][]): Produit[][] {
    const petitPlat: (Salade | Nugget | Burger)[] = [];
    const petitComplement: Accompagnement[] = [];
    const petiteBoisson: Boisson[] = [];
    const dessert: (Glace | Accompagnement)[] = [];
    const autreProduitEnfant: (Glace | Accompagnement | Boisson)[] = [];
    const toutProduitEnfant: Produit[][] = [];

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
      const actuelProduit: Glace | Accompagnement | Boisson =
        autreProduitEnfant[i];
      if (
        "coulis" in actuelProduit ||
        ("complement" in actuelProduit && actuelProduit.type === "dessert")
      ) {
        dessert.push(actuelProduit);
      } else if ("saveur" in actuelProduit) {
        petiteBoisson.push(actuelProduit);
      } else if ("complement" in actuelProduit && actuelProduit.sousType === "enfant") {
        petitComplement.push(actuelProduit)
      }
    }

    toutProduitEnfant.push(
      petitPlat,
      petitComplement,
      petiteBoisson,
      dessert
    );
    return toutProduitEnfant;
  }

  function randomCommande() {
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
      const commandeTrie: Produit[][] = triProduit(commande);
      const commandeTrieEnfant: Produit[][] = triProduitEnfant(commandeTrie);

      if(commandeTrie[0].length !== 0 && (commandeTrie[1].length !== 0 || commandeTrie[2].length !== 0)) {
        for(let i = 0; i < commandeTrie[0].length; i++) {
          if(commandeTrie[1].length === 0 && commandeTrie[2].length === 0) {
            finalCommande.push(commandeTrie[0][i]);
          } else {
            const currentSize: string = commandeTrie[0][i].tailleProduit;
            const indexSize: number = stocks.taille.indexOf(currentSize);
            const currentMenu: Menu = {
              sandwich: saladeCesar,
              accompagnement: salade,
              boisson: boissons[0],
              taille: 0,
            };

            currentMenu.sandwich = commandeTrie[0][i] as  Salade | Burger | Nugget;

            let currentAccompagnement;

            if(commandeTrie[1].length !== 0) {
               const produit: number = commandeTrie[1].findIndex((e) => e.tailleProduit === currentSize);
              if(produit === -1) {
                currentAccompagnement = commandeTrie[1][0];
                commandeTrie[1].shift();
              } else {
                currentAccompagnement = commandeTrie[1][produit];
                commandeTrie[1].splice(produit, 1);
              }
            } else {
              const randomSaveur: number = getRandom(adultAccompagnement.length - 1);
              currentAccompagnement = adultAccompagnement[randomSaveur];
            }

            if(currentAccompagnement.nom !== stocks.frais[0]) {
              currentAccompagnement.emballage = stocks.emballageFrite[indexSize];
              currentAccompagnement.tailleProduit = currentSize;
            }
            currentMenu.accompagnement = currentAccompagnement as Accompagnement;

            let currentBoisson;

            if(commandeTrie[2].length !== 0) {
              const produit: number = commandeTrie[2].findIndex((e) => e.tailleProduit === currentSize);
              if(produit === -1) {
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

              currentBoisson.emballage = stocks.gobelet[indexSize];
              currentBoisson.tailleProduit = currentSize;
             currentMenu.boisson = currentBoisson as Boisson;

             let tailleMenu: number = currentSize === stocks.taille[0] ? 3 : 2;
             tailleMenu = tailleMenu * 3;
             currentMenu.taille = tailleMenu;
             finalCommande.push(currentMenu);
          }
        }
      }

      if(commandeTrieEnfant[0].length !== 0 ) {
        for(let i = 0; i < commandeTrieEnfant[0].length; i++) {
          const currentMenu: MenuEnfant = {
            sandwich: pouce,
            accompagnement: legume,
            boisson: jusDefruit,
            dessert: fruits,
            taille: 4,
          };
          
          currentMenu.sandwich = commandeTrieEnfant[0][i] as Nugget | Burger;

          if(commandeTrieEnfant[1].length !== 0) {
            currentMenu.accompagnement = commandeTrieEnfant[1][0] as Accompagnement;
            commandeTrieEnfant[1].shift();
          } else {
            const randomSaveur: number = getRandom(menuEnfant[1].length - 1)
            currentMenu.accompagnement = menuEnfant[1][randomSaveur] as Accompagnement
          }

          if(commandeTrieEnfant[2].length !== 0) {
            currentMenu.boisson = commandeTrieEnfant[2][0] as Boisson;
            commandeTrieEnfant[2].shift();
          } else {
            const randomSaveur: number = getRandom(menuEnfant[2].length - 1)
            currentMenu.boisson = menuEnfant[2][randomSaveur] as Boisson
          }

          if(commandeTrieEnfant[3].length !== 0) {
            currentMenu.dessert = commandeTrieEnfant[3][0] as Glace | Accompagnement;
            commandeTrieEnfant[3].shift();
          } else {
            const randomSaveur: number = getRandom(menuEnfant[3].length - 1)
            currentMenu.dessert = menuEnfant[3][randomSaveur] as Glace | Accompagnement
          }

          finalCommande.push(currentMenu);
        }
      }

      function finirCommande(tableauProduit: Produit[]): void {
        for(let i = 0; i < tableauProduit.length; i++) {
          finalCommande.push(tableauProduit[i])
        }
      }

      for(let i = 1; i < commandeTrie.length; i++) {
        if(commandeTrie[i].length !== 0) {
          finirCommande(commandeTrie[i])
        }
        if(commandeTrieEnfant[i].length !== 0) {
          finirCommande(commandeTrieEnfant[i])
        }
      }

      return finalCommande;
    }
    commande = getAllMenu(commande);
    return commande;
  }

  function affichageCommande(
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
              `${produitEnCour.dessert.topping} ${produitEnCour.dessert.coulis}`
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
        finalProduct = `${produitEnCour.nom} ${produitEnCour.topping} ${produitEnCour.coulis}`;
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

  function handleClickPlateau(position: number): void {
    if (position === -1) {
      setIdPlateauPrepa(enCourRef.current.length);
    } else {
      setIdPlateauPrepa(position);
    }
  }

  function handleClickRemplirPlateau(plat: Produit): void {
    const allCommandeEnCourCopie: ProduitEtMenu[][] = enCourRef.current.slice();
    let commandeCopie: ProduitEtMenu[] = [];
    if (allCommandeEnCourCopie[idPlateauRef.current] !== undefined) {
      commandeCopie = allCommandeEnCourCopie[idPlateauRef.current];
    }

    commandeCopie.push(plat);
    allCommandeEnCourCopie.splice(idPlateauRef.current, 1, commandeCopie);
    setCommandeEnCour(allCommandeEnCourCopie);

    const commandeAffichageCopie: (string | string[])[] =
      affichageCommande(commandeCopie);
    const enCourTabAffichageCopie: (string | string[])[][] =
      enCourAffichageRef.current.slice();
    enCourTabAffichageCopie.splice(
      idPlateauRef.current,
      1,
      commandeAffichageCopie
    );
    setEnCourAffichage(enCourTabAffichageCopie);
  }

  function handleClickSupprimerPlat(commande: number, plat: number): void {
    const allCommandeEnCourCopie: ProduitEtMenu[][] = enCourRef.current.slice();
    const commandeCopie: ProduitEtMenu[] = allCommandeEnCourCopie[commande];
    commandeCopie.splice(plat, 1);
    allCommandeEnCourCopie.splice(commande, 1, commandeCopie);
    setCommandeAPreparer(allCommandeEnCourCopie);

    const allCommandeAffichageCopie: (string | string[])[][] =
      enCourAffichageRef.current;
    const commandeAffichageCopie: (string | string[])[] =
      allCommandeAffichageCopie[commande];
    commandeAffichageCopie.splice(plat, 1);
    allCommandeAffichageCopie.splice(commande, 1, commandeAffichageCopie);
    setEnCourAffichage(allCommandeAffichageCopie);
  }

  function handleClickFinirPlateau(plateau: number): void {
    setIdPlateauPrepa(plateau);
    setValiderPlateau(true);
  }

  function handleClickValiderPlateau(commande: number): boolean {
    if (validerPlateau === true) {
      const copiePlateau: ProduitEtMenu[] = enCourRef.current[idPlateauPrepa].slice();
      const copieCommande: ProduitEtMenu[] = aPreparerRef.current[commande].slice();

      for (let i = 0; i < copieCommande.length; i++) {
        const currentProduit = copieCommande[i];
        if ("sandwich" in currentProduit) {
          copieCommande.push(
            currentProduit.sandwich,
            currentProduit.accompagnement,
            currentProduit.boisson
          );
          if ("dessert" in currentProduit) {
            copieCommande.push(currentProduit.dessert);
          }
          copieCommande.splice(i, 1);
          i = 0;
        }
      }

const copiePlateauTrie: Produit[][] = triProduit(copiePlateau);
const copieCommandeTrie: Produit[][] = triProduit(copieCommande);
let parametreLambda1: string = "";
let parametreLambda2: string  = "";
let indexLambda: number = 0
const lambaComparaison = [
  (element: Produit) => {return element.nom === parametreLambda1 ? element : undefined},
  (element: Produit) => {return element.nom === parametreLambda1 && element.tailleProduit === parametreLambda2 ? element : undefined},
]

for(let i = 0; i < copieCommandeTrie.length; i++){
  if(copiePlateauTrie[i].length !== copieCommandeTrie[i].length) {
    return false
  } else {
    if(copieCommandeTrie[i].length > 0) {
      for(let j = 0; j < copieCommandeTrie[i].length; j++) {
        parametreLambda1 = copieCommandeTrie[i][j].nom;
        parametreLambda2 = copieCommandeTrie[i][j].tailleProduit;
        if(i > 0) {
          indexLambda = 1
        }
        const validProduit: Produit | undefined = copiePlateauTrie[i].find(lambaComparaison[indexLambda])
        if(i === 3) {
          const produitEval = copieCommandeTrie[i][j];
          if ("coulis" in produitEval) {
            const validGlace: Produit | undefined = copiePlateauTrie[i].find((element) => "coulis" in element && element.coulis === produitEval.coulis && element.topping === produitEval.topping)
            if(!validGlace) {
              return false
            }
          }
        }
        if(!validProduit) {
          return false
        } else {
          copieCommandeTrie[i] = copieCommandeTrie[i].filter((e) => e !== validProduit)
        }
      }
    }

  }
}
      setValiderPlateau(false);
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (aPreparerRef.current.length + 1 < tailleAPreparer) {
      const currentTimeOut: number = setTimeout(() => {
        const newCommande: ProduitEtMenu[] = randomCommande();
        setCommandeAPreparer([...aPreparerRef.current, newCommande]);
        const visuelCommande: (string | string[])[] =
          affichageCommande(newCommande);
        setAPreparerAffichage([
          ...aPreparerAffichageRef.current,
          visuelCommande,
        ]);
      }, 6000);
      setTimeAPreparer([...timeAPreparerRef.current, currentTimeOut]);
    }

    const placeVide: number = tailleAPreparer - aPreparerRef.current.length;

    if (placeVide <= tailleAPreparer) {
      const placeVideTab: string[] = [];
      for (let i = 0; i < placeVide; i++) {
        placeVideTab.push("vide");
      }
      setAPreparerVide(placeVideTab);
    }
  }, [commandeAPreparer]);

  useEffect(() => {
    const placeVide: number = tailleEnCour - enCourRef.current.length;
    if (placeVide <= tailleEnCour) {
      const placeVideTab: string[] = [];
      for (let i = 0; i < placeVide; i++) {
        placeVideTab.push("vide");
      }
      setEnCourVide(placeVideTab);
    }
  }, [commandeEnCour]);

  return (
    <div id="comptoirAssemblageComponent" className="component">
      <button className="buttonModal" onClick={handleClickActionModal}>
        comptoir ComptoirAssemblage
      </button>
      <div
        className={
          buttonActionModalComptoirA
            ? "modalOpen"
            : "modalClose"
        }
      >
        <div className="modalContent">
          <div id="headerModal">
        <h2>Comptoir</h2>
          <button onClick={handleClickActionModal} className="closeModalButton">
            {" "}
            <img alt="fermer" title="fermer" src={close}></img>
          </button>
          </div>
          <div>
            <h3>Commandes à prerarer</h3>
            {aPreparerAffichage.map(
              (tab: (string | string[])[], position: number) => (
                <button
                  key={position}
                  onClick={() => handleClickValiderPlateau(position)}
                >
                  {tab.map((commande: string | string[], index: number) => (
                    <ul key={index}>
                      {typeof commande === "string" ? (
                        <li>{commande}</li>
                      ) : (
                        <ul>
                          {commande.map((menu: string, i: number) => (
                            <li key={i}>{menu}</li>
                          ))}
                        </ul>
                      )}
                    </ul>
                  ))}
                </button>
              )
            )}
            {aPreparerVide.map((e: string, i: number) => (
              <button key={i} disabled={true}>
                {e}
              </button>
            ))}
          </div>
          <div>
            <h3>Commandes en cours</h3>
            {enCourAffichage.map(
              (tab: (string | string[])[], position: number) => (
                <div
                  key={position}
                  onClick={() => handleClickPlateau(position)}
                >
                  {tab.map((commande: string | string[], index: number) => (
                    <ul key={index}>
                      {typeof commande === "string" ? (
                        <li>
                          <button
                            onClick={() =>
                              handleClickSupprimerPlat(position, index)
                            }
                          >
                            {commande}
                          </button>
                        </li>
                      ) : (
                        <ul>
                          {commande.map((menu: string, i: number) => (
                            <li key={i}>
                              {menu !== "menu" && (
                                <button
                                  onClick={() =>
                                    handleClickSupprimerPlat(position, i)
                                  }
                                >
                                  {menu}
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </ul>
                  ))}
                  <button onClick={() => handleClickFinirPlateau(position)}>
                    fini
                  </button>
                </div>
              )
            )}
            {enCourVide.map((e: string, i: number) => (
              <button key={i} onClick={() => handleClickPlateau(-1)}>
                {e}
              </button>
            ))}
          </div>
          <div>
            <div className="tabComptoirA">
              {elementsCommandes.map((element) => (
                <button
                  key={element.nom}
                  className="tabLinksButton"
                  onClick={() => handleClickTab(element.nom)}
                >
                  {element.nom}
                </button>
              ))}
              <button
                className="tabLinksButton"
                onClick={() => handleClickTab("Sac")}
              >
                Sac
              </button>
            </div>
            <div>
              <div
                className={
                  elementsCommandes[0].nom != tabActionComptoirA
                    ? "tabContentHidden"
                    : "tabContenComptoirA"
                }
              >
                {burger.map((e, i) => (
                  <button key={i} onClick={() => handleClickRemplirPlateau(e)}>
                    {e.nom}
                  </button>
                ))}
              </div>
              <div
                className={
                  elementsCommandes[1].nom != tabActionComptoirA
                    ? "tabContentHidden"
                    : "tabContenComptoirA"
                }
              >
                {frites.map((e, i) => (
                  <button key={i} onClick={() => handleClickRemplirPlateau(e)}>
                    {e.tailleProduit} {e.nom}
                  </button>
                ))}
              </div>
              <div
                className={
                  elementsCommandes[2].nom != tabActionComptoirA
                    ? "tabContentHidden"
                    : "tabContenComptoirA"
                }
              >
                {boissonsTest.map((e, i) => (
                  <button key={i} onClick={() => handleClickRemplirPlateau(e)}>
                    {e.tailleProduit} {e.nom}
                  </button>
                ))}
              </div>
              <div
                className={
                  elementsCommandes[3].nom != tabActionComptoirA
                    ? "tabContentHidden"
                    : "tabContenComptoirA"
                }
              >
                {glace.map((e, i) => (
                  <button key={i} onClick={() => handleClickRemplirPlateau(e)}>
                    {e.nom} {e.topping} {e.coulis}
                  </button>
                ))}
              </div>
              <div
                className={
                  "Sac" != tabActionComptoirA
                    ? "tabContentHidden"
                    : "tabContenComptoirA"
                }
              >
                {/* {stocks.boiteBurger.map((e, i) => (
                  <button key={i} onClick={() => handleClickRemplirPlateau(e)}>
                    {e}
                  </button>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComptoirAssemblage;
