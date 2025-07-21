import { createContext } from "react";
import { ProduitEtMenu } from "./elements/burgers";

export const CommandesAPreparerContext = createContext<ProduitEtMenu[][]>([]);

export const CommandesAPreparerContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<ProduitEtMenu[][]>>
>(undefined);

export const TailleEtPrixCommandeContext = createContext<[number, number][]>(
  []
);

export const TailleEtPrixCommandeContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<[number, number][]>>
>(undefined);
