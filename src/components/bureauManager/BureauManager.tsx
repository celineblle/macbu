import React, { useContext, useState } from "react";
import "./BureauManager.css";
import { FondDeCaisseContext } from "../../CaisseContext";
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

function BureauManager() {
  const fondDeCaisse = useContext(FondDeCaisseContext);

  const [buttonActionModalBureau, setButtonActionModalBureau] =
    useState<boolean>(false);

  function handleClickActionModal(): void {
    setButtonActionModalBureau(!buttonActionModalBureau);
  }

  const prixQuantiteFrites: [number, number][] = [
    [15, 100],
    [20, 100],
  ];
  const prixQuantiteNugget: [number, number][] = [
    [35, 40],
    [28, 50],
    [20, 50],
    [15, 50],
    [120, 20],
    [40, 100],
    [30, 20],
    [40, 20],
    [25, 20],
    [35, 20],
    [20, 20],
  ];

  const prixQuantitePains: [number, number][] = [
    [80, 10],
    [30, 30],
    [20, 20],
    [20, 30],
    [30, 20],
    [30, 20],
    [40, 40],
    [40, 40],
    [50, 30],
    [40, 40],
  ];

  const prixQuantiteFromages: [number, number][] = [
    [65, 20],
    [20, 50],
    [18, 20],
    [18, 20],
    [25, 20],
    [30, 50],
  ];

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
                  <button className="buttonNeutre">
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
                <button className="buttonNeutre">
                  Acheter {prixQuantiteNugget[0][0]} €
                </button>
              </div>
              <div className="produit">
                <div>
                  <p>Boite 18 nuggets</p>
                  <p>{prixQuantiteNugget[1][1]} pièces</p>
                  <p>Stock actuel:</p>
                </div>
                <button className="buttonNeutre">
                  Acheter {prixQuantiteNugget[1][0]} €
                </button>
              </div>
              <div className="produit">
                <div>
                  <p>Boite 6 nuggets</p>
                  <p>{prixQuantiteNugget[2][1]} pièces</p>
                  <p>Stock actuel:</p>
                </div>
                <button className="buttonNeutre">
                  Acheter {prixQuantiteNugget[2][0]} €
                </button>
              </div>
              <div className="produit">
                <div>
                  <p>Boite 3 nuggets </p>
                  <p> {prixQuantiteNugget[3][1]} pièces</p>
                  <p>Stock actuel:</p>
                </div>
                <button className="buttonNeutre">
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
                <button className="buttonNeutre">
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
                  <button className="buttonNeutre">
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
                  <button className="buttonNeutre">
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
                    <button className="buttonNeutre">
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
                  <button className="buttonNeutre">
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
                    <button className="buttonNeutre">
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
                    Lot de tous les ingrédients burger <br />x de chaque
                    ingredient{" "}
                  </p>
                  <button className="buttonNeutre">Acheter x€</button>
                </div>
                {ingredientBurger.map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>Stock :</p>
                    </div>
                    <button className="buttonNeutre">Acheter x€</button>
                  </div>
                ))}
              </div>
              <br />

              <h4 className="titreRayons">Sauces</h4>
              <div className="rayonUnique">
                <div className="produit">
                  <p>
                    Lot de toutes les sauces <br />x de chaque sauce
                  </p>
                  <button className="buttonNeutre">Acheter x€</button>
                </div>
                {sauces.map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>Stock :</p>
                    </div>
                    <button className="buttonNeutre">Acheter x€</button>
                  </div>
                ))}
              </div>
              <br />

              <h4 className="titreRayons">Ingrédients salade</h4>
              <div className="rayonUnique">
                <div className="produit">
                  <p>
                    Lot de tous les ingrédients salade <br />x de chaque
                    ingredient
                  </p>
                  <button className="buttonNeutre">Acheter x€</button>
                </div>
                {ingredientSalade.map((e, i) => (
                  <div key={i} className="produit">
                    <div>
                      <p>{e}</p>
                      <p>Stock :</p>
                    </div>
                    <button className="buttonNeutre">Acheter x€</button>
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
                  Lot de toutes les viandes <br />x de chaque viande
                </p>
                <button className="buttonNeutre">Acheter x€</button>
              </div>
              {viande.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>Stock :</p>
                  </div>
                  <button className="buttonNeutre">Acheter x€</button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Sac</h3>
            <div className="rayonUnique">
              <div className="produit">
                <p>
                  Lot de toutes les tailles de sac <br />x de chaque taille
                </p>
                <button className="buttonNeutre">Acheter x€</button>
              </div>
              {sac.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e[0]}</p>
                    <p>Stock :</p>
                  </div>
                  <button className="buttonNeutre">Acheter x€</button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Boisson</h3>
            <div className="rayonUnique">
              <div className="produit">
                <p>
                  Lot de toutes les saveurs de boisson <br />x de chaque saveur
                </p>
                <button className="buttonNeutre">Acheter x€</button>
              </div>
              {boisson.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>Stock :</p>
                  </div>
                  <button className="buttonNeutre">Acheter x€</button>
                </div>
              ))}
            </div>
            <br />
            <hr />
            <h3 className="titreRayons">Glace</h3>
            <div className="rayonUnique">
              <div className="produit">
                <p>
                  Lot de tous les coulis et toppings glace <br />x de chaque
                  ingredient
                </p>
                <button className="buttonNeutre">Acheter x€</button>
              </div>
              {glaceToppings.map((e, i) => (
                <div key={i} className="produit">
                  <div>
                    <p>{e}</p>
                    <p>Stock :</p>
                  </div>
                  <button className="buttonNeutre">Acheter x€</button>
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
                    <p>Stock :</p>
                  </div>
                  <button className="buttonNeutre">Acheter x€</button>
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
