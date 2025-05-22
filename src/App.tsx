import React, { useState } from "react";
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
} from "./CommandeContext";
import {
  Accompagnement,
  Burger,
  ProduitEtMenu,
  nuggets,
} from "./elements/burgers";

function App() {
  const [frites, setFrites] = useState<Accompagnement[]>([
    {
      nom: "Vide",
      complement: "Vide",
      tailleProduit: "Vide",
      type: "Vide",
      sousType: "Vide",
    },
  ]);
  const [nuggetsStateContext, setNuggetsStateContext] = useState<BoiteNugget[]>(
    [
      {
        friture: nuggets[0].nom,
        nombreNugget: nuggets[0].nombreNugget,
        quantitePret: 0,
      },
      {
        friture: nuggets[1].nom,
        nombreNugget: nuggets[1].nombreNugget,
        quantitePret: 0,
      },
      {
        friture: nuggets[2].nom,
        nombreNugget: nuggets[2].nombreNugget,
        quantitePret: 0,
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
    },
  ]);

  const [commandeAPreparer, setCommandeAPreparer] = useState<ProduitEtMenu[][]>(
    []
  );

  return (
    <div id="page">
      <BureauManager />
      <CommandesAPreparerContext value={commandeAPreparer}>
        <CommandesAPreparerContextSetter value={setCommandeAPreparer}>
          <FritesContext value={frites}>
            <FritesContextSetter value={setFrites}>
              <NuggetsContext value={nuggetsStateContext}>
                <NuggetsContextSetter value={setNuggetsStateContext}>
                  <BurgersContext value={burgers}>
                    <BurgersContextSetter value={setBurgers}>
                      <Cuisine />
                      <Comptoir />
                    </BurgersContextSetter>
                  </BurgersContext>
                </NuggetsContextSetter>
              </NuggetsContext>
            </FritesContextSetter>
          </FritesContext>
        </CommandesAPreparerContextSetter>
      </CommandesAPreparerContext>
    </div>
  );
}

export default App;
