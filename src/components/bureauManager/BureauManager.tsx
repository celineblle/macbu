import React, { useContext, useState } from "react";
import "./BureauManager.css";
import {
  FondDeCaisseContext,
  FondDeCaisseContextSetter,
} from "../../CaisseContext";
import close from "../../assets/close.svg";
import { sac } from "../../elements/stocks";
import {
  prixQuantiteFrites,
  prixQuantiteNugget,
  prixQuantiteFriture,
  prixQuantitePains,
  prixQuantiteFromages,
  prixQuantiteSauces,
  prixQuantiteIngredientsBurger,
  prixQuantiteGrill,
  prixQuantiteSac,
  prixQuantiteAutresProduits,
  prixQuantiteBoisson,
  prixQuantiteGlace,
} from "../../elements/prixIngredient";
import {
  nomDesPostesCuisine,
  nomDesPostesComptoir,
  StocksActuelsType,
} from "../../StocksActuels";

function BureauManager({
  stocksCuisine,
  setStocksCuisine,
  stocksComptoir,
  setStocksComptoir,
}: {
  stocksCuisine: StocksActuelsType[];
  setStocksCuisine: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>;
  stocksComptoir: StocksActuelsType[];
  setStocksComptoir: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>;
}) {
  const fondDeCaisse = useContext(FondDeCaisseContext);
  const setFondDeCaisse = useContext(FondDeCaisseContextSetter);

  const [buttonActionModalBureau, setButtonActionModalBureau] =
    useState<boolean>(false);

  function handleClickActionModal(): void {
    setButtonActionModalBureau(!buttonActionModalBureau);
  }

  const isItComptoir = (poste: string) => {
    let inComptoir: boolean = false;

    const postePresent = stocksComptoir.find((e) => e.poste === poste);

    if (postePresent !== undefined) {
      inComptoir = true;
    }

    return inComptoir;
  };

  function handleClickAcheter(
    poste: string,
    posteIndex: number,
    produit: string,
    prix: number
  ) {
    if (prix <= fondDeCaisse) {
      let copieFondDeCaisse: number = fondDeCaisse;
      copieFondDeCaisse = copieFondDeCaisse - prix;
      if (setFondDeCaisse !== undefined) {
        setFondDeCaisse(copieFondDeCaisse);
      }

      const quelleZone: boolean = isItComptoir(poste);
      let allTabZoneCopie: StocksActuelsType[] = [];
      let posteCopie: StocksActuelsType = structuredClone(stocksComptoir[1]);

      function insertProduct(
        currentZoneTab: StocksActuelsType[],
        setterZoneTab: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>
      ) {
        allTabZoneCopie = currentZoneTab.slice();
        posteCopie = structuredClone(currentZoneTab[posteIndex]);
        const produitIndex = posteCopie.stockActuel.findIndex(
          (e) => e.produit === produit
        );
        const produitCopie = posteCopie.stockActuel[produitIndex];
        const quantiteProduit = posteCopie.tableauPrixQuantite[produitIndex][1];

        produitCopie.quantite = produitCopie.quantite + quantiteProduit;

        posteCopie.stockActuel.splice(produitIndex, 1, produitCopie);

        allTabZoneCopie.splice(posteIndex, 1, posteCopie);

        setterZoneTab(allTabZoneCopie);
      }

      if (quelleZone === true) {
        insertProduct(stocksComptoir, setStocksComptoir);
      } else {
        insertProduct(stocksCuisine, setStocksCuisine);
      }
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
              {nomDesPostesCuisine[0][1].map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteFrites[i][1]} pièces</p>
                    <p>
                      Stock actuel:{" "}
                      {stocksCuisine.length > 0 &&
                        stocksCuisine[0].stockActuel[i].quantite}
                    </p>
                  </div>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter(
                        nomDesPostesCuisine[0][0],
                        0,
                        e,
                        prixQuantiteFrites[i][0]
                      )
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
                <div>
                  <p>Boite 18 nuggets</p>
                  <p>{prixQuantiteNugget[0][1]} pièces</p>
                  <p>
                    Stock actuel:{" "}
                    {stocksCuisine.length > 0 &&
                      stocksCuisine[1].stockActuel[0].quantite}
                  </p>
                </div>
                <button
                  className="buttonNeutre"
                  onClick={() =>
                    handleClickAcheter(
                      nomDesPostesCuisine[1][0],
                      1,
                      nomDesPostesCuisine[1][1][0],
                      prixQuantiteNugget[1][0]
                    )
                  }
                >
                  Acheter {prixQuantiteNugget[0][0]} €
                </button>
              </div>
              <div className="produit">
                <div>
                  <p>Boite 6 nuggets</p>
                  <p>{prixQuantiteNugget[1][1]} pièces</p>
                  <p>
                    Stock actuel:{" "}
                    {stocksCuisine.length > 0 &&
                      stocksCuisine[1].stockActuel[1].quantite}
                  </p>
                </div>
                <button
                  className="buttonNeutre"
                  onClick={() =>
                    handleClickAcheter(
                      nomDesPostesCuisine[1][0],
                      1,
                      nomDesPostesCuisine[1][1][1],
                      prixQuantiteNugget[2][0]
                    )
                  }
                >
                  Acheter {prixQuantiteNugget[1][0]} €
                </button>
              </div>
              <div className="produit">
                <div>
                  <p>Boite 3 nuggets </p>
                  <p> {prixQuantiteNugget[2][1]} pièces</p>
                  <p>
                    Stock actuel:{" "}
                    {stocksCuisine.length > 0 &&
                      stocksCuisine[1].stockActuel[2].quantite}
                  </p>
                </div>
                <button
                  className="buttonNeutre"
                  onClick={() =>
                    handleClickAcheter(
                      nomDesPostesCuisine[1][0],
                      1,
                      nomDesPostesCuisine[1][1][2],
                      prixQuantiteNugget[3][0]
                    )
                  }
                >
                  Acheter {prixQuantiteNugget[2][0]} €
                </button>
              </div>
            </div>
            <div className="rayonUnique">
              {nomDesPostesCuisine[2][1].map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteFriture[i][1]} pièces</p>
                    <p>
                      Stock actuel:{" "}
                      {stocksCuisine.length > 0 &&
                        stocksCuisine[2].stockActuel[i].quantite}
                    </p>
                  </div>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter(
                        nomDesPostesCuisine[2][0],
                        2,
                        e,
                        prixQuantiteFriture[i][0]
                      )
                    }
                  >
                    Acheter {prixQuantiteFriture[i][0]} €
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
                {nomDesPostesCuisine[3][1].map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>{prixQuantitePains[i][1]} pièces</p>
                      <p>
                        Stock actuel:{" "}
                        {stocksCuisine.length > 0 &&
                          stocksCuisine[3].stockActuel[i].quantite}
                      </p>
                    </div>
                    <button
                      className="buttonNeutre"
                      onClick={() =>
                        handleClickAcheter(
                          nomDesPostesCuisine[3][0],
                          3,
                          e,
                          prixQuantitePains[i + 1][0]
                        )
                      }
                    >
                      Acheter {prixQuantitePains[i][0]} €
                    </button>
                  </div>
                ))}
              </div>
              <br />

              <h4 className="titreRayons">Fromages</h4>
              <div className="rayonUnique">
                {nomDesPostesCuisine[4][1].map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>{prixQuantiteFromages[i][1]} pièces</p>
                      <p>
                        Stock actuel:{" "}
                        {stocksCuisine.length > 0 &&
                          stocksCuisine[4].stockActuel[i].quantite}
                      </p>
                    </div>
                    <button
                      className="buttonNeutre"
                      onClick={() =>
                        handleClickAcheter(
                          nomDesPostesCuisine[4][0],
                          4,
                          e,
                          prixQuantiteFromages[i][0]
                        )
                      }
                    >
                      Acheter {prixQuantiteFromages[i][0]} €
                    </button>
                  </div>
                ))}
              </div>
              <br />

              <h4 className="titreRayons">Ingrédients burger</h4>
              <div className="rayonUnique">
                {nomDesPostesCuisine[5][1].map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>{prixQuantiteIngredientsBurger[i][1]} pièces</p>
                      <p>
                        Stock actuel:{" "}
                        {stocksCuisine.length > 0 &&
                          stocksCuisine[5].stockActuel[i].quantite}
                      </p>
                    </div>
                    <button
                      className="buttonNeutre"
                      onClick={() =>
                        handleClickAcheter(
                          nomDesPostesCuisine[5][0],
                          5,
                          e,
                          prixQuantiteIngredientsBurger[i][0]
                        )
                      }
                    >
                      Acheter {prixQuantiteIngredientsBurger[i]} €
                    </button>
                  </div>
                ))}
              </div>
              <br />

              <h4 className="titreRayons">Sauces</h4>
              <div className="rayonUnique">
                {nomDesPostesCuisine[6][1].map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>{prixQuantiteSauces[i][1]} pièces</p>
                      <p>
                        Stock actuel:{" "}
                        {stocksCuisine.length > 0 &&
                          stocksCuisine[6].stockActuel[i].quantite}
                      </p>
                    </div>
                    <button
                      className="buttonNeutre"
                      onClick={() =>
                        handleClickAcheter(
                          nomDesPostesCuisine[6][0],
                          6,
                          e,
                          prixQuantiteSauces[i][0]
                        )
                      }
                    >
                      Acheter {prixQuantiteSauces[i][0]} €
                    </button>
                  </div>
                ))}
              </div>
              <br />
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Grill</h3>
            <div className="rayonUnique">
              {nomDesPostesCuisine[7][1].map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteGrill[i][1]} pièces</p>
                    <p>
                      Stock actuel:{" "}
                      {stocksCuisine.length > 0 &&
                        stocksCuisine[7].stockActuel[i].quantite}
                    </p>
                  </div>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter(
                        nomDesPostesCuisine[7][0],
                        8,
                        e,
                        prixQuantiteGrill[i][0]
                      )
                    }
                  >
                    Acheter {prixQuantiteGrill[i][0]} €
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Sac</h3>
            <div className="rayonUnique">
              {sac.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e[0]}</p>
                    <p>{prixQuantiteSac[i][1]} pièces</p>
                    <p>
                      Stock actuel:{" "}
                      {stocksComptoir.length > 0 &&
                        stocksComptoir[3].stockActuel[i].quantite}
                    </p>
                  </div>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter("sac", 3, e[0], prixQuantiteSac[i][0])
                    }
                  >
                    Acheter {prixQuantiteSac[i][0]} €
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Boisson</h3>
            <div className="rayonUnique">
              {nomDesPostesComptoir[0][1].map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteBoisson[i][1]} pièces</p>
                    <p>
                      Stock actuel:{" "}
                      {stocksComptoir.length > 0 &&
                        stocksComptoir[0].stockActuel[i].quantite}
                    </p>
                  </div>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter(
                        nomDesPostesComptoir[0][0],
                        0,
                        e,
                        prixQuantiteBoisson[i][0]
                      )
                    }
                  >
                    Acheter {prixQuantiteBoisson[i][0]} €
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Glace</h3>
            <div className="rayonUnique">
              {nomDesPostesComptoir[1][1].map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteGlace[i][1]} pièces</p>
                    <p>
                      Stock actuel:{" "}
                      {stocksComptoir.length > 0 &&
                        stocksComptoir[1].stockActuel[i].quantite}
                    </p>
                  </div>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter(
                        nomDesPostesComptoir[1][0],
                        1,
                        e,
                        prixQuantiteGlace[i][0]
                      )
                    }
                  >
                    Acheter {prixQuantiteGlace[i][0]} €
                  </button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Autres produits</h3>
            <div className="rayonUnique">
              {nomDesPostesComptoir[2][1].map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>{prixQuantiteAutresProduits[i][1]} pièces</p>
                    <p>
                      Stock actuel:{" "}
                      {stocksComptoir.length > 0 &&
                        stocksComptoir[2].stockActuel[i].quantite}
                    </p>
                  </div>
                  <button
                    className="buttonNeutre"
                    onClick={() =>
                      handleClickAcheter(
                        nomDesPostesComptoir[2][0],
                        2,
                        e,
                        prixQuantiteAutresProduits[i][0]
                      )
                    }
                  >
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
