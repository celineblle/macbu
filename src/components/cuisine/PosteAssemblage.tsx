import React, { useEffect, useRef, useState, useContext } from "react";
import "./PosteAssemblage.css";
import close from "../../assets/close.svg";
import {
  pains,
  sauces,
  fromages,
  ingredientBurger,
  tailleProduitBurger,
  taille,
} from "../../elements/stocks";
import { burgers, Produit, Burger } from "../../elements/burgers";
import { ViandePret } from "./Cuisine";
import { Friture } from "../../elements/ingredientsQuantite";
import {
  BurgersContext,
  BurgersContextSetter,
  CommandesAPreparerContext,
} from "../../CommandeContext";
import { demantelerMenu, quiEstQuoi } from "../../elements/function";

function PosteAssemblage({
  viandePretRef,
  setViandePret,
  bacFritureRef,
  setBacFriture,
}: {
  viandePretRef: React.RefObject<ViandePret[]>;
  setViandePret: React.Dispatch<React.SetStateAction<ViandePret[]>>;
  bacFritureRef: React.RefObject<Friture[]>;
  setBacFriture: React.Dispatch<React.SetStateAction<Friture[]>>;
}) {
  interface BurgerAllOptional {
    nom?: string;
    pain?: string;
    viande?: string;
    fromage?: string[];
    ingredient?: string[];
    sauce?: string[];
    emballage?: string;
    tailleProduit?: string;
    type?: string;
    sousType?: string;
  }

  interface ButtonIngredient {
    nom: string;
    tableau: string[];
    fonctionConstruction: (element: string, property: keyof Burger) => void;
  }

  const burgersContext = useContext(BurgersContext);
  const setBurgersContext = useContext(BurgersContextSetter);
  const commandeAPreparer = useContext(CommandesAPreparerContext);

  const limitBurgerRack: number = 4;

  const [modalAction, setModalAction] = useState<boolean>(false);
  const [burgerEnAttente, setBurgerEnAttente] = useState<BurgerAllOptional[]>(
    []
  );
  const [currentBurger, setCurrentBurger] = useState<BurgerAllOptional>({});
  const [commandeSandwich, setCommandeSandwich] = useState<
    (string | string[])[]
  >([]);

  function getAvailableViande(): string[] {
    const viandePretBurger = [];

    for (let i = 0; i < viandePretRef.current.length; i++) {
      if (viandePretRef.current[i].quantite > 0) {
        viandePretBurger.push(viandePretRef.current[i].nom);
      }
    }

    for (let i = 0; i < bacFritureRef.current.length; i++) {
      if (bacFritureRef.current[i].quantiteSachet > 0) {
        viandePretBurger.push(bacFritureRef.current[i].friture);
      }
    }

    if (viandePretBurger.length === 0) {
      viandePretBurger.push("Aucun");
    }

    return viandePretBurger;
  }

  let viandeEtFriture: string[] = getAvailableViande();

  const burgerPretRef = useRef<Burger[]>([]);
  const burgerEnAttenteRef = useRef<BurgerAllOptional[]>([]);

  useEffect(() => {
    burgerPretRef.current = burgersContext;
  }, [burgersContext]);

  useEffect(() => {
    burgerEnAttenteRef.current = burgerEnAttente;
  }, [burgerEnAttente]);

  useEffect(() => {
    viandeEtFriture = getAvailableViande();
  }, [viandePretRef.current, bacFritureRef.current]);

  const buttonIngredientsBurger: ButtonIngredient[] = [
    {
      nom: "pain",
      tableau: pains,
      fonctionConstruction: handleClickOneIngredient,
    },
    {
      nom: "viande",
      tableau: viandeEtFriture,
      fonctionConstruction: handleClickOneIngredient,
    },
    {
      nom: "fromage",
      tableau: fromages,
      fonctionConstruction: handleClickSeveralIngredient,
    },
    {
      nom: "ingredient",
      tableau: ingredientBurger,
      fonctionConstruction: handleClickSeveralIngredient,
    },
    {
      nom: "sauce",
      tableau: sauces,
      fonctionConstruction: handleClickSeveralIngredient,
    },
  ];

  const [tabAction, setTabAction] = useState<string>(
    buttonIngredientsBurger[0].nom
  );

  function handleClickToggleModal(): void {
    setModalAction(!modalAction);
  }

  function handleClickOneIngredient(
    element: string,
    property: keyof BurgerAllOptional
  ): void {
    if (!Object.prototype.hasOwnProperty.call(currentBurger, property)) {
      setCurrentBurger({
        ...currentBurger,
        [property]: element,
      });
    } else if (
      Object.prototype.hasOwnProperty.call(currentBurger, property) &&
      element !== currentBurger[property]
    ) {
      setCurrentBurger({
        ...currentBurger,
        [property]: element,
      });
    }

    if (viandeEtFriture.includes(element)) {
      const isItfriture: number = bacFritureRef.current.findIndex(
        (e) => e.friture === element
      );
      if (isItfriture === -1) {
        const isItViande: number = viandePretRef.current.findIndex(
          (e) => e.nom === element
        );
        const viandeCopie: ViandePret[] = viandePretRef.current.slice();
        viandeCopie[isItViande].quantite = viandeCopie[isItViande].quantite - 1;
        setViandePret(viandeCopie);
      } else {
        const fritureCopie: Friture[] = bacFritureRef.current.slice();
        fritureCopie[isItfriture].quantiteSachet =
          fritureCopie[isItfriture].quantiteSachet - 1;
        setBacFriture(fritureCopie);
      }
    }
  }

  function handleClickSeveralIngredient(
    element: string,
    property: keyof BurgerAllOptional
  ): void {
    let ingredientButtonAction: string[] = Array.isArray(
      currentBurger[property]
    )
      ? currentBurger[property]
      : [];

    const limit: number = property === "ingredient" ? 3 : 2;

    if (ingredientButtonAction.length === 0) {
      ingredientButtonAction.push(element);
    } else if (
      ingredientButtonAction.length < limit &&
      !ingredientButtonAction.includes(element)
    ) {
      ingredientButtonAction.push(element);
    } else if (ingredientButtonAction.includes(element)) {
      ingredientButtonAction = ingredientButtonAction.filter(
        (e: string) => e !== element
      );
    }
    setCurrentBurger({
      ...currentBurger,
      [property]: ingredientButtonAction,
    });
  }

  function handleClickTabIngredients(element: string): void {
    setTabAction(element);
  }

  function handleClickBurgerAttente(): void {
    if (burgerEnAttenteRef.current.length < limitBurgerRack) {
      setBurgerEnAttente([...burgerEnAttente, currentBurger]);
      setCurrentBurger({});
    }
  }

  function checkBurger(finalBurger: Burger, modelBurger: Burger): boolean {
    const finalBurgerSize: [string, string[]][] = Object.entries(finalBurger);
    const modelBurgerSize: [string, string[]][] = Object.entries(modelBurger);

    if (finalBurgerSize.length !== modelBurgerSize.length) {
      return false;
    }

    for (const property in finalBurger) {
      const propertyItemFinalB = finalBurger[property as keyof Burger];
      const propertyItemModelB = modelBurger[property as keyof Burger];
      if (
        !Array.isArray(propertyItemFinalB) ||
        !Array.isArray(propertyItemModelB)
      ) {
        if (propertyItemFinalB !== propertyItemModelB && property !== "nom") {
          return false;
        }
      } else {
        let i = 0;
        while (i < propertyItemFinalB.length) {
          if (!propertyItemModelB?.includes(propertyItemFinalB[i])) {
            return false;
          }
          i++;
        }
        i = 0;
      }
    }
    return true;
  }

  function handleClickBurgerPret(): void {
    if (burgerPretRef.current.length < limitBurgerRack) {
      const finalBurger: Burger = {
        nom: "initial",
        pain: "initial",
        viande: "initial",
        tailleProduit: "initial",
        type: "sandwich",
        sousType: "burger",
      };

      if (
        !!currentBurger.nom &&
        !!currentBurger.pain &&
        !!currentBurger.viande &&
        !!currentBurger.tailleProduit
      ) {
        finalBurger.nom = currentBurger.nom;
        finalBurger.pain = currentBurger.pain;
        finalBurger.viande = currentBurger.viande;
        finalBurger.tailleProduit = currentBurger.tailleProduit;

        if (currentBurger.fromage !== undefined) {
          finalBurger.fromage = currentBurger.fromage;
        }
        if (currentBurger.ingredient !== undefined) {
          finalBurger.ingredient = currentBurger.ingredient;
        }
        if (currentBurger.sauce !== undefined) {
          finalBurger.sauce = currentBurger.sauce;
        }
      }

      function burgerSize(
        tailleProduitBurgerTab: string[],
        size: number
      ): void {
        if (
          (finalBurger.pain &&
            tailleProduitBurgerTab.includes(finalBurger.pain)) ||
          (finalBurger.viande &&
            tailleProduitBurgerTab.includes(finalBurger.viande))
        ) {
          finalBurger.tailleProduit = taille[size];
        }
      }
      for (let i = 0; i < tailleProduitBurger.length; i++) {
        if (
          !Object.prototype.hasOwnProperty.call(finalBurger, "tailleProduit")
        ) {
          burgerSize(tailleProduitBurger[i], i);
        } else {
          i = tailleProduitBurger.length;
        }
      }
      if (!Object.prototype.hasOwnProperty.call(finalBurger, "tailleProduit")) {
        finalBurger.tailleProduit = taille[2];
      }

      finalBurger.type = "sandwich";
      finalBurger.sousType = "burger";
      finalBurger.nom = "";

      let conforme = false;

      for (let i = 0; i < burgers.length; i++) {
        conforme = checkBurger(finalBurger, burgers[i]);
        const nom = burgers[i].nom;
        if (conforme === true) {
          i = burgers.length;
          finalBurger.nom = nom;
        } else {
          finalBurger.nom = "Recette Personnelle";
        }
      }
      if (setBurgersContext !== undefined) {
        setBurgersContext([...burgersContext, finalBurger]);
      }
      setCurrentBurger({});
    }
  }

  function handleClickReprendreBurger(element: object): void {
    setCurrentBurger(element);
    setBurgerEnAttente(burgerEnAttente.filter((e: object) => e != element));
  }

  useEffect(() => {
    const commandesSansMenu: Produit[][] = demantelerMenu(commandeAPreparer);

    const commandesDuPoste: string[][] = quiEstQuoi(
      "burger",
      commandesSansMenu
    );
    setCommandeSandwich(commandesDuPoste);
  }, [commandeAPreparer]);

  return (
    <div id="posteAssemblageComponent" className="component">
      <button
        className="buttonModal"
        role="button"
        onClick={handleClickToggleModal}
        id="buttonCuisine"
      >
        Cuisine
      </button>

      <div id="pretPosteAssemblage" className="postePosteAssemblage">
        <h3>Pret</h3>
        {burgersContext.map((e: Burger, index: number) => (
          <button className="commandePret" key={index}>
            {e.nom}
          </button>
        ))}
      </div>

      <div id="standByPosteAssemblage" className="postePosteAssemblage">
        <h3>En attente</h3>
        {burgerEnAttente.map((e: BurgerAllOptional, index: number) => (
          <button
            className="commandeCuisson"
            key={index}
            onClick={() => handleClickReprendreBurger(e)}
          >
            {e.pain}
          </button>
        ))}
      </div>

      <div
        id="modalPosteAssemblage"
        className={modalAction ? "modalOpen" : "modalClose"}
      >
        <div className="modalContent">
          <div id="headerModal">
            <h2>Cuisine</h2>
            <button
              onClick={handleClickToggleModal}
              className="closeModalButton"
            >
              {" "}
              <img alt="fermer" title="fermer" src={close}></img>
            </button>
          </div>
          <div id="modalCuisineContent">
            <div id="modalGauche">
              <div id="enTeteConstructeur">
                <h3 id="titreEnCour">En cour</h3>
                <div id="buttonActionBurger">
                  <button
                    className="buttonNeutre buttonSortieBurger"
                    onClick={handleClickBurgerAttente}
                  >
                    Mettre en attente
                  </button>
                  <button
                    className="buttonNeutre buttonSortieBurger"
                    onClick={handleClickBurgerPret}
                  >
                    Prêt
                  </button>
                </div>
              </div>
              <br />
              <div id="toutOnglets">
                {buttonIngredientsBurger.map((element: ButtonIngredient) => (
                  <button
                    key={element.nom}
                    className="onglet"
                    onClick={() => handleClickTabIngredients(element.nom)}
                  >
                    {element.nom}
                  </button>
                ))}
              </div>

              <div>
                {buttonIngredientsBurger.map((element: ButtonIngredient) => (
                  <div
                    key={element.nom}
                    id={element.nom}
                    className={
                      element.nom != tabAction
                        ? "tabContentHidden"
                        : "tabContentPosteAssemblage"
                    }
                  >
                    <div id="toutButtonIngredient">
                      {element.tableau.map((e: string) => (
                        <button
                          key={e}
                          onClick={() =>
                            element.fonctionConstruction(
                              e,
                              element.nom as keyof Burger
                            )
                          }
                          className="buttonNeutre buttonIngredient"
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                    <br />
                    <div id="suiviConstruction">
                      <div id="partieRecette">
                        <h3>Recettes</h3>
                        <ul>
                          {burgers.map((burger: Burger, index: number) => (
                            <li key={index}>
                              {burger.nom} :{" "}
                              {!burger[element.nom as keyof Burger]
                                ? "aucun"
                                : `${burger[element.nom as keyof Burger]} `}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div id="currentBurger">
                        <h3>Current burger</h3>
                        {currentBurger.sauce?.length === 2 && (
                          <p>{currentBurger.sauce[1]}</p>
                        )}
                        {currentBurger.sauce && <p>{currentBurger.sauce[0]}</p>}

                        {currentBurger.ingredient && (
                          <p>{currentBurger.ingredient}</p>
                        )}
                        {currentBurger.fromage?.length === 2 && (
                          <p>{currentBurger.fromage[1]}</p>
                        )}
                        {currentBurger.fromage && (
                          <p>{currentBurger.fromage[0]}</p>
                        )}
                        {currentBurger.viande && <p>{currentBurger.viande}</p>}
                        {currentBurger.pain && <p>{currentBurger.pain}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div id="modalDroite">
              <div id="commandeCuisine">
                <h3>Commande</h3>
                <div id="commandeCuisineAllButton">
                  {commandeSandwich.map(
                    (sandwich: string[] | string, index: number) => (
                      <button
                        key={index}
                        disabled={true}
                        className="commandeUniquePage commandeSandwich"
                      >
                        {typeof sandwich === "string" ? (
                          sandwich
                        ) : (
                          <ul>
                            {sandwich.map((unique: string, i: number) => (
                              <li key={i}>{unique}</li>
                            ))}
                          </ul>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
              <h3>Pret</h3>
              <div id="pretBurger" className="postePosteAssemblage">
                {burgersContext.map((e: Burger, index: number) => (
                  <button className="commandePret" key={index}>
                    {e.nom}
                  </button>
                ))}
              </div>
              <h3>En attente</h3>
              <div id="standBurger" className="postePosteAssemblage">
                {burgerEnAttente.map((e: BurgerAllOptional, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleClickReprendreBurger(e)}
                    className="commandeCuisson"
                  >
                    {e.pain}
                  </button>
                ))}
              </div>
              <div id="partieStock">
                <h3>Stocks</h3>
                <ul>
                  <li>stocks : 1</li>
                  <li>stocks : 2</li>
                  <li>stocks : 3</li>
                  <li>stocks : 4</li>
                  <li>stocks : 5</li>
                  <li>stocks : 6</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosteAssemblage;
