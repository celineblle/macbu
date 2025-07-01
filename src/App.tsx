import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Cuisine from "./components/cuisine/Cuisine";
import BureauManager from "./components/bureauManager/BureauManager";
import Comptoir from "./components/comptoir/Comptoir";
import {
  FritesContext,
  FritesContextSetter,
  NuggetsContext,
  NuggetsContextSetter,
  BurgersContext,
  BurgersContextSetter,
  CommandesAPreparerContext,
  CommandesAPreparerContextSetter,
  BoiteNugget,
  TailleEtPrixCommandeContext,
  TailleEtPrixCommandeContextSetter,
} from "./CommandeContext";
import {
  FondDeCaisseContext,
  FondDeCaisseContextSetter,
} from "./CaisseContext";
import {
  Accompagnement,
  Burger,
  ProduitEtMenu,
  nuggets,
} from "./elements/burgers";
import * as stocks from "./elements/stocks";
import { StocksActuelsType, StocksActuels } from "./StocksActuels";

function App() {
  const [frites, setFrites] = useState<Accompagnement[]>([
    {
      nom: "Vide",
      complement: "Vide",
      tailleProduit: "Vide",
      type: "Vide",
      sousType: "Vide",
      prix: 0,
    },
  ]);
  const [nuggetsStateContext, setNuggetsStateContext] = useState<BoiteNugget[]>(
    [
      {
        friture: nuggets[0].nom,
        nombreNugget: nuggets[0].nombreNugget,
        quantitePret: 0,
        prix: nuggets[0].prix,
      },
      {
        friture: nuggets[1].nom,
        nombreNugget: nuggets[1].nombreNugget,
        quantitePret: 0,
        prix: nuggets[1].prix,
      },
      {
        friture: nuggets[2].nom,
        nombreNugget: nuggets[2].nombreNugget,
        quantitePret: 0,
        prix: nuggets[2].prix,
      },
    ]
  );
  const [burgers, setBurgers] = useState<Burger[]>([
    {
      nom: "Vide",
      pain: "Vide",
      viande: "Vide",
      tailleProduit: "Vide",
      type: "Vide",
      sousType: "Vide",
      prix: 0,
    },
  ]);

  const [commandeAPreparer, setCommandeAPreparer] = useState<ProduitEtMenu[][]>(
    []
  );

  const [tailleEtPrixCommande, setTailleEtPrixCommande] = useState<
    [number, number][]
  >([]);

  const tailleEtPrixRef = useRef<[number, number][]>([]);

  useEffect(() => {
    tailleEtPrixRef.current = tailleEtPrixCommande;
  }, [tailleEtPrixCommande]);

  useEffect(() => {
    if (commandeAPreparer.length > 0) {
      const allFinalTailleCommande: [number, number][] = [];
      let finalTailleCommande: number = 0;
      let prixFinal: number = 0;
      for (let i = 0; i < commandeAPreparer.length; i++) {
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
          prixFinal = prixFinal + currentProduit.prix;
        }

        allFinalTailleCommande.push([finalTailleCommande, prixFinal]);
        prixFinal = 0;
        finalTailleCommande = 0;
      }
      setTailleEtPrixCommande(allFinalTailleCommande);
    }
  }, [commandeAPreparer]);

  const [fondDeCaisse, setFondDeCaisse] = useState<number>(0);
  const caisseRef = useRef(0);

  useEffect(() => {
    caisseRef.current = fondDeCaisse;
  }, [fondDeCaisse]);

  const [stocksCuisine, setStocksCuisine] = useState<StocksActuelsType[]>([]);
  const [stocksComptoir, setStocksComptoir] = useState<StocksActuelsType[]>([]);
  const stocksCuisineRef = useRef<StocksActuelsType[]>([]);
  const stocksComptoirRef = useRef<StocksActuelsType[]>([]);

  useEffect(() => {
    stocksCuisineRef.current = stocksCuisine;
  }, [stocksCuisine]);

  useEffect(() => {
    stocksComptoirRef.current = stocksComptoir;
  }, [stocksComptoir]);

  useEffect(() => {
    StocksActuels(setStocksCuisine, setStocksComptoir);
  }, []);

  return (
    <div id="page">
      <CommandesAPreparerContext value={commandeAPreparer}>
        <CommandesAPreparerContextSetter value={setCommandeAPreparer}>
          <TailleEtPrixCommandeContext value={tailleEtPrixRef.current}>
            <TailleEtPrixCommandeContextSetter value={setTailleEtPrixCommande}>
              <FondDeCaisseContext value={caisseRef.current}>
                <FondDeCaisseContextSetter value={setFondDeCaisse}>
                  <BureauManager
                    stocksCuisine={stocksCuisineRef.current}
                    setStocksCuisine={setStocksCuisine}
                    stocksComptoir={stocksComptoirRef.current}
                    setStocksComptoir={setStocksComptoir}
                  />
                  <FritesContext value={frites}>
                    <FritesContextSetter value={setFrites}>
                      <NuggetsContext value={nuggetsStateContext}>
                        <NuggetsContextSetter value={setNuggetsStateContext}>
                          <BurgersContext value={burgers}>
                            <BurgersContextSetter value={setBurgers}>
                              <Cuisine
                                stocksCuisine={stocksCuisineRef.current}
                                setStocksCuisine={setStocksCuisine}
                              />
                              <Comptoir
                                stocksComptoir={stocksComptoirRef.current}
                                setStocksComptoir={setStocksComptoir}
                              />
                            </BurgersContextSetter>
                          </BurgersContext>
                        </NuggetsContextSetter>
                      </NuggetsContext>
                    </FritesContextSetter>
                  </FritesContext>
                </FondDeCaisseContextSetter>
              </FondDeCaisseContext>
            </TailleEtPrixCommandeContextSetter>
          </TailleEtPrixCommandeContext>
        </CommandesAPreparerContextSetter>
      </CommandesAPreparerContext>
    </div>
  );
}

export default App;
