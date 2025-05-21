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
  NuggetContextType,
  BurgersContext,
  BurgersContextSetter,
  CommandesAPreparerContext,
  CommandesAPreparerContextSetter,
} from "./CommandeContext";
import { Accompagnement, Burger, ProduitEtMenu } from "./elements/burgers";

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
  const [nuggets, setNuggets] = useState<NuggetContextType>({
    boite18: 0,
    boite6: 0,
    boite3: 0,
  });
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
              <NuggetsContext value={nuggets}>
                <NuggetsContextSetter value={setNuggets}>
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
