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
} from "./CommandeContext";

function App() {
  const [frites, setFrites] = useState<string[]>([]);
  const [nuggets, setNuggets] = useState<NuggetContextType>({
    boite18: 0,
    boite6: 0,
    boite3: 0,
  });
  const [burgers, setBurgers] = useState<string[]>(["Vide"]);

  return (
    <div id="page">
      <BureauManager />
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
    </div>
  );
}

export default App;
