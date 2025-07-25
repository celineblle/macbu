export const  pains: string[] = ["Pain sésame 3 tranches", "Grand pain sésame", "Moyen pain sésame", "Pain carré ciabatta", "Pain carré bacon", "Pain muffin", "Petit pain bun", "Moyen pain bun", "Galette wrap"];

export const frituresCuisine: string[] = ["Nugget poulet", "Petit poisson pané", "Grand poisson pané", "Petit steak poulet pané", "Grand steak poulet pané", "Palet chêvre"];

export const sauces: string[] = [ "Tartare", "Spécial Bu", "Abricot", "Ketchup", "Ranch", "Moutarde"];

export const fromages: string[] = [ "Cheddar", "Emmental", "Mozza burger"];

export const viande: string[] = ["Jambon", "Oeuf", "Grand steak plat", "Petit steak plat", "Grand gros steak", "Moyen gros steak"];

export const ingredientBurger: string[] = ["Salade", "Tomates", "Oignons", "Pickles", "Bacon", "Cornichons", "Oignon frit"];

export const frais: string[] = ["Petite salade", "Légumes", "Jus de fruit", "Boisson yaourt", "Fruits"];

export const glaceToppings: string[] = [ "Coulis caramel", "Coulis chocolat", "Eclats cacahuète", "Eclats choco-caramel", "Eclat biscuit-chocolat", "Eclat cacahuète-chocolat"];

export const frite: string[] = ["Frite", "Potatoe"];

export const boisson: string[] = ["Eau", "Eau gazeuse", "Limonade", "Cola", "Orange gazeuse", "Jus d'orange", "Jus multifruit", "Thé glacé"];

export const taille: string[] = ["Grand", "Moyen", "Petit"];

export const sac: [string, number][] = [["Grand sac", 12], ["Sac moyen", 6], ["Petit sac", 3]];

export const grandProduitBurger: string[] = [pains[0], pains[1], pains[3], pains[4], viande[2], viande[4], frituresCuisine[4]];

export const moyenProduitBurger: string[] = [pains[2], pains[7], viande[5], frituresCuisine[2]];

export const petitProduitBurger: string[] = [pains[5], pains[6], viande[0], viande[1], viande[3]];

export const tailleProduitBurger: (string[])[] = [grandProduitBurger, moyenProduitBurger, petitProduitBurger];
