import React, { useContext, useState } from "react";
import "./BureauManager.css";
import {
  FondDeCaisseContext,
  FondDeCaisseContextSetter,
} from "../../CaisseContext";
import close from "../../assets/close.svg";
import {
  frituresCuisine,
  pains,
  sauces,
  fromages,
  frite,
  viande,
  ingredientSalade,
  ingredientBurger,
  frais,
  glaceToppings,
  boisson,
  sac,
} from "../../elements/stocks";
import {
  prixQuantiteFrites,
  prixQuantiteNugget,
  prixQuantitePains,
  prixQuantiteFromages,
  prixQuantiteSauces,
  prixQuantiteIngredientsBurger,
  prixQuantiteIngredientSalade,
  prixQuantiteGrill,
  prixQuantiteSac,
  prixQuantiteAutresProduits,
  prixQuantiteBoisson,
  prixQuantiteGlace,
} from "../../elements/prixIngredient";

function BureauManager() {
  const fondDeCaisse = useContext(FondDeCaisseContext);
  const setFondDeCaisse = useContext(FondDeCaisseContextSetter);

  const [buttonActionModalBureau, setButtonActionModalBureau] =
    useState<boolean>(false);

  function handleClickActionModal(): void {
    setButtonActionModalBureau(!buttonActionModalBureau);
  }

  function handleClickAcheter(produit: string, prix: number) {
    if (prix < fondDeCaisse) {
      let copieFondDeCaisse: number = fondDeCaisse;
      copieFondDeCaisse = copieFondDeCaisse - prix;
      if (setFondDeCaisse !== undefined) {
        setFondDeCaisse(copieFondDeCaisse);
      }
      // if (produit === "LotNugget") {
      // } else if (produit === "BoiteNugget") {
      // } else if (produit === "LotFriture") {

      // } else if (produit === "LotPain") {

      // } else if(produit === "LotFromage") {

      // } else if (produit === "LotBurger") {

      // } else if(produit === "")
    }
  }

  return (
    <div id="bureauManagerComponent">
      <div id="bureauManagerContentPage">
        <h2>bureau manager</h2>

        <h3>Budget : {fondDeCaisse}</h3>
        <button className="buttonModal" onClick={handleClickActionModal}>
          Ouvrir magasin
        </button>
      </div>
      <div className={buttonActionModalBureau ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div id="headerModal">
            <h2>Magasin</h2>
            <h3>Budget : {fondDeCaisse}</h3>
            <button
              onClick={handleClickActionModal}
              className="closeModalButton"
            >
              {" "}
              <img alt="fermer" title="fermer" src={close}></img>
            </button>
          </div>
          <div id="rayons">
            <br />
            <h3 className="titreRayons">Friteuse</h3>
            <div className="rayonUnique">
              {frite.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteFrites[i][1]} pièces</p>
                    <p>Stock actuel:</p>
                  </div>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter(e, prixQuantiteFrites[i][0])
                    }
                  >
                    Acheter {prixQuantiteFrites[i][0]} €
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Friteuse Nugget</h3>
            <div className="rayonUnique">
              <div className="produit">
                <p>
                  Lot boites de nuggets toutes tailles <br />
                  {prixQuantiteNugget[0][1]} pièces de chaque taille
                </p>
                <button
                  className="buttonNeutre"
                  onClick={() =>
                    handleClickAcheter("LotNugget", prixQuantiteNugget[0][0])
                  }
                >
                  Acheter {prixQuantiteNugget[0][0]} €
                </button>
              </div>
              <div className="produit">
                <div>
                  <p>Boite 18 nuggets</p>
                  <p>{prixQuantiteNugget[1][1]} pièces</p>
                  <p>Stock actuel:</p>
                </div>
                <button
                  className="buttonNeutre"
                  onClick={() =>
                    handleClickAcheter("BoiteNugget", prixQuantiteNugget[1][0])
                  }
                >
                  Acheter {prixQuantiteNugget[1][0]} €
                </button>
              </div>
              <div className="produit">
                <div>
                  <p>Boite 6 nuggets</p>
                  <p>{prixQuantiteNugget[2][1]} pièces</p>
                  <p>Stock actuel:</p>
                </div>
                <button
                  className="buttonNeutre"
                  onClick={() =>
                    handleClickAcheter("BoiteNugget", prixQuantiteNugget[2][0])
                  }
                >
                  Acheter {prixQuantiteNugget[2][0]} €
                </button>
              </div>
              <div className="produit">
                <div>
                  <p>Boite 3 nuggets </p>
                  <p> {prixQuantiteNugget[3][1]} pièces</p>
                  <p>Stock actuel:</p>
                </div>
                <button
                  className="buttonNeutre"
                  onClick={() =>
                    handleClickAcheter("BoiteNugget", prixQuantiteNugget[3][0])
                  }
                >
                  Acheter {prixQuantiteNugget[3][0]} €
                </button>
              </div>
            </div>
            <div className="rayonUnique">
              <div className="produit">
                <p>
                  Lot de toutes les fritures <br />
                  hors nuggets poulet
                  <br /> {prixQuantiteNugget[4][1]} pièces de chaque friture
                </p>
                <button
                  className="buttonNeutre"
                  onClick={() =>
                    handleClickAcheter("LotFriture", prixQuantiteNugget[4][0])
                  }
                >
                  Acheter {prixQuantiteNugget[4][0]} €
                </button>
              </div>
              {frituresCuisine.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteNugget[i + 5][1]} pièces</p>
                    <p>Stock actuel:</p>
                  </div>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter(e, prixQuantiteNugget[i + 5][0])
                    }
                  >
                    Acheter {prixQuantiteNugget[i + 5][0]}€
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Cuisine</h3>
            <div>
              <br />
              <h4 className="titreRayons">Pains</h4>
              <div className="rayonUnique">
                <div className="produit">
                  <p>
                    Lot de tous les pains <br /> {prixQuantitePains[0][1]} de
                    chaque pain
                  </p>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter("LotPain", prixQuantitePains[0][0])
                    }
                  >
                    Acheter {prixQuantitePains[0][0]} €
                  </button>
                </div>
                {pains.map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>{prixQuantitePains[i + 1][1]} pièces</p>
                      <p>Stock actuel:</p>
                    </div>
                    <button
                      className="buttonNeutre"
                      onClick={() =>
                        handleClickAcheter(e, prixQuantitePains[i + 1][0])
                      }
                    >
                      Acheter {prixQuantitePains[i + 1][0]} €
                    </button>
                  </div>
                ))}
              </div>
              <br />

              <h4 className="titreRayons">Fromages</h4>
              <div className="rayonUnique">
                <div className="produit">
                  <p>
                    Lot de tous les fromages <br /> {prixQuantiteFromages[0][1]}{" "}
                    de chaque fromage
                  </p>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter(
                        "LotFromage",
                        prixQuantiteFromages[0][0]
                      )
                    }
                  >
                    Acheter {prixQuantiteFromages[0][0]} €
                  </button>
                </div>
                {fromages.map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>{prixQuantiteFromages[i + 1][1]}</p>
                      <p>Stock actuel:</p>
                    </div>
                    <button
                      className="buttonNeutre"
                      onClick={() =>
                        handleClickAcheter(e, prixQuantiteFromages[i + 1][0])
                      }
                    >
                      Acheter {prixQuantiteFromages[i + 1][0]} €
                    </button>
                  </div>
                ))}
              </div>
              <br />

              <h4 className="titreRayons">Ingrédients burger</h4>
              <div className="rayonUnique">
                <div className="produit">
                  <p>
                    Lot de tous les ingrédients burger <br />
                    {prixQuantiteIngredientsBurger[0][1]} de chaque ingredient
                  </p>
                  <button className="buttonNeutre">
                    Acheter {prixQuantiteIngredientsBurger[0][0]} €
                  </button>
                </div>
                {ingredientBurger.map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>{prixQuantiteIngredientsBurger[i + 1][1]}</p>
                      <p>Stock actuel:</p>
                    </div>
                    <button className="buttonNeutre">
                      Acheter {prixQuantiteIngredientsBurger[i + 1]} €
                    </button>
                  </div>
                ))}
              </div>
              <br />

              <h4 className="titreRayons">Sauces</h4>
              <div className="rayonUnique">
                <div className="produit">
                  <p>
                    Lot de toutes les sauces <br />
                    {prixQuantiteSauces[0][1]}de chaque sauce
                  </p>
                  <button className="buttonNeutre">
                    Acheter {prixQuantiteSauces[0][1]} €
                  </button>
                </div>
                {sauces.map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>{prixQuantiteSauces[i + 0][1]}</p>
                      <p>Stock actuel:</p>
                    </div>
                    <button className="buttonNeutre">
                      Acheter {prixQuantiteSauces[i + 1][0]} €
                    </button>
                  </div>
                ))}
              </div>
              <br />

              <h4 className="titreRayons">Ingrédients salade</h4>
              <div className="rayonUnique">
                <div className="produit">
                  <p>
                    Lot de tous les toppings salade <br />
                    {prixQuantiteIngredientSalade[0][1]} de chaque ingredient
                  </p>
                  <button className="buttonNeutre">
                    Acheter {prixQuantiteIngredientSalade[0][0]} €
                  </button>
                </div>
                {ingredientSalade.map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>{prixQuantiteIngredientSalade[i + 1][1]}</p>
                      <p>Stock actuel:</p>
                    </div>
                    <button className="buttonNeutre">
                      Acheter {prixQuantiteIngredientSalade[i + 1][0]} €
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Grill</h3>
            <div className="rayonUnique">
              <div className="produit">
                <p>
                  Lot de toutes les viandes <br />
                  {prixQuantiteGrill[0][1]} de chaque viande
                </p>
                <button className="buttonNeutre">
                  Acheter {prixQuantiteGrill[0][0]} €
                </button>
              </div>
              {viande.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteGrill[i + 1][1]}</p>
                    <p>Stock actuel:</p>
                  </div>
                  <button className="buttonNeutre">
                    Acheter {prixQuantiteGrill[i + 1][0]} €
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Sac</h3>
            <div className="rayonUnique">
              <div className="produit">
                <p>
                  Lot de toutes les tailles de sac <br />
                  {prixQuantiteSac[0][1]} de chaque taille
                </p>
                <button className="buttonNeutre">
                  Acheter {prixQuantiteSac[0][0]} €
                </button>
              </div>
              {sac.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e[0]}</p>
                    <p>{prixQuantiteSac[i + 1][1]}</p>
                    <p>Stock actuel:</p>
                  </div>
                  <button className="buttonNeutre">
                    Acheter {prixQuantiteSac[i + 1][0]} €
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Boisson</h3>
            <div className="rayonUnique">
              <div className="produit">
                <p>
                  Lot de toutes les saveurs de boisson <br />
                  {prixQuantiteBoisson[0][1]} de chaque saveur
                </p>
                <button className="buttonNeutre">
                  Acheter {prixQuantiteBoisson[0][0]} €
                </button>
              </div>
              {boisson.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteBoisson[i + 1][1]}</p>
                    <p>Stock actuel:</p>
                  </div>
                  <button className="buttonNeutre">
                    Acheter {prixQuantiteBoisson[i + 1][0]} €
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Glace</h3>
            <div className="rayonUnique">
              <div className="produit">
                <p>
                  Lot de tous les coulis et toppings glace <br />
                  {prixQuantiteGlace[0][1]} de chaque ingredient
                </p>
                <button className="buttonNeutre">
                  Acheter {prixQuantiteGlace[0][0]} €
                </button>
              </div>
              {glaceToppings.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteGlace[i + 1][1]}</p>
                    <p>Stock actuel:</p>
                  </div>
                  <button className="buttonNeutre">
                    Acheter {prixQuantiteGlace[i + 1][0]} €
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Autres produits</h3>
            <div className="rayonUnique">
              {frais.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteAutresProduits[i][1]}</p>
                    <p>Stock actuel:</p>
                  </div>
                  <button className="buttonNeutre">
                    Acheter {prixQuantiteAutresProduits[i][0]} €
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h1>MacBu</h1>
    </div>
  );
}

export default BureauManager;
