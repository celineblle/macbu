import React, { useState, useRef, useEffect, useContext } from "react";
import "./Comptoir.css";
import Caisse from "./Caisse";
import ComptoirAssemblage from "./ComptoirAssemblage";
import PosteBoisson from "./Boisson";
import Glace from "./Glace";
import { ProduitEtMenu } from "../../elements/burgers";
import { affichageCommande, randomCommande } from "./gestionCommandes";
import {
  CommandesAPreparerContext,
  CommandesAPreparerContextSetter,
} from "../../CommandeContext";

function Comptoir() {
  const commandeAPreparer = useContext(CommandesAPreparerContext);
  const setCommandeAPreparer = useContext(CommandesAPreparerContextSetter);

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

  const [aPreparerAffichage, setAPreparerAffichage] = useState<
    (string | string[])[][]
  >([]);
  const aPreparerAffichageRef = useRef<(string | string[])[][]>([]);

  useEffect(() => {
    aPreparerAffichageRef.current = aPreparerAffichage;
  }, [aPreparerAffichage]);

  const aPreparerRef = useRef<ProduitEtMenu[][]>([]);

  const tailleAPreparer: number = 20;

  const [timeAPreparer, setTimeAPreparer] = useState<number[]>([]);

  const timeAPreparerRef = useRef<number[]>([]);

  useEffect(() => {
    aPreparerRef.current = commandeAPreparer;
  }, [commandeAPreparer]);

  useEffect(() => {
    timeAPreparerRef.current = timeAPreparer;
  }, [timeAPreparer]);

  useEffect(() => {
    if (aPreparerRef.current.length + 1 < tailleAPreparer) {
      const currentTimeOut: number = setTimeout(() => {
        const newCommande: ProduitEtMenu[] = randomCommande();
        if (setCommandeAPreparer !== undefined) {
          setCommandeAPreparer([...aPreparerRef.current, newCommande]);
        }
        const visuelCommande: (string | string[])[] =
          affichageCommande(newCommande);
        setAPreparerAffichage([
          ...aPreparerAffichageRef.current,
          visuelCommande,
        ]);
      }, 6000);
      setTimeAPreparer([...timeAPreparerRef.current, currentTimeOut]);
    }
  }, [commandeAPreparer]);

  console.log("allCOmm", commandeAPreparer);
  return (
    <div id="comptoirComponent">
      <Caisse aPreparerAffichage={aPreparerAffichage} />
      <ComptoirAssemblage
        glacesCommande={glacesCommande}
        fontainePret={fontainePret}
        aPreparerAffichage={aPreparerAffichage}
        aPreparerRef={aPreparerRef}
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
