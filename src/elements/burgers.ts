import * as stocks from "./stocks";
import { Menu, MenuEnfant } from "./menus";

export interface Salade {
    nom: string,
    base: string,
    topping: string,
    feculent: string,
    fromage: string,
    sauce: string, 
    tailleProduit: string,
    type: string,
    sousType: string,
};

export const saladeCesar: Salade = {
    nom: "Salade César",
    base: stocks.ingredientSalade[0],
    topping: stocks.frituresCuisine[0],
    feculent: stocks.ingredientSalade[1],
    fromage: stocks.fromages[0],
    sauce: stocks.sauces[0], 
    tailleProduit: stocks.taille[0],
    type: "sandwich",
    sousType: "salade",
};

export const saladeItalienne: Salade = {
    nom: "Salade Italienne",
    base: stocks.ingredientSalade[0],
    topping: stocks.ingredientSalade[2],
    feculent: stocks.ingredientSalade[3],
    fromage: stocks.fromages[4],
    sauce: stocks.sauces[1],
    tailleProduit: stocks.taille[0],  
    type: "sandwich",
    sousType: "salade",
};

export interface Nugget {
    nom: string,
    ingredient: string,
    nombreNugget: number,
    tailleProduit: string,
    type: string,
    sousType: string,
};

function nugget (): Nugget[] {
    const noms = ["Boite de 18 nuggets", "Boite de 6 nuggets", "Boite de 3 nuggets"];
    const nombre = [18, 6, 3];
    const allNuggets = [];
    for(let i = 0; i < noms.length; i++){
            const unNugget: Nugget = {
                nom: noms[i],
                ingredient: stocks.frituresCuisine[0],
                nombreNugget: nombre[i],
                tailleProduit: stocks.taille[i], 
                type: "sandwich",
                sousType: "nugget",
            }
            
            allNuggets.push(unNugget);
        }
    return allNuggets;
};

export const nuggets: Nugget[] = nugget();

export interface Burger {
    nom: string,
    pain: string,
    viande: string,
    fromage?: string[],
    ingredient?: string[],
    sauce?: string[],
    tailleProduit: string,
    type: string,
    sousType: string,
}

export const fishNPan: Burger = {
    nom: "Fish N Pan",
    pain: stocks.pains[7],
    viande: stocks.frituresCuisine[2],
    fromage: [stocks.fromages[1]],
    ingredient: [stocks.ingredientBurger[0], stocks.ingredientBurger[1]],
    sauce: [stocks.sauces[2]],
    tailleProduit: stocks.taille[0],
    type: "sandwich",
    sousType: "burger",
};

export const specialBu: Burger = {
    nom: "Special Bu",
    pain: stocks.pains[0],
    viande: stocks.viande[2],
    fromage: [stocks.fromages[1]],
    ingredient: [stocks.ingredientBurger[2], stocks.ingredientBurger[0], stocks.ingredientBurger[3]],
    sauce: [stocks.sauces[3]],
    tailleProduit: stocks.taille[0],
    type: "sandwich",
    sousType: "burger",
};

export const classicBig: Burger = {
        nom: "Classic Big",
        pain: stocks.pains[1],
        viande: stocks.viande[4],
        fromage: [stocks.fromages[2]],
        ingredient: [stocks.ingredientBurger[1],  stocks.ingredientBurger[0], stocks.ingredientBurger[2]],
        sauce: [stocks.sauces[4]], 
        tailleProduit: stocks.taille[0],
        type: "sandwich",
        sousType: "burger",
};

function primSBu (): Burger[] {
    const viandes = [stocks.viande[5], stocks.frituresCuisine[2], stocks.viande[5]];
    const allPrimSBu = [];
    for(let i = 0; i < viandes.length; i++){
            const unPrimSBu: Burger = {
                nom: "Prim'S Bu",
                pain: stocks.pains[2],
                viande: viandes[i],
                fromage: [stocks.fromages[1]],
                ingredient: [stocks.ingredientBurger[1], stocks.ingredientBurger[0], stocks.ingredientBurger[2]],
                sauce: [stocks.sauces[5], stocks.sauces[6]],
                tailleProduit: stocks.taille[1],
                type: "sandwich",
                sousType: "burger",
            }
            
            allPrimSBu.push(unPrimSBu);
        }
    return allPrimSBu;
};

export const primSBus: Burger[] = primSBu();

export const optiBacon: Burger = {
    nom: "Opti Bacon",
    pain: stocks.pains[1],
    viande: stocks.viande[4],
    fromage: [stocks.fromages[1]],
    ingredient: [stocks.ingredientBurger[4], stocks.ingredientBurger[5], stocks.ingredientBurger[2]],
    sauce: [stocks.sauces[5], stocks.sauces[7]],
    tailleProduit: stocks.taille[0],
    type: "sandwich",
    sousType: "burger",
};

