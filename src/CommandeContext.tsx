import { createContext } from "react";
import {
  ProduitEtMenu,
  Burger,
  Accompagnement,
  nuggets,
} from "./elements/burgers";

export const FritesContext = createContext<Accompagnement[]>([
  {
    nom: "Vide",
    complement: "Vide",
    tailleProduit: "Vide",
    type: "Vide",
    sousType: "Vide",
  },
]);

export const FritesContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<Accompagnement[]>>
>(undefined);

export interface BoiteNugget {
  friture: string;
  nombreNugget: number;
  quantitePret: number;
}

export const NuggetsContext = createContext<BoiteNugget[]>([
  {
    friture: nuggets[0].nom,
    nombreNugget: nuggets[0].nombreNugget,
    quantitePret: 0,
  },
  {
    friture: nuggets[1].nom,
    nombreNugget: nuggets[1].nombreNugget,
    quantitePret: 0,
  },
  {
    friture: nuggets[2].nom,
    nombreNugget: nuggets[2].nombreNugget,
    quantitePret: 0,
  },
]);

export const NuggetsContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<BoiteNugget[]>>
>(undefined);

export const BurgersContext = createContext<Burger[]>([
  {
    nom: "Vide",
    pain: "Vide",
    viande: "Vide",
    tailleProduit: "Vide",
    type: "Vide",
    sousType: "Vide",
  },
]);

export const BurgersContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<Burger[]>>
>(undefined);

export const CommandesAPreparerContext = createContext<ProduitEtMenu[][]>([]);

export const CommandesAPreparerContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<ProduitEtMenu[][]>>
>(undefined);
