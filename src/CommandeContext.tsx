import { createContext } from "react";
import { ProduitEtMenu, Burger, Accompagnement } from "./elements/burgers";

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

export type NuggetContextType = {
  boite18: number;
  boite6: number;
  boite3: number;
};

export const NuggetsContext = createContext<NuggetContextType>({
  boite18: 0,
  boite6: 0,
  boite3: 0,
});

export const NuggetsContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<NuggetContextType>>
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
