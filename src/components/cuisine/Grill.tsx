import React, { useState } from "react";
import "./Grill.css"
import {viande} from "../../elements/stocks"

function Grill () {
    const [toggleTabGrill, setToggleTabGrill] = useState<string>("cuisson");

    function handleClickTabButtonGrill(element: string): void {
        setToggleTabGrill(element);
    }

    return ( <div id="grillComponent">
        <h2 id="buttonGrill">grill</h2>
        <div>
            <div className="grillTabButton">
            <button className="tabLinksGrillButton" onClick={() => handleClickTabButtonGrill("cuisson")}>Cuisson</button>
            <button className="tabLinksGrillButton" onClick={() => handleClickTabButtonGrill("frigo")}>Frigo</button>
            </div>
            <div className={toggleTabGrill === "cuisson" ? "tabGrillContent" : "tabGrillContentHidden"} id="CuissonGrill">
                <p>plaque de cuisson</p>
            </div>
            <div id="frigoGrill" className={toggleTabGrill === "frigo" ? "tabGrillContent" : "tabGrillContentHidden"}>
                <p>frigo grill</p>
            </div>
        </div>
       <div>
        <h3>Pret</h3>
        <ul>
            {viande.map((element) => (
                <li key={element}>{element} : X</li>
            )
                
            )}
        </ul>
       </div>
        </div>)
}

export default Grill;