import { frituresCuisine } from "./stocks";

export interface Friture {
    friture: string,
    quantiteSachet: number
}

export const frituresCuisineQuantite: Friture[] = [
    {
        friture: frituresCuisine[0],
        quantiteSachet: 20
    },
    {
        friture: frituresCuisine[1],
        quantiteSachet: 20
    },
    {
        friture: frituresCuisine[2],
        quantiteSachet: 10
    },
    {
        friture: frituresCuisine[3],
        quantiteSachet: 15
    },
    {
        friture: frituresCuisine[4],
        quantiteSachet: 10
    }
]