import React from "react";
import { useState } from "react";
import "./PosteAssemblage.css";
import {
  pains,
  frituresCuisine,
  sauces,
  fromages,
  viande,
  ingredientBurger,
  tailleProduitBurger,
  boiteBurger,
  taille,
} from "../../elements/stocks";
import { burgers } from "../../elements/burgers";

function PosteAssemblage() {
  interface Burger {
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
    conforme?: boolean;
  }

  interface ButtonIngredient {
    nom: string;
    tableau: string[];
    fonctionConstruction: (element: string, property: keyof Burger) => void;
  }

  const [modalAction, setModalAction] = useState<boolean>(false);
  const [burgerPret, setBurgerPret] = useState<Burger[]>([
    {
      pain: "ex",
      viande: "ex",
      fromage: ["ex"],
      ingredient: ["ex"],
      sauce: ["ex"],
    },
  ]);
  const [burgerEnAttente, setBurgerEnAttente] = useState<Burger[]>([
    {
      pain: "ex",
      viande: "ex",
      fromage: ["ex"],
      ingredient: ["ex"],
      sauce: ["ex"],
    },
  ]);
  const [currentBurger, setCurrentBurger] = useState<Burger>({});

  const viandeEtFriture: string[] = viande.concat(frituresCuisine);

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

  function handleClickOneIngredient(element: string, property: keyof Burger): void {
    console.log(element)
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
  }

  function handleClickSeveralIngredient(
    element: string,
    property: keyof Burger
  ): void {
    let ingredientButtonAction: string[] = Array.isArray(currentBurger[property])
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
    setBurgerEnAttente([...burgerEnAttente, currentBurger]);
    setCurrentBurger({});
  }

  function checkBurger(finalBurger: Burger, modelBurger: Burger): boolean {
    const finalBurgerSize: [string, string[]][] = Object.entries(finalBurger);
    const modelBurgerSize: [string, string[]][] = Object.entries(modelBurger);

    if (finalBurgerSize.length !== modelBurgerSize.length) {
      return false;
    };

    for (const property in finalBurger) {
      const propertyItemFinalB = finalBurger[property as keyof Burger];
      const propertyItemModelB = modelBurger[property as keyof Burger];
      if (!Array.isArray(propertyItemFinalB) || !Array.isArray(propertyItemModelB)) {
        if (
          propertyItemFinalB !== propertyItemModelB &&
          property !== "nom"
        ) {
          return false;
        }
      } else {
        let i = 0;
        while (i < propertyItemFinalB.length) {
          if (!propertyItemModelB?.includes(propertyItemFinalB[i])) {
            return false;
          }
          i++;
        };
        i = 0;
      };
    
    };
    return true;
  };

  function handleClickBurgerPret(): void {
    const finalBurger: Burger = currentBurger;

    function burgerSize(tailleProduitBurgerTab: string[], size: number): void {
      
      if (finalBurger.pain && (tailleProduitBurgerTab.includes(finalBurger.pain))
         ||
        (finalBurger.viande && tailleProduitBurgerTab.includes(finalBurger.viande))
      ) {
        finalBurger.tailleProduit = taille[size];
      finalBurger.emballage = boiteBurger[size];
      }

    };

    for (let i = 0; i < tailleProduitBurger.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(finalBurger, "tailleProduit")) {
        burgerSize(tailleProduitBurger[i], i);
      } else {
        i = tailleProduitBurger.length;
      }
    }

    if (!Object.prototype.hasOwnProperty.call(finalBurger, "tailleProduit")) {
      finalBurger.tailleProduit = taille[2];
      finalBurger.emballage = boiteBurger[2];
    }

    finalBurger.type = "sandwich";
    finalBurger.sousType = "burger";
    finalBurger.nom = "";

    let conforme = false;

    for (let i = 0; i < burgers.length; i++) {
      conforme = checkBurger(finalBurger, burgers[i]);
      const nom = burgers[i].nom
      if (conforme === true) {
        i = burgers.length;
        finalBurger.nom = nom;
      }
    }
    finalBurger.conforme = conforme;
    setBurgerPret([...burgerPret, finalBurger]);
    setCurrentBurger({});
  }

  function handleClickReprendreBurger(element: object): void {
    setCurrentBurger(element);
    setBurgerEnAttente(burgerEnAttente.filter((e: object) => e != element));
  }

  return (
    <div id="posteAssemblageComponent">
      <button
        id="buttonModalPosteAssemblage"
        role="button"
        onClick={handleClickToggleModal}
      >
        Cuisine
      </button>
      <div
        id="modalPosteAssemblage"
        className={modalAction ? "modalOpen" : "modalClose"}
      >
        <div className="modalContentPosteAssemblage">
          <div id="cuisinePreparation">
            <div id="buttonActionModal">
              <button className="close" onClick={handleClickToggleModal}>
                close
              </button>
              <button
                className="exitButtonBurger"
                onClick={handleClickBurgerAttente}
              >
                Mettre en attente
              </button>
              <button
                className="exitButtonBurger"
                onClick={handleClickBurgerPret}
              >
                Prêt
              </button>
            </div>
            <div className="tabPosteAssemblage">
              {buttonIngredientsBurger.map((element: ButtonIngredient) => (
                <button
                  key={element.nom}
                  className="tablinksPosteAssemblage"
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
                      ? "tabContentPosteAssemblageHidden"
                      : "tabContentPosteAssemblage"
                  }
                >
                  <React.Fragment key={element.nom}>
                  <h3>{element.nom}</h3>
                  {element.tableau.map((e: string) => (
                    <>
                      <button
                        key={e}
                        onClick={() =>
                          element.fonctionConstruction(e, element.nom as keyof Burger)
                        }
                      >
                        {e}
                      </button>
                    </>
                  ))}
                  </React.Fragment>
                  <div id="partieRecette">
                    <h2>Recettes</h2>
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
                </div>
              ))}
            </div>
            <div id="standByPosteAssemblage" className="postePosteAssemblage">
              <h2>En attente</h2>
              {burgerEnAttente.map((e: Burger, index: number) => (
                <button
                  key={index}
                  onClick={() => handleClickReprendreBurger(e)}
                >
                  {e.pain}
                </button>
              ))}
            </div>
            <div id="partieStock">
              <h2>Stocks</h2>
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
          <div id="burgerEnPreparation">
            <h2>Current burger</h2>
            {currentBurger.sauce?.length === 2 && (
              <p>{currentBurger.sauce[1]}</p>
            )}
            {currentBurger.sauce && <p>{currentBurger.sauce[0]}</p>}

            {currentBurger.ingredient && <p>{currentBurger.ingredient}</p>}
            {currentBurger.fromage?.length === 2 && (
              <p>{currentBurger.fromage[1]}</p>
            )}
            {currentBurger.fromage && <p>{currentBurger.fromage[0]}</p>}
            {currentBurger.viande && <p>{currentBurger.viande}</p>}
            {currentBurger.pain && <p>{currentBurger.pain}</p>}
          </div>
        </div>
      </div>
      <div id="standByPosteAssemblage" className="postePosteAssemblage">
        <h2>En attente</h2>
        {burgerEnAttente.map((e: Burger, index: number) => (
          <button key={index} onClick={() => handleClickReprendreBurger(e)}>
            {e.pain}
          </button>
        ))}
      </div>
      <div id="pretPosteAssemblage" className="postePosteAssemblage">
        <h2>Pret</h2>
        {burgerPret.map((e: Burger, index: number) => (
          <button key={index}>{e.pain}</button>
        ))}
      </div>
    </div>
  );
}

export default PosteAssemblage;
