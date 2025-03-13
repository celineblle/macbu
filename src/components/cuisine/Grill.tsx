import React, { useState } from "react";
import "./Grill.css";
import { viande } from "../../elements/stocks";

function Grill() {
  const [toggleTabGrill, setToggleTabGrill] = useState<string>("cuisson");
  const [plaqueDeCuisson, setPlaqueDeCuisson] = useState<string[]>([]);

  function handleClickTabButtonGrill(element: string): void {
    setToggleTabGrill(element);
  }

  function handleClickFrigoToGrill(element: string): void {
    setPlaqueDeCuisson([...plaqueDeCuisson, element]);
  }

  return (
    <div id="grillComponent">
      <h2 id="buttonGrill">grill</h2>
      <div id="tabContentGrill">
        <div className="grillTabButton">
          <button
            className="tabLinksGrillButton"
            onClick={() => handleClickTabButtonGrill("cuisson")}
          >
            Cuisson
          </button>
          <button
            className="tabLinksGrillButton"
            onClick={() => handleClickTabButtonGrill("frigo")}
          >
            Frigo
          </button>
        </div>
        <div
          className={
            toggleTabGrill === "cuisson"
              ? "tabGrillContent"
              : "tabGrillContentHidden"
          }
          id="CuissonGrill"
        >
          <p>plaque de cuisson</p>
        </div>
        <div
         
          className={
            toggleTabGrill === "frigo"
              ? "tabGrillContent"
              : "tabGrillContentHidden"
          }
           id="frigoGrill"
        >
          
            {viande.map((element) => (
              <div  key={element}>
                <button onClick={() => handleClickFrigoToGrill(element)}>
                  {element}
                </button>
                <p>quantité : x</p>
              </div>
            ))}
          
        </div>
      </div>
      <div>
        <h3>Pret</h3>
        <ul>
          {viande.map((element) => (
            <li key={element}>{element} : X</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Grill;
