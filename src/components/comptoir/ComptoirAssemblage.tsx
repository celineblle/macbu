import React, { useEffect, useRef, useState, useContext } from "react";
import close from "../../assets/close.svg";
import * as stocks from "../../elements/stocks";
import {
  ProduitEtMenu,
  Produit,
  glaces,
  nuggets,
  Boisson,
  GlaceType,
  Burger,
  Accompagnement,
} from "../../elements/burgers";
import "./ComptoirAssemblage.css";
import {
  FritesContext,
  NuggetsContext,
  CommandesAPreparerContext,
  BoiteNugget,
  NuggetsContextSetter,
  BurgersContext,
  BurgersContextSetter,
  FritesContextSetter,
} from "../../CommandeContext";
import { triProduit, affichageCommande } from "./gestionCommandes";

function ComptoirAssemblage({
  glacesCommande,
  setGlacesCommande,
  glacesCommandeRef,
  fontainePret,
  setFontainePret,
  aPreparerAffichage,
  aPreparerRef,
  setPosteGlaceFondue,
  posteGlaceFondueRef,
}: {
  glacesCommande: GlaceType[];
  setGlacesCommande: React.Dispatch<React.SetStateAction<GlaceType[]>>;
  glacesCommandeRef: React.RefObject<GlaceType[]>;
  fontainePret: Boisson[];
  setFontainePret: React.Dispatch<React.SetStateAction<Boisson[]>>;
  aPreparerAffichage: (string | string[])[][];
  aPreparerRef: React.RefObject<ProduitEtMenu[][]>;
  setPosteGlaceFondue: React.Dispatch<React.SetStateAction<GlaceType[]>>;
  posteGlaceFondueRef: React.RefObject<GlaceType[]>;
}) {
  const commandeAPreparer = useContext(CommandesAPreparerContext);
  const fritesDispo = useContext(FritesContext);
  const setFritesDispo = useContext(FritesContextSetter);
  const nuggetsDispo = useContext(NuggetsContext);
  const setNuggetsStateContext = useContext(NuggetsContextSetter);
  const burgerDispo = useContext(BurgersContext);
  const setBurgerDispo = useContext(BurgersContextSetter);
  const burger = [
    {
      nom: "Origin Burger",
      pain: stocks.pains[6],
      viande: stocks.viande[3],
      ingredient: [stocks.ingredientBurger[2], stocks.ingredientBurger[5]],
      sauce: [stocks.sauces[5], stocks.sauces[7]],
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
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      conforme: false,
    },
  ];

  const elementsCommandes = [
    {
      nom: "Burgers",
      produit: burger,
    },
    {
      nom: "Frites",
      produit: fritesDispo,
    },
    {
      nom: "Nuggets",
      produit: nuggetsDispo,
    },
    {
      nom: "Boisson",
      produit: fontainePret,
    },
    {
      nom: "Glaces",
      produit: glaces,
    },
  ];

  // console.log("bu", burgersDispo);
  // console.log("nu", nuggetsDispo);
  // console.log("fr", fritesDispo);

  const tailleEnCour: number = 4;

  const [buttonActionModalComptoirA, setButtonActionModalComptoirA] =
    useState<boolean>(false);
  const [tabActionComptoirA, setTabActionComptoirA] = useState<string>(
    elementsCommandes[0].nom
  );

  const [commandeEnCour, setCommandeEnCour] = useState<Produit[][]>([]);
  const [idPlateauPrepa, setIdPlateauPrepa] = useState<number>(0);
  const [enCourAffichage, setEnCourAffichage] = useState<
    (string | string[])[][]
  >([]);
  const [enCourVide, setEnCourVide] = useState<string[]>([]);
  const [validerPlateau, setValiderPlateau] = useState<boolean>(false);
  const [tailleCommande, setTailleCommande] = useState<number[]>([]);
  const [sacEnCour, setSacEnCour] = useState<[string, number][][]>([]);
  const [sacAffichage, setSacAffichage] = useState<string[][]>([]);

  const enCourRef = useRef<Produit[][]>([]);
  const enCourAffichageRef = useRef<(string | string[])[][]>([]);
  const idPlateauRef = useRef<number>(0);
  const sacRef = useRef<[string, number][][]>([]);
  const sacAffichageRef = useRef<string[][]>([]);

  useEffect(() => {
    enCourRef.current = commandeEnCour;
  }, [commandeEnCour]);

  useEffect(() => {
    enCourAffichageRef.current = enCourAffichage;
  }, [enCourAffichage]);

  useEffect(() => {
    idPlateauRef.current = idPlateauPrepa;
  }, [idPlateauPrepa]);

  useEffect(() => {
    sacRef.current = sacEnCour;
  }, [sacEnCour]);

  useEffect(() => {
    sacAffichageRef.current = sacAffichage;
  }, [sacAffichage]);

  function handleClickActionModal(): void {
    setButtonActionModalComptoirA(!buttonActionModalComptoirA);
  }

  function handleClickTab(nom: string): void {
    setTabActionComptoirA(nom);
  }

  function handleClickPlateau(position: number): void {
    if (position === -1) {
      setIdPlateauPrepa(enCourRef.current.length);
    } else {
      setIdPlateauPrepa(position);
    }
  }

  function handleClickRemplirPlateau(plat: Produit | BoiteNugget): void {
    const allCommandeEnCourCopie: Produit[][] = enCourRef.current.slice();
    let commandeCopie: Produit[] = [];

    if (allCommandeEnCourCopie[idPlateauRef.current] !== undefined) {
      commandeCopie = allCommandeEnCourCopie[idPlateauRef.current];
    }
    if ("friture" in plat) {
      const nuggetProduit: Produit | undefined = nuggets.find(
        (e) => e.nom === plat.friture
      );
      if (nuggetProduit !== undefined) {
        if (plat.quantitePret > 0) {
          commandeCopie.push(nuggetProduit);
        }
      }

      const nuggetTabCopie: BoiteNugget[] = nuggetsDispo.slice();
      const quelNugget: number = nuggetTabCopie.findIndex(
        (e) => e.friture === plat.friture
      );
      nuggetTabCopie[quelNugget].quantitePret =
        nuggetTabCopie[quelNugget].quantitePret - 1;
      if (setNuggetsStateContext !== undefined) {
        setNuggetsStateContext(nuggetTabCopie);
      }
    } else {
      commandeCopie.push(plat);
      if ("pain" in plat) {
        const burgerDispoCopie: Burger[] = burgerDispo.slice();
        const quelBurger: number = burgerDispo.findIndex(
          (e) => e.nom === plat.nom
        );
        burgerDispoCopie.splice(quelBurger, 1);
        if (setBurgerDispo !== undefined) {
          setBurgerDispo(burgerDispoCopie);
        }
      } else if ("complement" in plat && plat.sousType === "frite") {
        const friteDispoCopie: Accompagnement[] = fritesDispo.slice();
        const quelFrite: number = friteDispoCopie.findIndex(
          (e) =>
            e.tailleProduit === plat.tailleProduit &&
            e.complement === plat.complement
        );
        friteDispoCopie.splice(quelFrite, 1);
        if (setFritesDispo !== undefined) {
          setFritesDispo(friteDispoCopie);
        }
      } else if ("saveur" in plat) {
        const boissonDispoCopie: Boisson[] = fontainePret.slice();
        const quelBoisson: number = boissonDispoCopie.findIndex(
          (e) =>
            e.tailleProduit === plat.tailleProduit && e.saveur === plat.saveur
        );
        boissonDispoCopie.splice(quelBoisson, 1);
        setFontainePret(boissonDispoCopie);
      } else if ("coulis" in plat) {
        const glaceDispoCopie: GlaceType[] = glacesCommandeRef.current.slice();
        const quelGlace: number = glacesCommandeRef.current.findIndex(
          (e) => e.coulis === plat.coulis && e.topping === plat.topping
        );
        glaceDispoCopie.splice(quelGlace, 1);
        if (glaceDispoCopie.length === 0) {
          glaceDispoCopie.push({
            nom: "Glace",
            base: "Glace au lait",
            topping: "glace prete",
            coulis: "Aucune ",
            tailleProduit: "initial",
            temps: 0,
            timeId: 0,
            type: "dessert",
            sousType: "glace",
          });
        }
        setGlacesCommande(glaceDispoCopie);
        clearTimeout(plat.timeId);
      }
    }
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
    const allCommandeEnCourCopie: Produit[][] = enCourRef.current.slice();
    const commandeCopie: Produit[] = allCommandeEnCourCopie[commande];
    const currentPlat: Produit = commandeCopie[plat];
    commandeCopie.splice(plat, 1);

    if (commandeCopie.length > 0) {
      allCommandeEnCourCopie.splice(commande, 1, commandeCopie);
    } else {
      allCommandeEnCourCopie.splice(commande, 1);
    }
    setCommandeEnCour(allCommandeEnCourCopie);

    const allCommandeAffichageCopie: (string | string[])[][] =
      enCourAffichageRef.current;
    const commandeAffichageCopie: (string | string[])[] =
      allCommandeAffichageCopie[commande];
    commandeAffichageCopie.splice(plat, 1);
    if (commandeAffichageCopie.length > 0) {
      allCommandeAffichageCopie.splice(commande, 1, commandeAffichageCopie);
    } else {
      allCommandeAffichageCopie.splice(commande, 1);
    }

    setEnCourAffichage(allCommandeAffichageCopie);

    if ("pain" in currentPlat) {
      const copieBurgerPret: Produit[] = burgerDispo.slice();
      copieBurgerPret.push(currentPlat);
      // A METTRE EN PLACE EN MEME TEMPS QUE LES BURGERS
      // setBurgerDispo(copieBurgerPret)
    } else if ("complement" in currentPlat) {
      const copieFritePret: Accompagnement[] = fritesDispo.slice();
      copieFritePret.push(currentPlat);
      if (setFritesDispo !== undefined) {
        setFritesDispo(copieFritePret);
      }
    } else if ("nombreNugget" in currentPlat) {
      console.log("ici");
      const copieNugget: BoiteNugget[] = nuggetsDispo.slice();
      const quelNugget: number = copieNugget.findIndex(
        (e) => e.friture === currentPlat.nom
      );
      copieNugget[quelNugget].quantitePret =
        copieNugget[quelNugget].quantitePret + 1;
      if (setNuggetsStateContext !== undefined) {
        setNuggetsStateContext(copieNugget);
      }
    } else if ("saveur" in currentPlat) {
      const copieBoissonPret: Boisson[] = fontainePret.slice();
      copieBoissonPret.push(currentPlat);
      setFontainePret(copieBoissonPret);
    } else if ("coulis" in currentPlat) {
      if (currentPlat.temps > Date.now()) {
        let copieGlaceCommande: GlaceType[] = glacesCommandeRef.current.slice();
        const standByTimeOutGlace = setTimeout(() => {
          copieGlaceCommande = copieGlaceCommande.filter(
            (e) => e.temps !== currentPlat.temps
          );
          if (copieGlaceCommande.length === 0) {
            copieGlaceCommande.push({
              nom: "Glace",
              base: "Glace au lait",
              topping: "glace prete",
              coulis: "Aucune ",
              tailleProduit: "initial",
              temps: 0,
              timeId: 0,
              type: "dessert",
              sousType: "glace",
            });
          }
          setGlacesCommande(copieGlaceCommande);
          const copieGlaceFondue: GlaceType[] =
            posteGlaceFondueRef.current.slice();
          currentPlat.coulis = "Glace ";
          currentPlat.topping = "fondue";
          copieGlaceFondue.push(currentPlat);
          setPosteGlaceFondue(copieGlaceFondue);
        }, currentPlat.temps - Date.now());
        currentPlat.timeId = standByTimeOutGlace;
        copieGlaceCommande.push(currentPlat);
        setGlacesCommande(copieGlaceCommande);
      }
    }
  }

  function handleClickFinirPlateau(plateau: number): void {
    setIdPlateauPrepa(plateau);
    setValiderPlateau(true);
  }

  function handleClickGetSac(sac: [string, number]) {
    const allSacCommandeCopie: [string, number][][] = sacRef.current.slice();
    let uniqueCommandeSacCopie: [string, number][] = [];
    if (allSacCommandeCopie.length > 0) {
      uniqueCommandeSacCopie =
        allSacCommandeCopie[idPlateauRef.current].slice();
    }

    uniqueCommandeSacCopie.push(sac);
    allSacCommandeCopie.splice(idPlateauRef.current, 1, uniqueCommandeSacCopie);
    setSacEnCour(allSacCommandeCopie);

    const allAffichageSacCopie = sacAffichageRef.current.slice();
    const uniqueAffichageSacCopie =
      allAffichageSacCopie[idPlateauRef.current].slice();
    if (uniqueAffichageSacCopie[0] === "Aucun Sac") {
      uniqueAffichageSacCopie.splice(0, 1, sac[0]);
    } else {
      uniqueAffichageSacCopie.push(sac[0]);
    }

    allAffichageSacCopie.splice(
      idPlateauRef.current,
      1,
      uniqueAffichageSacCopie
    );
    setSacAffichage(allAffichageSacCopie);
  }

  useEffect(() => {
    if (
      enCourRef.current.length > 0 &&
      enCourRef.current.length > sacRef.current.length
    ) {
      const allSacAffichageCopie = sacAffichageRef.current.slice();
      allSacAffichageCopie.push(["Aucun Sac"]);
      setSacAffichage(allSacAffichageCopie);
    }
  }, [commandeEnCour]);

  function handleClickSupprimerSac(position: number) {
    const allSacCopie = sacRef.current.slice();
    const uniqueSacCopie = allSacCopie[idPlateauRef.current].slice();
    uniqueSacCopie.splice(position, 1);
    allSacCopie.splice(idPlateauRef.current, 1, uniqueSacCopie);
    setSacEnCour(allSacCopie);

    const allAffSacCopie = sacAffichageRef.current.slice();
    const uniqueAffSacCopie = allAffSacCopie[idPlateauRef.current].slice();
    uniqueAffSacCopie.splice(position, 1);
    allAffSacCopie.splice(idPlateauRef.current, 1, uniqueAffSacCopie);
    setSacAffichage(allAffSacCopie);
  }

  function handleClickValiderPlateau(commande: number): boolean {
    if (validerPlateau === true) {
      const copiePlateau: ProduitEtMenu[] =
        enCourRef.current[idPlateauPrepa].slice();
      const copieCommande: ProduitEtMenu[] =
        aPreparerRef.current[commande].slice();

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
      let parametreLambda2: string = "";
      let indexLambda: number = 0;
      const lambaComparaison = [
        (element: Produit) => {
          return element.nom === parametreLambda1 ? element : undefined;
        },
        (element: Produit) => {
          return element.nom === parametreLambda1 &&
            element.tailleProduit === parametreLambda2
            ? element
            : undefined;
        },
      ];

      for (let i = 0; i < copieCommandeTrie.length; i++) {
        if (copiePlateauTrie[i].length !== copieCommandeTrie[i].length) {
          return false;
        } else {
          if (copieCommandeTrie[i].length > 0) {
            for (let j = 0; j < copieCommandeTrie[i].length; j++) {
              parametreLambda1 = copieCommandeTrie[i][j].nom;
              parametreLambda2 = copieCommandeTrie[i][j].tailleProduit;
              if (i > 0) {
                indexLambda = 1;
              }
              const validProduit: Produit | undefined = copiePlateauTrie[
                i
              ].find(lambaComparaison[indexLambda]);
              if (i === 3) {
                const produitEval = copieCommandeTrie[i][j];
                if ("coulis" in produitEval) {
                  const validGlace: Produit | undefined = copiePlateauTrie[
                    i
                  ].find(
                    (element) =>
                      "coulis" in element &&
                      element.coulis === produitEval.coulis &&
                      element.topping === produitEval.topping
                  );
                  if (!validGlace) {
                    return false;
                  }
                }
              }
              if (!validProduit) {
                return false;
              } else {
                copieCommandeTrie[i] = copieCommandeTrie[i].filter(
                  (e) => e !== validProduit
                );
              }
            }
          }
        }
      }

      const tailleCommandeAValider: number = tailleCommande[commande];
      const taillePlateau: [string, number][] =
        sacRef.current[idPlateauPrepa].slice();
      let finalContenancePlateau: number = 0;

      if (taillePlateau !== undefined) {
        for (let i = 0; i < taillePlateau.length; i++) {
          finalContenancePlateau = finalContenancePlateau + taillePlateau[i][1];
        }
        if (finalContenancePlateau < tailleCommandeAValider) {
          return false;
        } else {
          setValiderPlateau(false);
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

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

  useEffect(() => {
    if (commandeAPreparer.length > 0) {
      const allFinalTailleCommande: number[] = [];
      for (let i = 0; i < commandeAPreparer.length; i++) {
        let finalTailleCommande: number = 0;
        for (let j = 0; j < commandeAPreparer[i].length; j++) {
          const currentProduit = commandeAPreparer[i][j];
          if ("boisson" in currentProduit) {
            finalTailleCommande = finalTailleCommande + currentProduit.taille;
          } else if ("tailleProduit" in currentProduit) {
            switch (currentProduit.tailleProduit) {
              case stocks.taille[0]:
                finalTailleCommande = finalTailleCommande + 3;
                break;
              case stocks.taille[1]:
                finalTailleCommande = finalTailleCommande + 2;
                break;
              case stocks.taille[2]:
                finalTailleCommande = finalTailleCommande + 1;
                break;
            }
          }
        }
        allFinalTailleCommande.push(finalTailleCommande);
      }
      setTailleCommande(allFinalTailleCommande);
    }
  }, [commandeAPreparer]);

  return (
    <div id="comptoirAssemblageComponent" className="component">
      <div id="headerPage">
        <button className="buttonModal" onClick={handleClickActionModal}>
          comptoir ComptoirAssemblage
        </button>
        <p id="compteurCommande">
          Commande en attente : {aPreparerAffichage.length}
        </p>
      </div>
      <div>
        <h3>Commandes en cours</h3>
        <div className="commandesComptoir">
          {enCourAffichage.map(
            (tab: (string | string[])[], position: number) => (
              <div
                key={position}
                onClick={() => handleClickPlateau(position)}
                className="commandeCuisson commandeUnique commandeEnCour visuelPage"
              >
                {tab.map((commande: string | string[], index: number) => (
                  <ul key={index} className="commandeContruction">
                    {typeof commande === "string" ? (
                      <li>{commande}</li>
                    ) : (
                      <ul className="commandeContruction">
                        {commande.map((menu: string, i: number) => (
                          <li key={i}>{menu !== "menu" && menu}</li>
                        ))}
                      </ul>
                    )}
                  </ul>
                ))}
              </div>
            )
          )}
          {enCourVide.map((e: string, i: number) => (
            <div
              key={i}
              onClick={() => handleClickPlateau(-1)}
              className="commandeVide commandeUnique visuelPage"
            >
              <p id="contenuVide">{e}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={buttonActionModalComptoirA ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div id="headerModal">
            <h2>Comptoir</h2>
            <button
              onClick={handleClickActionModal}
              className="closeModalButton"
            >
              {" "}
              <img alt="fermer" title="fermer" src={close}></img>
            </button>
          </div>
          <div id="comptoirModal">
            <div>
              <h3>Commandes à prerarer</h3>
              <div className="commandesComptoir">
                {aPreparerAffichage.map(
                  (tab: (string | string[])[], position: number) =>
                    position < 4 && (
                      <button
                        key={position}
                        onClick={() => handleClickValiderPlateau(position)}
                        className="commandeModal commandeUnique"
                      >
                        {tab.map(
                          (commande: string | string[], index: number) => (
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
                          )
                        )}
                        <p>Taille commande : {tailleCommande[position]}</p>
                      </button>
                    )
                )}
                {aPreparerAffichage.length === 0 && (
                  <button
                    disabled={true}
                    className="buttonNeutre commandeUnique"
                  >
                    Pas de commande
                  </button>
                )}
              </div>
            </div>
            <div>
              <h3>Commandes en cours</h3>
              <div className="commandesComptoir">
                {enCourAffichage.map(
                  (tab: (string | string[])[], position: number) => (
                    <ul
                      key={position}
                      onClick={() => handleClickPlateau(position)}
                      className="commandeCuisson commandeUnique commandeEnCour"
                    >
                      {tab.map((commande: string | string[], index: number) =>
                        typeof commande === "string" ? (
                          <li key={index}>
                            <button
                              onClick={() =>
                                handleClickSupprimerPlat(position, index)
                              }
                              className="buttonNeutre buttonCommandeEnCour"
                            >
                              {commande}
                            </button>
                          </li>
                        ) : (
                          commande.map((menu: string, i: number) => (
                            <li key={i}>
                              {menu !== "menu" && (
                                <button
                                  onClick={() =>
                                    handleClickSupprimerPlat(position, i)
                                  }
                                  className="buttonNeutre buttonCommandeEnCour"
                                >
                                  {menu}
                                </button>
                              )}
                            </li>
                          ))
                        )
                      )}
                      {sacAffichage.length > 0 &&
                        sacAffichage[position] !== undefined &&
                        sacAffichage[position].map((sac, i) => (
                          <li key={i}>
                            <button
                              className="buttonNeutre buttonCommandeEnCour"
                              onClick={() => handleClickSupprimerSac(i)}
                            >
                              {sac}
                            </button>
                          </li>
                        ))}

                      <button
                        onClick={() => handleClickFinirPlateau(position)}
                        className="buttonNeutre"
                        id="buttonFinir"
                      >
                        Valider le plateau et <br />
                        selectionner commande
                      </button>
                    </ul>
                  )
                )}
                {enCourVide.map((e: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleClickPlateau(-1)}
                    className="commandeVide commandeUnique"
                  >
                    <p id="contenuVide">{e}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3>Frigo</h3>
              <div className="tabComptoirA">
                {elementsCommandes.map((element) => (
                  <button
                    key={element.nom}
                    className="onglet"
                    onClick={() => handleClickTab(element.nom)}
                  >
                    {element.nom}
                  </button>
                ))}
                <button
                  className="onglet"
                  onClick={() => handleClickTab("Sac")}
                >
                  Sac
                </button>
              </div>
              <div id="buttonProduitDispo">
                <div
                  className={
                    elementsCommandes[0].nom != tabActionComptoirA
                      ? "tabContentHidden"
                      : "tabContenComptoirA"
                  }
                >
                  {burger.map((e, i) => (
                    <button
                      key={i}
                      onClick={() => handleClickRemplirPlateau(e)}
                      className="buttonNeutre"
                    >
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
                  {fritesDispo.length < 1 ? (
                    <button>Vide</button>
                  ) : (
                    fritesDispo.map((e, i) => (
                      <button
                        key={i}
                        onClick={() => handleClickRemplirPlateau(e)}
                        className="buttonNeutre"
                      >
                        {e.tailleProduit} {e.nom}
                      </button>
                    ))
                  )}
                </div>
                <div
                  className={
                    elementsCommandes[2].nom != tabActionComptoirA
                      ? "tabContentHidden"
                      : "tabContenComptoirA"
                  }
                >
                  <button
                    onClick={() => handleClickRemplirPlateau(nuggetsDispo[0])}
                    disabled={nuggetsDispo[0].quantitePret === 0 ? true : false}
                    className={
                      nuggetsDispo[0].quantitePret === 0
                        ? "buttonNeutre buttonNuggetVide"
                        : "buttonNeutre"
                    }
                  >
                    {nuggetsDispo[0].friture} <br />
                    disponible : {nuggetsDispo[0].quantitePret}
                  </button>
                  <button
                    onClick={() => handleClickRemplirPlateau(nuggetsDispo[1])}
                    disabled={nuggetsDispo[1].quantitePret === 0 ? true : false}
                    className={
                      nuggetsDispo[1].quantitePret === 0
                        ? "buttonNeutre buttonNuggetVide"
                        : "buttonNeutre"
                    }
                  >
                    {nuggetsDispo[1].friture} <br />
                    disponible : {nuggetsDispo[1].quantitePret}
                  </button>
                  <button
                    onClick={() => handleClickRemplirPlateau(nuggetsDispo[2])}
                    disabled={nuggetsDispo[2].quantitePret === 0 ? true : false}
                    className={
                      nuggetsDispo[2].quantitePret === 0
                        ? "buttonNeutre buttonNuggetVide"
                        : "buttonNeutre"
                    }
                  >
                    {nuggetsDispo[2].friture} <br />
                    disponible : {nuggetsDispo[2].quantitePret}
                  </button>
                </div>
                <div
                  className={
                    elementsCommandes[3].nom != tabActionComptoirA
                      ? "tabContentHidden"
                      : "tabContenComptoirA"
                  }
                >
                  {fontainePret.map((e, i) => (
                    <button
                      key={i}
                      onClick={() => handleClickRemplirPlateau(e)}
                      className="buttonNeutre"
                    >
                      {e.tailleProduit} {e.saveur}
                    </button>
                  ))}
                </div>
                <div
                  className={
                    elementsCommandes[4].nom != tabActionComptoirA
                      ? "tabContentHidden"
                      : "tabContenComptoirA"
                  }
                >
                  {glacesCommande.map((e, i) => (
                    <button
                      key={i}
                      onClick={() => handleClickRemplirPlateau(e)}
                      className="buttonNeutre"
                    >
                      {e.coulis} {e.topping}
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
                  {stocks.sac.map((e: [string, number], i: number) => (
                    <button
                      key={i}
                      onClick={() => handleClickGetSac(e)}
                      className="buttonNeutre"
                    >
                      {e[0]} capacité {e[1]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComptoirAssemblage;
