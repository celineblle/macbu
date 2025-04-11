import React from "react";
import "./Cuisine.css";
import PosteAssemblage from "./PosteAssemblage";
import Friteuse from "./Friteuse";
import FriteuseNugget from "./FriteuseNugget";
import Grill from "./Grill";

function Cuisine() {
  return (
    <div id="cuisineComponent" >
      <div id="lesFriteuses">
      <Friteuse />
      <FriteuseNugget />
      </div>
      <PosteAssemblage />
      <Grill />
    </div>
  );
}

export default Cuisine;
