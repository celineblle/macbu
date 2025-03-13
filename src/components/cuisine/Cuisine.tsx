import React from "react";
import "./Cuisine.css";
import PosteAssemblage from "./PosteAssemblage";
import Friteuse from "./Friteuse";
import FriteuseNugget from "./FriteuseNugget";
import Grill from "./Grill";

function Cuisine(): JSX.Element {
  return (
    <div id="cuisineComponent" >
      <div id="lesFriteuses">
      <div id="friteuse">
      <Friteuse />
      </div>
      <div id="friteuseNugget">
      <FriteuseNugget />
      </div>
      </div>
      <div id="posteAssemblage">
      <PosteAssemblage />
      </div>
      <div id="grill">
      <Grill />
      </div>
    </div>
  );
}

export default Cuisine;
