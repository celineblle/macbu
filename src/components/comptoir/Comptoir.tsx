import React from "react";
import "./Comptoir.css"
import Caisse from "./Caisse";
import ComptoirAssemblage from "./ComptoirAssemblage";
import Boisson from "./Boisson";
import Glace from "./Glace";

function Comptoir() {
  return (
    <div id="comptoirComponent">
      <div id="caisse">
      <Caisse />
      </div>
      <div id="comptoirAssemblage">
      <ComptoirAssemblage />
      </div>
      <div id="boisson">
      <Boisson />
      </div>
      <div id="glace">
      <Glace />
      </div>
    </div>
  );
}

export default Comptoir;
