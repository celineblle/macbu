import React, { useState, useRef, useEffect, useContext } from "react";
import "./Comptoir.css";
import Caisse from "./Caisse";
import ComptoirAssemblage from "./ComptoirAssemblage";
import PosteBoisson from "./Boisson";
import Glace from "./Glace";
import { Boisson, GlaceType, ProduitEtMenu } from "../../elements/burgers";
import { affichageCommande, randomCommande } from "./gestionCommandes";
import {
  CommandesAPreparerContext,
  CommandesAPreparerContextSetter,
} from "../../CommandeContext";

function Comptoir() {
  const commandeAPreparer = useContext(CommandesAPreparerContext);
  const setCommandeAPreparer = useContext(CommandesAPreparerContextSetter);

  const [glacesCommande, setGlacesCommande] = useState<GlaceType[]>([
    {
      nom: "Glace",
      base: "Glace au lait",
      topping: "Aucun",
      coulis: " ",
      tailleProduit: "initial",
      type: "dessert",
      sousType: "glace",
    },
  ]);
  const [timeOutPretPosteGlaceId, setTimeOutPretPosteGlaceId] = useState<
    number[]
  >([]);
  const glacesCommandeRef = useRef<GlaceType[]>(glacesCommande);
  const timeOutPretPosteGlaceRef = useRef<number[]>([]);

  useEffect(() => {
    glacesCommandeRef.current = glacesCommande;
  }, [glacesCommande]);
  useEffect(() => {
    timeOutPretPosteGlaceRef.current = timeOutPretPosteGlaceId;
  }, [timeOutPretPosteGlaceId]);

  const [fontainePret, setFontainePret] = useState<Boisson[]>([]);
  const fontainePretRef = useRef<Boisson[]>([]);

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

  return (
    <div id="comptoirComponent">
      <Caisse aPreparerAffichage={aPreparerAffichage} />
      <ComptoirAssemblage
        glacesCommande={glacesCommande}
        setGlacesCommande={setGlacesCommande}
        glacesCommandeRef={glacesCommandeRef}
        fontainePret={fontainePret}
        setFontainePret={setFontainePret}
        aPreparerAffichage={aPreparerAffichage}
        aPreparerRef={aPreparerRef}
        timeOutPretPosteGlaceRef={timeOutPretPosteGlaceRef}
      />
      <PosteBoisson
        fontainePret={fontainePret}
        setFontainePret={setFontainePret}
        fontainePretRef={fontainePretRef}
      />
      <Glace
        glacesCommande={glacesCommande}
        setGlacesCommande={setGlacesCommande}
        glacesCommandeRef={glacesCommandeRef}
        setTimeOutPretPosteGlaceId={setTimeOutPretPosteGlaceId}
        timeOutPretPosteGlaceRef={timeOutPretPosteGlaceRef}
      />
    </div>
  );
}

export default Comptoir;
