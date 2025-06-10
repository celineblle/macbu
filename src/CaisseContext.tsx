import { createContext } from "react";

export const FondDeCaisseContext = createContext<number>(0);

export const FondDeCaisseContextSetter = createContext<
  undefined | React.Dispatch<React.SetStateAction<number>>
>(undefined);
