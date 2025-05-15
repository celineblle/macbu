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

  const setCommandeAPreparer = useContext(CommandesAPreparerContextSetter);

  const fritesDispo = useContext(FritesContext);
  const nuggetsDispo = useContext(NuggetsContext);
  const burgersDispo = useContext(BurgersContext);

  console.log(burgersDispo, nuggetsDispo);

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

  const enCourRef = useRef<ProduitEtMenu[][]>([]);
  const enCourAffichageRef = useRef<(string | string[])[][]>([]);
  const idPlateauRef = useRef<number>(0);

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

  function handleClickPlateau(position: number): void {
    if (position === -1) {
      setIdPlateauPrepa(enCourRef.current.length);
    } else {
      setIdPlateauPrepa(position);
    }
  }

  function handleClickRemplirPlateau(plat: Produit | string): void {
    const allCommandeEnCourCopie: ProduitEtMenu[][] = enCourRef.current.slice();
    let commandeCopie: (ProduitEtMenu | string)[] = [];
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
                    <div
                      key={position}
                      onClick={() => handleClickPlateau(position)}
                      className="commandeCuisson commandeUnique commandeEnCour"
                    >
                      {tab.map((commande: string | string[], index: number) => (
                        <ul key={index} className="commandeContruction">
                          {typeof commande === "string" ? (
                            <li>
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
                            <ul className="commandeContruction">
                              {commande.map((menu: string, i: number) => (
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
                              ))}
                            </ul>
                          )}
                        </ul>
                      ))}
                      <button
                        onClick={() => handleClickFinirPlateau(position)}
                        className="buttonNeutre"
                        id="buttonFinir"
                      >
                        Finir
                      </button>
                    </div>
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
                    elementsCommandes[3].nom != tabActionComptoirA
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
                  {stocks.boiteBurger.map((e, i) => (
                    <button
                      key={i}
                      onClick={() => handleClickRemplirPlateau(e)}
                      className="buttonNeutre"
                    >
                      {e}
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
