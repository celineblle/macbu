import React, { useEffect, useState, useContext } from "react";
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
  fraisProduitFormat,
} from "../../elements/burgers";
import "./ComptoirAssemblage.css";
import {
  FritesContext,
  NuggetsContext,
  BoiteNugget,
  NuggetsContextSetter,
  BurgersContext,
  BurgersContextSetter,
  FritesContextSetter,
  TailleEtPrixCommandeContext,
  CommandesAPreparerContextSetter,
  TailleEtPrixCommandeContextSetter,
} from "../../CommandeContext";
import {
  FondDeCaisseContext,
  FondDeCaisseContextSetter,
} from "../../CaisseContext";
import { triProduit, affichageCommande } from "./gestionCommandes";
import {
  StocksActuelsType,
  StocksActuelInteriorType,
} from "../../StocksActuels";
import { retirerStock } from "../../elements/function";
import { Slide, ToastContainer, toast } from "react-toastify";

function ComptoirAssemblage({
  glacesCommande,
  setGlacesCommande,
  glacesCommandeRef,
  fontainePret,
  setFontainePret,
  aPreparerAffichage,
  setAPreparerAffichage,
  aPreparerRef,
  setPosteGlaceFondue,
  posteGlaceFondueRef,
  stocksComptoir,
  setStocksComptoir,
}: {
  glacesCommande: GlaceType[];
  setGlacesCommande: React.Dispatch<React.SetStateAction<GlaceType[]>>;
  glacesCommandeRef: React.RefObject<GlaceType[]>;
  fontainePret: Boisson[];
  setFontainePret: React.Dispatch<React.SetStateAction<Boisson[]>>;
  aPreparerAffichage: (string | string[])[][];
  setAPreparerAffichage: React.Dispatch<
    React.SetStateAction<(string | string[])[][]>
  >;
  aPreparerRef: React.RefObject<ProduitEtMenu[][]>;
  setPosteGlaceFondue: React.Dispatch<React.SetStateAction<GlaceType[]>>;
  posteGlaceFondueRef: React.RefObject<GlaceType[]>;
  stocksComptoir: StocksActuelsType[];
  setStocksComptoir: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>;
}) {
  const fritesDispo = useContext(FritesContext);
  const setFritesDispo = useContext(FritesContextSetter);
  const nuggetsDispo = useContext(NuggetsContext);
  const setNuggetsStateContext = useContext(NuggetsContextSetter);
  const burgerDispo = useContext(BurgersContext);
  const setBurgerDispo = useContext(BurgersContextSetter);
  const tailleEtPrixCommande = useContext(TailleEtPrixCommandeContext);
  const setTailleEtPrixCommande = useContext(TailleEtPrixCommandeContextSetter);
  const fondDeCaisse = useContext(FondDeCaisseContext);
  const setFondDeCaisse = useContext(FondDeCaisseContextSetter);
  const setCommandeAPreparer = useContext(CommandesAPreparerContextSetter);

  const burger: Burger[] = [
    {
      nom: "Origin Burger",
      pain: stocks.pains[6],
      viande: stocks.viande[3],
      ingredient: [stocks.ingredientBurger[2], stocks.ingredientBurger[5]],
      sauce: [stocks.sauces[3], stocks.sauces[5]],
      tailleProduit: stocks.taille[2],
      type: "sandwich",
      sousType: "burger",
      prix: 6,
    },
    {
      nom: "Opti Bacon",
      pain: stocks.pains[1],
      viande: stocks.viande[4],
      fromage: [stocks.fromages[0]],
      ingredient: [
        stocks.ingredientBurger[4],
        stocks.ingredientBurger[5],
        stocks.ingredientBurger[2],
      ],
      sauce: [stocks.sauces[3], stocks.sauces[5]],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      prix: 0,
    },
    {
      nom: "Classic Big",
      pain: stocks.pains[1],
      viande: stocks.viande[4],
      fromage: [stocks.fromages[1]],
      ingredient: [
        stocks.ingredientBurger[1],
        stocks.ingredientBurger[0],
        stocks.ingredientBurger[2],
      ],
      sauce: [stocks.sauces[2]],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      prix: 12,
    },
    {
      nom: "Fish N Pan",
      pain: stocks.pains[7],
      viande: stocks.frituresCuisine[2],
      fromage: [stocks.fromages[0]],
      ingredient: [stocks.ingredientBurger[0], stocks.ingredientBurger[1]],
      sauce: [stocks.sauces[0]],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      prix: 8,
    },
    {
      nom: "Special Bu",
      pain: stocks.pains[1],
      viande: stocks.viande[2],
      fromage: [stocks.fromages[1]],
      ingredient: [
        stocks.ingredientBurger[2],
        stocks.ingredientBurger[0],
        stocks.ingredientBurger[3],
      ],
      sauce: [stocks.sauces[1]],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      prix: 8,
    },
    {
      nom: "Big Cheese Origin",
      pain: stocks.pains[1],
      viande: stocks.viande[2],
      fromage: [stocks.fromages[0]],
      ingredient: [stocks.ingredientBurger[5], stocks.ingredientBurger[2]],
      sauce: [stocks.sauces[3], stocks.sauces[1]],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      prix: 15,
    },
    {
      nom: "Italicain",
      pain: stocks.pains[1],
      viande: stocks.viande[4],
      fromage: [stocks.fromages[2], stocks.fromages[1]],
      ingredient: [stocks.ingredientBurger[1]],
      sauce: [stocks.sauces[0]],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      prix: 15,
    },
    {
      nom: "Bacon Basic",
      pain: stocks.pains[4],
      viande: stocks.frituresCuisine[4],
      fromage: [stocks.fromages[0]],
      ingredient: [
        stocks.ingredientBurger[0],
        stocks.ingredientBurger[2],
        stocks.ingredientBurger[6],
      ],
      sauce: [stocks.sauces[1]],
      tailleProduit: stocks.taille[0],
      type: "sandwich",
      sousType: "burger",
      prix: 12,
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
  const [sacEnCour, setSacEnCour] = useState<[string, number][][]>([]);
  const [sacAffichage, setSacAffichage] = useState<string[][]>([]);
  const [tabTaille, setTabTaille] = useState<number[]>([]);
  const [tabPrix, setTabPrix] = useState<number[]>([]);

  const finirPlateau = () => (
    <div>
      <p>Validez un plateau pour finir la commande</p>
    </div>
  );
  const displayFinirPlateau = () => {
    toast.error(finirPlateau);
  };

  const noPlateau = () => (
    <div>
      <p>On ne peut pas mettre de sac sur un plateau vide.</p>
      <p>Veuillez selectionner un autre plateau</p>
    </div>
  );
  const displayNoPlateau = () => {
    toast.error(noPlateau);
  };

  const validCommande = (prixCommande: number) => (
    <div>
      <p>Commande délivrée : {prixCommande}</p>
    </div>
  );
  const displayValidCommande = (prixCommande: number) => {
    toast.success(validCommande(prixCommande));
  };

  const noSac = () => (
    <div>
      <p>La commande ne peut pas etre validé sans sac</p>
    </div>
  );

  const displayNoSac = () => {
    toast.error(noSac);
  };

  function handleClickActionModal(): void {
    setButtonActionModalComptoirA(!buttonActionModalComptoirA);
  }

  function handleClickTab(nom: string): void {
    setTabActionComptoirA(nom);
  }

  function handleClickPlateau(position: number): void {
    if (position === -1) {
      setIdPlateauPrepa(commandeEnCour.length);
    } else {
      setIdPlateauPrepa(position);
    }
  }

  function handleClickRemplirPlateau(plat: Produit | BoiteNugget): void {
    const currentPlat = plat;
    let itsFraisPlat = false;
    let okRemplirPlateau = false;
    let stockFrigoFrais: StocksActuelInteriorType | undefined = undefined;

    if ("nom" in currentPlat && stocks.frais.includes(currentPlat.nom)) {
      itsFraisPlat = true;
      stockFrigoFrais = stocksComptoir[2].stockActuel.find(
        (e) => e.produit === currentPlat.nom
      );
      if (stockFrigoFrais !== undefined && stockFrigoFrais.quantite > 0) {
        okRemplirPlateau = true;
      }
    } else {
      okRemplirPlateau = true;
    }

    if (okRemplirPlateau === true) {
      if (plat.prix !== 0) {
        const allCommandeEnCourCopie: Produit[][] = commandeEnCour.slice();
        let commandeCopie: Produit[] = [];

        if (allCommandeEnCourCopie[idPlateauPrepa] !== undefined) {
          commandeCopie = allCommandeEnCourCopie[idPlateauPrepa];
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
                e.tailleProduit === plat.tailleProduit &&
                e.saveur === plat.saveur
            );
            boissonDispoCopie.splice(quelBoisson, 1);
            setFontainePret(boissonDispoCopie);
          } else if ("coulis" in plat) {
            const glaceDispoCopie: GlaceType[] =
              glacesCommandeRef.current.slice();
            const quelGlace: number = glacesCommandeRef.current.findIndex(
              (e) => e.coulis === plat.coulis && e.topping === plat.topping
            );
            glaceDispoCopie.splice(quelGlace, 1);
            if (glaceDispoCopie.length === 0) {
              glaceDispoCopie.push({
                nom: "Glace",
                base: "Glace au lait",
                topping: "",
                coulis: "Vide",
                tailleProduit: "initial",
                temps: 0,
                timeId: 0,
                type: "dessert",
                sousType: "glace",
                prix: 0,
              });
            }
            setGlacesCommande(glaceDispoCopie);
            clearTimeout(plat.timeId);
          }
        }
        allCommandeEnCourCopie.splice(idPlateauPrepa, 1, commandeCopie);
        setCommandeEnCour(allCommandeEnCourCopie);

        const commandeAffichageCopie: (string | string[])[] =
          affichageCommande(commandeCopie);
        const enCourTabAffichageCopie: (string | string[])[][] =
          enCourAffichage.slice();
        enCourTabAffichageCopie.splice(
          idPlateauPrepa,
          1,
          commandeAffichageCopie
        );
        setEnCourAffichage(enCourTabAffichageCopie);
      }
      if (itsFraisPlat === true && stockFrigoFrais !== undefined) {
        retirerStock(
          stocksComptoir,
          setStocksComptoir,
          "autre",
          stockFrigoFrais
        );
      }
    }
  }

  function handleClickSupprimerPlat(commande: number, plat: number): void {
    const allCommandeEnCourCopie: Produit[][] = commandeEnCour.slice();
    const commandeCopie: Produit[] = allCommandeEnCourCopie[commande];
    const currentPlat: Produit = commandeCopie[plat];
    commandeCopie.splice(plat, 1);

    console.log("ici", currentPlat);
    if (commandeCopie.length > 0) {
      allCommandeEnCourCopie.splice(commande, 1, commandeCopie);
    } else {
      allCommandeEnCourCopie.splice(commande, 1);
    }
    setCommandeEnCour(allCommandeEnCourCopie);

    const allCommandeAffichageCopie: (string | string[])[][] =
      enCourAffichage.slice();
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
              topping: "",
              coulis: "Vide",
              tailleProduit: "initial",
              temps: 0,
              timeId: 0,
              type: "dessert",
              sousType: "glace",
              prix: 0,
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
    if (stocks.frais.includes(currentPlat.nom)) {
      const stockComptoirCopie = stocksComptoir.slice();
      const stockPosteTabProduit = stockComptoirCopie[2].stockActuel.slice();
      const indexProduit = stockPosteTabProduit.findIndex(
        (e) => e.produit === currentPlat.nom
      );
      const stockFrigoFrais: StocksActuelInteriorType | undefined =
        stocksComptoir[2].stockActuel.find(
          (e) => e.produit === currentPlat.nom
        );
      if (stockFrigoFrais !== undefined) {
        stockFrigoFrais.quantite = stockFrigoFrais.quantite + 1;
        stockPosteTabProduit.splice(indexProduit, 1, stockFrigoFrais);
        stockComptoirCopie[2].stockActuel = stockPosteTabProduit;
        setStocksComptoir(stockComptoirCopie);
      }
    }
  }

  function handleClickFinirPlateau(plateau: number): void {
    if (sacAffichage[plateau][0] === "Aucun Sac") {
      displayNoSac();
    }

    setIdPlateauPrepa(plateau);
    setValiderPlateau(true);
  }

  function handleClickGetSac(produit: string) {
    const stockFrigoSac: StocksActuelInteriorType | undefined =
      stocksComptoir[3].stockActuel.find((e) => e.produit === produit);
    if (stockFrigoSac !== undefined && stockFrigoSac.quantite > 0) {
      if (enCourAffichage[idPlateauPrepa] !== undefined) {
        const allSacCommandeCopie: [string, number][][] = sacEnCour.slice();
        let uniqueCommandeSacCopie: [string, number][] = [];
        if (allSacCommandeCopie.length > 0) {
          uniqueCommandeSacCopie = allSacCommandeCopie[idPlateauPrepa].slice();
        }
        const formatSac: [string, number] | undefined = stocks.sac.find(
          (e) => e[0] === produit
        );
        if (formatSac !== undefined) {
          uniqueCommandeSacCopie.push(formatSac);
          allSacCommandeCopie.splice(idPlateauPrepa, 1, uniqueCommandeSacCopie);
          setSacEnCour(allSacCommandeCopie);

          const allAffichageSacCopie = sacAffichage.slice();
          const uniqueAffichageSacCopie =
            allAffichageSacCopie[idPlateauPrepa].slice();
          if (uniqueAffichageSacCopie[0] === "Aucun Sac") {
            uniqueAffichageSacCopie.splice(0, 1, formatSac[0]);
          } else {
            uniqueAffichageSacCopie.push(formatSac[0]);
          }

          allAffichageSacCopie.splice(
            idPlateauPrepa,
            1,
            uniqueAffichageSacCopie
          );
          setSacAffichage(allAffichageSacCopie);

          retirerStock(stocksComptoir, setStocksComptoir, "sac", stockFrigoSac);
        }
      } else {
        displayNoPlateau();
      }
    }
  }

  useEffect(() => {
    if (commandeEnCour.length > 0 && commandeEnCour.length > sacEnCour.length) {
      const allSacAffichageCopie = sacAffichage.slice();
      allSacAffichageCopie.push(["Aucun Sac"]);
      setSacAffichage(allSacAffichageCopie);
    }
  }, [commandeEnCour]);

  function handleClickSupprimerSac(position: number) {
    const allSacCopie = sacEnCour.slice();
    const uniqueSacCopie = allSacCopie[idPlateauPrepa].slice();
    const sacSupprimee = uniqueSacCopie[position];
    uniqueSacCopie.splice(position, 1);
    allSacCopie.splice(idPlateauPrepa, 1, uniqueSacCopie);
    setSacEnCour(allSacCopie);

    const allAffSacCopie = sacAffichage.slice();
    const uniqueAffSacCopie = allAffSacCopie[idPlateauPrepa].slice();
    uniqueAffSacCopie.splice(position, 1);
    allAffSacCopie.splice(idPlateauPrepa, 1, uniqueAffSacCopie);
    setSacAffichage(allAffSacCopie);

    const stockComptoirCopie = stocksComptoir.slice();
    const stockPosteTabProduit = stockComptoirCopie[3].stockActuel.slice();
    const indexProduit = stockPosteTabProduit.findIndex(
      (e) => e.produit === sacSupprimee[0]
    );
    const stockFrigoSac: StocksActuelInteriorType | undefined =
      stocksComptoir[3].stockActuel.find((e) => e.produit === sacSupprimee[0]);
    if (stockFrigoSac !== undefined) {
      stockFrigoSac.quantite = stockFrigoSac.quantite + 1;
      stockPosteTabProduit.splice(indexProduit, 1, stockFrigoSac);
      stockComptoirCopie[3].stockActuel = stockPosteTabProduit;
      setStocksComptoir(stockComptoirCopie);
    }
  }

  function handleClickValiderPlateau(commande: number): void {
    if (validerPlateau === true) {
      const copiePlateau: ProduitEtMenu[] =
        commandeEnCour[idPlateauPrepa].slice();
      const copieCommande: ProduitEtMenu[] =
        aPreparerRef.current[commande].slice();
      let malusPrix: number = 0;
      let finalPrix: number = 0;

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
        if (copieCommandeTrie[i].length > 0) {
          for (let j = 0; j < copieCommandeTrie[i].length; j++) {
            parametreLambda1 = copieCommandeTrie[i][j].nom;
            parametreLambda2 = copieCommandeTrie[i][j].tailleProduit;
            if (i > 0) {
              indexLambda = 1;
            }
            const validProduit: Produit | undefined = copiePlateauTrie[i].find(
              lambaComparaison[indexLambda]
            );
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
                  malusPrix = malusPrix + 2;
                } else {
                  finalPrix = finalPrix + produitEval.prix;
                }
              }
            }
            if (!validProduit) {
              malusPrix = malusPrix + 2;
            } else {
              copieCommandeTrie[i] = copieCommandeTrie[i].filter(
                (e) => e !== validProduit
              );
              finalPrix = finalPrix + validProduit.prix;
            }
          }
        }
      }

      const tailleCommandeAValider: number = tailleEtPrixCommande[commande][0];
      const taillePlateau: [string, number][] =
        sacEnCour[idPlateauPrepa].slice();
      let finalContenancePlateau: number = 0;

      if (taillePlateau !== undefined) {
        for (let i = 0; i < taillePlateau.length; i++) {
          finalContenancePlateau = finalContenancePlateau + taillePlateau[i][1];
        }
        if (finalContenancePlateau < tailleCommandeAValider) {
          malusPrix = malusPrix + 4;
        } else {
          setValiderPlateau(false);
        }
      } else {
        malusPrix = malusPrix + 4;
      }
      if (malusPrix > 0 && malusPrix < finalPrix) {
        finalPrix = finalPrix - malusPrix;
      } else if (malusPrix > finalPrix) {
        finalPrix = 0;
      }
      displayValidCommande(finalPrix);

      finalPrix = fondDeCaisse + finalPrix;
      if (setFondDeCaisse !== undefined) {
        setFondDeCaisse(finalPrix);
      }
      const copieAllCommandeAPreparer = aPreparerRef.current.slice();
      copieAllCommandeAPreparer.splice(commande, 1);
      if (setCommandeAPreparer !== undefined) {
        setCommandeAPreparer(copieAllCommandeAPreparer);
      }
      const copieCommandeAPreparerAffi = aPreparerAffichage.slice();
      copieCommandeAPreparerAffi.splice(commande, 1);
      setAPreparerAffichage(copieCommandeAPreparerAffi);

      const copieAllPlateau = commandeEnCour.slice();
      copieAllPlateau.splice(idPlateauPrepa, 1);
      setCommandeEnCour(copieAllPlateau);
      const copieEnCourAffichage = enCourAffichage.slice();
      copieEnCourAffichage.splice(idPlateauPrepa, 1);
      setEnCourAffichage(copieEnCourAffichage);

      const copieTaillePrix = tailleEtPrixCommande.slice();
      copieTaillePrix.splice(commande, 1);
      if (setTailleEtPrixCommande !== undefined) {
        setTailleEtPrixCommande(copieTaillePrix);
      }
      setIdPlateauPrepa(0);
      setValiderPlateau(false);
    } else {
      displayFinirPlateau();
    }
  }

  useEffect(() => {
    const placeVide: number = tailleEnCour - commandeEnCour.length;
    if (placeVide <= tailleEnCour) {
      const placeVideTab: string[] = [];
      for (let i = 0; i < placeVide; i++) {
        placeVideTab.push("Vide");
      }
      setEnCourVide(placeVideTab);
    }
  }, [commandeEnCour]);

  useEffect(() => {
    const allFinalTaille: number[] = [];
    const allFinalPrix: number[] = [];
    for (let i = 0; i < tailleEtPrixCommande.length; i++) {
      allFinalTaille.push(tailleEtPrixCommande[i][0]);
      allFinalPrix.push(tailleEtPrixCommande[i][1]);
    }
    setTabTaille(allFinalTaille);
    setTabPrix(allFinalPrix);
  }, [tailleEtPrixCommande]);

  console.log(stocksComptoir);

  return (
    <div id="comptoirAssemblageComponent" className="component">
      <div id="headerPage">
        <button className="buttonModal" onClick={handleClickActionModal}>
          Comptoir
        </button>
        <p>Commande en attente : {aPreparerAffichage.length}</p>
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Slide}
          />
          <div id="headerModal">
            <h2>Comptoir</h2>
            <h3>Budget : {fondDeCaisse} €</h3>
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
                  (tab: (string | string[])[], position: number) => (
                    <button
                      key={position}
                      onClick={() => handleClickValiderPlateau(position)}
                      className="commandeModal commandeUnique commandeApreparer"
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
                      {tailleEtPrixCommande.length > 0 && (
                        <div>
                          <p>Taille : {tabTaille[position]}</p>
                          <br />
                          <p>Prix : {tabPrix[position]}€</p>
                        </div>
                      )}
                    </button>
                  )
                )}
                {aPreparerAffichage.length === 0 && (
                  <button
                    disabled={true}
                    className="buttonNeutre commandeUnique commandeApreparer"
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
                  onClick={() => handleClickTab("Produit frais")}
                >
                  Produit frais
                </button>
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
                    <button className="buttonNeutre">Vide</button>
                  ) : (
                    fritesDispo.map((e, i) => (
                      <button
                        key={i}
                        disabled={e.tailleProduit === "Vide" ? true : false}
                        onClick={() => handleClickRemplirPlateau(e)}
                        className="buttonNeutre"
                      >
                        {e.tailleProduit === "Vide"
                          ? "Aucune frite prête"
                          : `${e.tailleProduit} ${e.nom}`}
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
                  {fontainePret.length === 0 ? (
                    <button disabled={true} className="buttonNeutre">
                      Aucune boisson prête
                    </button>
                  ) : (
                    fontainePret.map((e, i) => (
                      <button
                        key={i}
                        onClick={() => handleClickRemplirPlateau(e)}
                        className="buttonNeutre"
                      >
                        {e.tailleProduit} {e.saveur}
                      </button>
                    ))
                  )}
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
                    "Produit frais" != tabActionComptoirA
                      ? "tabContentHidden"
                      : "tabContenComptoirA"
                  }
                >
                  {stocksComptoir.length > 0 ? (
                    fraisProduitFormat.map((e, i) => (
                      <button
                        key={i}
                        onClick={() => handleClickRemplirPlateau(e)}
                        className={
                          stocksComptoir[2].stockActuel[i].quantite > 0
                            ? "buttonNeutre"
                            : "buttonStockVide"
                        }
                        disabled={
                          stocksComptoir[2].stockActuel[i].quantite > 0
                            ? false
                            : true
                        }
                      >
                        {e.nom}
                      </button>
                    ))
                  ) : (
                    <button className="buttonNeutre">Aucuns stocks</button>
                  )}
                </div>
                <div
                  className={
                    "Sac" != tabActionComptoirA
                      ? "tabContentHidden"
                      : "tabContenComptoirA"
                  }
                >
                  {stocksComptoir.length > 0 &&
                    stocksComptoir[3].stockActuel.map((element, i: number) => (
                      <button
                        key={i}
                        disabled={element.quantite > 0 ? false : true}
                        onClick={() => handleClickGetSac(element.produit)}
                        className={
                          element.quantite > 0
                            ? "buttonNeutre"
                            : "buttonStockVide"
                        }
                      >
                        {element.produit} capacité {stocks.sac[i][1]}
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