export const bigCheeseOrigin: Burger = {
    nom: "Big Cheese Origin",
    pain: stocks.pains[1],
    viande: stocks.viande[4],
    fromage: [stocks.fromages[1]],
    ingredient: [stocks.ingredientBurger[5], stocks.ingredientBurger[2]],
    sauce: [stocks.sauces[5], stocks.sauces[7]],
    tailleProduit: stocks.taille[0],
    type: "sandwich",
    sousType: "burger",
}

export const italicain: Burger = {
    nom: "Italicain",
    pain: stocks.pains[3],
    viande: stocks.viande[4],
    fromage: [stocks.fromages[3], stocks.fromages[2]],
    ingredient: [stocks.ingredientBurger[1]],
    sauce: [stocks.sauces[2]],
    tailleProduit: stocks.taille[0],
    type: "sandwich",
    sousType: "burger",
};

export const baconBasic: Burger = {
    nom: "Bacon Basic",
    pain: stocks.pains[4],
    viande: stocks.frituresCuisine[4],
    fromage: [stocks.fromages[1]],
    ingredient: [stocks.ingredientBurger[0], stocks.ingredientBurger[4], stocks.ingredientBurger[6]],
    sauce: [stocks.sauces[2]],
    tailleProduit: stocks.taille[0],
    type: "sandwich",
    sousType: "burger",
};

export const englishTouch: Burger = {
    nom: "English Touch",
    pain: stocks.pains[5],
    viande: stocks.viande[1],
    fromage: [stocks.fromages[1]],
    tailleProduit: stocks.taille[2],
    type: "sandwich",
    sousType: "burger",
};

export const cheeseOrigin: Burger = {
    nom: "Cheese Origin",
    pain: stocks.pains[6],
    viande: stocks.viande[3],
    fromage: [stocks.fromages[1]],
    ingredient: [stocks.ingredientBurger[2], stocks.ingredientBurger[5]],
    sauce: [stocks.sauces[5], stocks.sauces[7]],
    tailleProduit: stocks.taille[2],
    type: "sandwich",
    sousType: "burger",
};

export const originBurger: Burger = {
    nom: "Origin Burger",
    pain: stocks.pains[6],
    viande: stocks.viande[3],
    ingredient: [stocks.ingredientBurger[2], stocks.ingredientBurger[5]],
    sauce: [stocks.sauces[5], stocks.sauces[7]],
    tailleProduit: stocks.taille[2],
    type: "sandwich",
    sousType: "burger",
};

export const pouce: Burger = {
    nom: "Pouce",
    pain: stocks.pains[6],
    viande: stocks.viande[0],
    fromage: [stocks.fromages[2]],
    tailleProduit: stocks.taille[2],
    type: "sandwich",
    sousType: "burger",
};

export const goatyWrap: Burger = {
    nom: "Goaty Wrap",
    pain: stocks.pains[8],
    viande: stocks.frituresCuisine[6],
    ingredient: [stocks.ingredientBurger[0],  stocks.ingredientBurger[1], stocks.ingredientBurger[6]],
    sauce: [stocks.sauces[2]],
    tailleProduit: stocks.taille[0],
    type: "sandwich",
    sousType: "wrap",
};

export const classyWrap: Burger = {
    nom: "Classy Wrap",
    pain: stocks.pains[8],
    viande: stocks.frituresCuisine[0],
    fromage: [stocks.fromages[1]],
    ingredient: [stocks.ingredientBurger[4], stocks.ingredientBurger[1], stocks.ingredientBurger[0]],
    sauce: [stocks.sauces[2]],
    tailleProduit: stocks.taille[0],
    type: "sandwich",
    sousType: "wrap",
};

export interface GlaceType{
    nom: string,
    base: string,
    topping?: string | null,
    coulis?: string | null,
    tailleProduit: string,
    type: string,
    sousType: string,
};

function glace (): GlaceType[] {
    const toppings = [stocks.glaceToppings[2], stocks.glaceToppings[3], stocks.glaceToppings[4], stocks.glaceToppings[5]];
    const coulis = [stocks.glaceToppings[0], stocks.glaceToppings[1]];
    const allGlace = [];
    for(let i = 0; i < toppings.length; i++){
        for(let j= 0; j < coulis.length; j++){
              const unGlace: GlaceType = {
                nom: "Glace",
                base: "Glace au lait",
                topping: toppings[i],
                coulis: coulis[j],
                tailleProduit: stocks.taille[2],
                type: "dessert",
                sousType: "glace",
            };
            allGlace.push(unGlace);
        }
    }
    return allGlace;
};

