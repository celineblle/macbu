import { useState, useEffect } from "react";
import "./App.css";
import Cuisine from "./components/cuisine/Cuisine";
import BureauManager from "./components/bureauManager/BureauManager";
import Comptoir from "./components/comptoir/Comptoir";
import {
  CommandesAPreparerContext,
  CommandesAPreparerContextSetter,
  TailleEtPrixCommandeContext,
  TailleEtPrixCommandeContextSetter,
} from "./CommandeContext";
import {
  Accompagnement,
  Burger,
  ProduitEtMenu,
  nuggets,
  BoiteNugget,
} from "./elements/burgers";
import * as stocks from "./elements/stocks";
import { StocksActuelsType, stocksActuels } from "./StocksActuels";

function App() {
  const [fritesDispo, setFritesDispo] = useState<Accompagnement[]>([
    {
      nom: "Vide",
      complement: "Vide",
      tailleProduit: "Vide",
      type: "Vide",
      sousType: "Vide",
      prix: 0,
    },
  ]);

  const [nuggetsGlobal, setNuggetsGlobal] = useState<BoiteNugget[]>([
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
  ]);
  const [burgerDispo, setBurgerDispo] = useState<Burger[]>([
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

  const [fondDeCaisse, setFondDeCaisse] = useState<number>(200);

  const [stocksCuisine, setStocksCuisine] = useState<StocksActuelsType[]>([]);
  const [stocksComptoir, setStocksComptoir] = useState<StocksActuelsType[]>([]);

  useEffect(() => {
    stocksActuels(setStocksCuisine, setStocksComptoir);
  }, []);

  return (
    <div id="page">
      <CommandesAPreparerContext value={commandeAPreparer}>
        <CommandesAPreparerContextSetter value={setCommandeAPreparer}>
          <TailleEtPrixCommandeContext value={tailleEtPrixCommande}>
            <TailleEtPrixCommandeContextSetter value={setTailleEtPrixCommande}>
              <BureauManager
                stocksCuisine={stocksCuisine}
                setStocksCuisine={setStocksCuisine}
                stocksComptoir={stocksComptoir}
                setStocksComptoir={setStocksComptoir}
                fondDeCaisse={fondDeCaisse}
                setFondDeCaisse={setFondDeCaisse}
              />
              <Cuisine
                stocksCuisine={stocksCuisine}
                setStocksCuisine={setStocksCuisine}
                setFritesDispo={setFritesDispo}
                nuggetsGlobal={nuggetsGlobal}
                setNuggetsGlobal={setNuggetsGlobal}
                burgerDispo={burgerDispo}
                setBurgerDispo={setBurgerDispo}
              />
              <Comptoir
                stocksComptoir={stocksComptoir}
                setStocksComptoir={setStocksComptoir}
                fondDeCaisse={fondDeCaisse}
                setFondDeCaisse={setFondDeCaisse}
                fritesDispo={fritesDispo}
                setFritesDispo={setFritesDispo}
                nuggetsGlobal={nuggetsGlobal}
                setNuggetsGlobal={setNuggetsGlobal}
                burgerDispo={burgerDispo}
                setBurgerDispo={setBurgerDispo}
              />
            </TailleEtPrixCommandeContextSetter>
          </TailleEtPrixCommandeContext>
        </CommandesAPreparerContextSetter>
      </CommandesAPreparerContext>
    </div>
  );
}

export default App;
