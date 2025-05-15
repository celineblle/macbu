import { createContext } from "react";
import { ProduitEtMenu } from "./elements/burgers";

export const FritesContext = createContext<string[]>([]);

export const FritesContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<string[]>>
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

export const BurgersContext = createContext(["Vide"]);

export const BurgersContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<string[]>>
>(undefined);

export const CommandesAPreparerContext = createContext<ProduitEtMenu[][]>([]);

export const CommandesAPreparerContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<ProduitEtMenu[][]>>
>(undefined);
