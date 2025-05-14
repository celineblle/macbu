import React, { useState, useRef, useEffect } from "react";
import "./Comptoir.css";
import Caisse from "./Caisse";
import ComptoirAssemblage from "./ComptoirAssemblage";
import PosteBoisson from "./Boisson";
import Glace from "./Glace";

function Comptoir() {
  const [glacesCommande, setGlacesCommande] = useState<string[]>(["Vide"]);
  const glacesCommandeRef = useRef<string[]>(glacesCommande);

  useEffect(() => {
    glacesCommandeRef.current = glacesCommande;
  }, [glacesCommande]);

  const [fontainePret, setFontainePret] = useState<string[]>([]);
  const fontainePretRef = useRef<string[]>([]);

  useEffect(() => {
    fontainePretRef.current = fontainePret;
  }, [fontainePret]);

  return (
    <div id="comptoirComponent">
      <Caisse />
      <ComptoirAssemblage
        glacesCommande={glacesCommande}
        fontainePret={fontainePret}
      />
      <PosteBoisson
        fontainePret={fontainePret}
        setFontainePret={setFontainePret}
        fontainePretRef={fontainePretRef}
      />
      <Glace
        setGlacesCommande={setGlacesCommande}
        glacesCommandeRef={glacesCommandeRef}
      />
    </div>
  );
}

export default Comptoir;
