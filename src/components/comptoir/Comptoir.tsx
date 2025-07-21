import React, { useState, useRef, useEffect, useContext } from "react";
import "./Comptoir.css";
import Caisse from "./Caisse";
import ComptoirAssemblage from "./ComptoirAssemblage";
import PosteBoisson from "./Boisson";
import Glace from "./Glace";
import {
  Accompagnement,
  Boisson,
  BoiteNugget,
  Burger,
  GlaceType,
  ProduitEtMenu,
} from "../../elements/burgers";
import { affichageCommande, randomCommande } from "./gestionCommandes";
import {
  CommandesAPreparerContext,
  CommandesAPreparerContextSetter,
} from "../../CommandeContext";
import { StocksActuelsType } from "../../StocksActuels";

function Comptoir({
  stocksComptoir,
  setStocksComptoir,
  fondDeCaisse,
  setFondDeCaisse,
  fritesDispo,
  setFritesDispo,
  nuggetsGlobal,
  setNuggetsGlobal,
  burgerDispo,
  setBurgerDispo,
}: {
  stocksComptoir: StocksActuelsType[];
  setStocksComptoir: React.Dispatch<React.SetStateAction<StocksActuelsType[]>>;
  fondDeCaisse: number;
  setFondDeCaisse: React.Dispatch<React.SetStateAction<number>>;
  fritesDispo: Accompagnement[];
  setFritesDispo: React.Dispatch<React.SetStateAction<Accompagnement[]>>;
  nuggetsGlobal: BoiteNugget[];
  setNuggetsGlobal: React.Dispatch<React.SetStateAction<BoiteNugget[]>>;
  burgerDispo: Burger[];
  setBurgerDispo: React.Dispatch<React.SetStateAction<Burger[]>>;
}) {
  const commandeAPreparer = useContext(CommandesAPreparerContext);
  const setCommandeAPreparer = useContext(CommandesAPreparerContextSetter);

  const [glacesCommande, setGlacesCommande] = useState<GlaceType[]>([
    {
      nom: "Glace",
      base: "Glace au lait",
      topping: "",
      coulis: "Vide",
      tailleProduit: "initial",
      temps: 0,
      timeId: 0,
      type: "dessert",
      sousType: "glace",
      prix: 0,
    },
  ]);
  const glacesCommandeRef = useRef<GlaceType[]>(glacesCommande);
  const [posteGlaceFondue, setPosteGlaceFondue] = useState<GlaceType[]>([]);
  const posteGlaceFondueRef = useRef<GlaceType[]>([]);

  useEffect(() => {
    glacesCommandeRef.current = glacesCommande;
  }, [glacesCommande]);
  useEffect(() => {
    posteGlaceFondueRef.current = posteGlaceFondue;
  }, [posteGlaceFondue]);

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
      <Caisse fondDeCaisse={fondDeCaisse} />
      <ComptoirAssemblage
        glacesCommande={glacesCommande}
        setGlacesCommande={setGlacesCommande}
        glacesCommandeRef={glacesCommandeRef}
        fontainePret={fontainePret}
        setFontainePret={setFontainePret}
        aPreparerAffichage={aPreparerAffichageRef.current}
        setAPreparerAffichage={setAPreparerAffichage}
        aPreparerRef={aPreparerRef}
        setPosteGlaceFondue={setPosteGlaceFondue}
        posteGlaceFondueRef={posteGlaceFondueRef}
        stocksComptoir={stocksComptoir}
        setStocksComptoir={setStocksComptoir}
        fondDeCaisse={fondDeCaisse}
        setFondDeCaisse={setFondDeCaisse}
        fritesDispo={fritesDispo}
        setFritesDispo={setFritesDispo}
        nuggetsGlobal={nuggetsGlobal}
        setNuggetsGlobal={setNuggetsGlobal}
        burgerDispo={burgerDispo}
        setBurgerDispo={setBurgerDispo}
      />
      <PosteBoisson
        fontainePret={fontainePret}
        setFontainePret={setFontainePret}
        fontainePretRef={fontainePretRef}
        stocksComptoir={stocksComptoir}
        setStocksComptoir={setStocksComptoir}
      />
      <Glace
        glacesCommande={glacesCommande}
        setGlacesCommande={setGlacesCommande}
        glacesCommandeRef={glacesCommandeRef}
        setPosteGlaceFondue={setPosteGlaceFondue}
        posteGlaceFondueRef={posteGlaceFondueRef}
        posteGlaceFondue={posteGlaceFondue}
        stocksComptoir={stocksComptoir}
        setStocksComptoir={setStocksComptoir}
      />
    </div>
  );
}

export default Comptoir;