export const glaces: GlaceType[] = glace();


export interface Accompagnement {
    nom: string,
    complement: string,
    tailleProduit: string,
    type: string,
    sousType: string,
};

 function accompagnement (): Accompagnement[] {
    const noms = ["Frite", "Potatoe"];
    const bases = [stocks.frite[0], stocks.frite[1]];
    const allAccompagnements = [];
    for(let i = 0; i < noms.length; i++){
        for(let j= 0; j < stocks.taille.length; j++){
            const unAccompagnement: Accompagnement = {
                nom: noms[i],
                complement: bases[i],
                tailleProduit: stocks.taille[j],
                type: "accompagnement",
                sousType: "frite",
            };
            allAccompagnements.push(unAccompagnement);
        }
    }
    return allAccompagnements;
};

export const accompagnements: Accompagnement[] = accompagnement();

export const salade: Accompagnement = {
    nom: stocks.frais[0],
    complement: stocks.frais[0],
    tailleProduit: stocks.taille[2],
    type: "accompagnement",
    sousType: "salade",
}

export const legume: Accompagnement = {
    nom: "Légumes",
    complement: stocks.frais[1],
    tailleProduit: stocks.taille[2],
    type: "accompagnement",
    sousType: "enfant",
}

export const boissonYaourt: Accompagnement = {
    nom: "Boisson yaourt",
    complement: stocks.frais[3],
    tailleProduit: stocks.taille[2],
    type: "dessert",
    sousType: "enfant",
}

export const fruits: Accompagnement = {
    nom: "Fruits",
    complement: stocks.frais[4],
    tailleProduit: stocks.taille[2],
    type: "dessert",
    sousType: "enfant",
}

export interface Boisson {
    nom: string,
    saveur: string,
    tailleProduit: string,
    type: string,
    sousType: string,
};

function boisson (): Boisson[] {
    const noms = [stocks.boisson[0], stocks.boisson[1], stocks.boisson[2],stocks.boisson[3], stocks.boisson[4], stocks.boisson[5], stocks.boisson[6], stocks.boisson[7]];
    const bases = [stocks.boisson[0], stocks.boisson[1], stocks.boisson[2],stocks.boisson[3], stocks.boisson[4], stocks.boisson[5], stocks.boisson[6], stocks.boisson[7]];
    const allBoisson = [];
    for(let i = 0; i < noms.length; i++){
        for(let j= 0; j < stocks.taille.length; j++){
            const uneBoisson: Boisson = {
                nom: noms[i],
                saveur: bases[i],
                tailleProduit: stocks.taille[j],
                type: "boisson",
                sousType: "cannette",
            };
            allBoisson.push(uneBoisson);
        }
    }
    return allBoisson;
};

export const boissons: Boisson[] = boisson();

export const jusDefruit: Boisson = {
    nom: "Jus de Fruit",
    saveur: stocks.frais[2],
    tailleProduit: stocks.taille[2],
    type: "boisson",
    sousType: "enfant",
}

accompagnements.push(salade)
accompagnements.push(legume)

export const sandwichs: (Salade | Nugget | Burger)[] = [saladeCesar, saladeItalienne, nuggets[0], nuggets[1], nuggets[2], fishNPan, specialBu, classicBig, optiBacon, bigCheeseOrigin, italicain, baconBasic, goatyWrap, classyWrap, primSBus[0], primSBus[1], primSBus[2], englishTouch, cheeseOrigin, originBurger, pouce]

export const burgers: Burger[] = [fishNPan, specialBu, classicBig, optiBacon, bigCheeseOrigin, italicain, baconBasic, primSBus[0], primSBus[1], primSBus[2], englishTouch, cheeseOrigin, originBurger, pouce]

function getOnlyAdultAccompagnement(): Accompagnement[] {

    const accompagnementTriee: Accompagnement[] = [];

    for(let i = 0; i < accompagnements.length; i++) {
        if(accompagnements[i].tailleProduit !== stocks.taille[2]) {
            accompagnementTriee.push(accompagnements[i])
        }
    }
    accompagnementTriee.push(salade)
    return accompagnementTriee;
}

export const adultAccompagnement: Accompagnement[] = getOnlyAdultAccompagnement()

export const enfantDessert: (GlaceType | Accompagnement)[] = glaces.slice()
enfantDessert.push(boissonYaourt, fruits)

export const allProduits: (Salade | Nugget | Burger | GlaceType | Accompagnement | Boisson)[] = [ ...sandwichs, ...burgers, ...burgers, ...glaces, ...accompagnements, ...accompagnements, ...boissons]

export type Produit = Salade | Nugget | Burger | GlaceType | Accompagnement | Boisson;
export type ProduitEtMenu = Produit | Menu | MenuEnfant;
