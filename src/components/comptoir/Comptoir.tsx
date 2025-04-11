import React from "react";
import "./Comptoir.css"
import Caisse from "./Caisse";
import ComptoirAssemblage from "./ComptoirAssemblage";
import PosteBoisson from "./Boisson";
import Glace from "./Glace";

function Comptoir() {
  return (
    <div id="comptoirComponent">
      <Caisse />
      <ComptoirAssemblage />
      <PosteBoisson />
      <Glace />
    </div>
  );
}

export default Comptoir;
