import React, { useEffect, useRef, useState, useContext } from "react";
import close from "../../assets/close.svg";
import * as stocks from "../../elements/stocks";
import { ProduitEtMenu, Produit, glaces } from "../../elements/burgers";
import "./ComptoirAssemblage.css";
import {
  FritesContext,
  NuggetsContext,
  BurgersContext,
  CommandesAPreparerContextSetter,
  CommandesAPreparerContext,
} from "../../CommandeContext";
import { triProduit, affichageCommande } from "./gestionCommandes";

function ComptoirAssemblage({
  glacesCommande,
  fontainePret,
  aPreparerAffichage,
  aPreparerRef,
}: {
  glacesCommande: string[];
  fontainePret: string[];
  aPreparerAffichage: (string | string[])[][];
  aPreparerRef: React.RefObject<ProduitEtMenu[][]>;
}) {
  const setCommandeAPreparer = useContext(CommandesAPreparerContextSetter);
  const commandeAPreparer = useContext(CommandesAPreparerContext);

  const fritesDispo = useContext(FritesContext);
  const nuggetsDispo = useContext(NuggetsContext);
  const burgersDispo = useContext(BurgersContext);
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

  const frites = [
    {
      nom: stocks.frite[1],
      complement: stocks.frite[1],
      tailleProduit: stocks.taille[0],
      type: "accompagnement",
      sousType: "frite",
    },
    {
      nom: stocks.frite[1],
      complement: stocks.frite[1],
      tailleProduit: stocks.taille[1],
      type: "accompagnement",
      sousType: "frite",
    },
    {
      nom: stocks.frite[0],
      complement: stocks.frite[0],
      tailleProduit: stocks.taille[2],
      type: "accompagnement",
      sousType: "frite",
    },
    {
      nom: stocks.frite[0],
      complement: stocks.frite[0],
      tailleProduit: stocks.taille[0],
      type: "accompagnement",
      sousType: "frite",
    },
  ];

  const boissonsTest = [
    {
      nom: stocks.boisson[5],
      saveur: stocks.boisson[5],
      tailleProduit: stocks.taille[2],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[6],
      saveur: stocks.boisson[6],
      tailleProduit: stocks.taille[2],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[4],
      saveur: stocks.boisson[4],
      tailleProduit: stocks.taille[1],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[2],
      saveur: stocks.boisson[2],
      tailleProduit: stocks.taille[1],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[0],
      saveur: stocks.boisson[0],
      tailleProduit: stocks.taille[0],
      type: "boisson",
      sousType: "cannette",
    },
    {
      nom: stocks.boisson[3],
      saveur: stocks.boisson[3],
      tailleProduit: stocks.taille[0],
      type: "boisson",
      sousType: "cannette",
    },
  ];

  const elementsCommandes = [
    {
      nom: "Burgers",
      produit: burger,
    },
    {
      nom: "Frites",
      produit: frites,
    },
    {
      nom: "Nuggets",
      produit: nuggetsDispo,
    },
    {
      nom: "Boisson",
      produit: boissonsTest,
    },
    {
      nom: "Glaces",
      produit: glaces,
    },
  ];

  // console.log(burgersDispo);
  console.log(nuggetsDispo);

  const tailleEnCour: number = 4;

  const [buttonActionModalComptoirA, setButtonActionModalComptoirA] =
    useState<boolean>(false);
  const [tabActionComptoirA, setTabActionComptoirA] = useState<string>(
    elementsCommandes[0].nom
  );

  const [commandeEnCour, setCommandeEnCour] = useState<ProduitEtMenu[][]>([]);
  const [idPlateauPrepa, setIdPlateauPrepa] = useState<number>(0);
  const [enCourAffichage, setEnCourAffichage] = useState<
    (string | string[])[][]
  >([]);
  const [enCourVide, setEnCourVide] = useState<string[]>([]);
  const [validerPlateau, setValiderPlateau] = useState<boolean>(false);
  const [tailleCommande, setTailleCommande] = useState<number[]>([]);
  const [capaciteSac, setCapaciteSac] = useState<
    [[string, number][], number][]
  >([]);

  const enCourRef = useRef<ProduitEtMenu[][]>([]);
  const enCourAffichageRef = useRef<(string | string[])[][]>([]);
  const idPlateauRef = useRef<number>(0);
  const capaciteSacRef = useRef<[[string, number][], number][]>([]);

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
    capaciteSacRef.current = capaciteSac;
  }, [capaciteSac]);

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

  useEffect(() => {
    if (enCourRef.current.length > capaciteSacRef.current.length) {
      const currentCapaciteSac: [[string, number][], number][] =
        capaciteSacRef.current.slice();
      const newSac: [[string, number][], number] = [[["Aucun sac", 0]], 0];
      currentCapaciteSac.push(newSac);
      setCapaciteSac(currentCapaciteSac);
    }
  }, [commandeEnCour]);

  function handleClickSupprimerPlat(commande: number, plat: number): void {
    const allCommandeEnCourCopie: ProduitEtMenu[][] = enCourRef.current.slice();
    const commandeCopie: ProduitEtMenu[] = allCommandeEnCourCopie[commande];
    commandeCopie.splice(plat, 1);
    allCommandeEnCourCopie.splice(commande, 1, commandeCopie);
    if (setCommandeAPreparer !== undefined) {
      setCommandeAPreparer(allCommandeEnCourCopie);
    }

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

  function handleClickGetSac(sac: [string, number]) {
    let currentCommandeSac: [[string, number][], number] =
      capaciteSacRef.current[idPlateauPrepa];
    currentCommandeSac[0].push(sac);
    let currentSac: number = currentCommandeSac[1];
    currentSac = currentSac + sac[1];
    currentCommandeSac = [currentCommandeSac[0], currentSac];
    const capaciteSacCopie = capaciteSacRef.current.slice();
    capaciteSacCopie.splice(idPlateauPrepa, 1, currentCommandeSac);
    setCapaciteSac(capaciteSacCopie);
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
      setValiderPlateau(false);
      return true;
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
          } else {
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
          Commande en attente : {enCourAffichage.length}
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

                      <button
                        onClick={() => handleClickFinirPlateau(position)}
                        className="buttonNeutre"
                        id="buttonFinir"
                      >
                        Finir
                      </button>
                    </ul>
                  )
                )}
                {enCourVide.map((e: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => handleClickPlateau(-1)}
                    className="commandeVide commandeUnique"
                  >
                    <p id="contenuVide">{e}</p>
                  </div>
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
                        {e}
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
                    onClick={() => handleClickRemplirPlateau()}
                    disabled={nuggetsDispo.boite18 === 0 ? true : false}
                    className={
                      nuggetsDispo.boite18 === 0
                        ? "buttonNeutre buttonNuggetVide"
                        : "buttonNeutre"
                    }
                  >
                    Boite de 18 <br />
                    disponible : {nuggetsDispo.boite18}
                  </button>
                  <button
                    onClick={() => handleClickRemplirPlateau()}
                    disabled={nuggetsDispo.boite6 === 0 ? true : false}
                    className={
                      nuggetsDispo.boite6 === 0
                        ? "buttonNeutre buttonNuggetVide"
                        : "buttonNeutre"
                    }
                  >
                    Boite de 6 <br />
                    disponible : {nuggetsDispo.boite6}
                  </button>
                  <button
                    onClick={() => handleClickRemplirPlateau()}
                    disabled={nuggetsDispo.boite3 === 0 ? true : false}
                    className={
                      nuggetsDispo.boite3 === 0
                        ? "buttonNeutre buttonNuggetVide"
                        : "buttonNeutre"
                    }
                  >
                    Boite de 3 <br />
                    disponible : {nuggetsDispo.boite3}
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
                      {e}
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
                      {e}
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
