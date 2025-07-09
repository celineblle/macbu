import * as burgers from "./burgers";
import { taille } from "./stocks";

export interface Menu {
  sandwich: burgers.Nugget | burgers.Burger;
  accompagnement: burgers.Accompagnement;
  boisson: burgers.Boisson;
  taille: number;
  prix: number;
}

function getElementByTab(
  refTab: (
    | ( burgers.Nugget | burgers.Burger)
    | burgers.Accompagnement
    | burgers.Boisson
  )[],
  currentTab: (
    | ( burgers.Nugget | burgers.Burger)
    | burgers.Accompagnement
    | burgers.Boisson
  )[],
  taille: string
): void {
  for (let i = 0; i < refTab.length; i++) {
    if (refTab[i].tailleProduit === taille) {
      currentTab.push(refTab[i]);
    }
  }
}

export interface MenuEnfant {
  sandwich: burgers.Nugget | burgers.Burger;
  accompagnement: burgers.Accompagnement;
  boisson: burgers.Boisson;
  dessert: burgers.GlaceType | burgers.Accompagnement;
  taille: number;
  prix: number;
}

export function getMenuEnfant() {
  const sandwich: (burgers.Nugget | burgers.Burger)[] = [];
  const accompagnement: burgers.Accompagnement[] = [];
  const boisson: burgers.Boisson[] = [];

  getElementByTab(burgers.sandwichs, sandwich, taille[2]);
  getElementByTab(burgers.accompagnements, accompagnement, taille[2]);
  getElementByTab(burgers.boissons, boisson, taille[2]);

  const allTabMenu: [( burgers.Nugget | burgers.Burger)[], burgers.Accompagnement[], burgers.Boisson[], (burgers.Accompagnement | burgers.GlaceType)[]] = [sandwich, accompagnement, boisson, burgers.enfantDessert];

  return allTabMenu;
}

export const menuEnfant: [( burgers.Nugget | burgers.Burger)[], burgers.Accompagnement[], burgers.Boisson[], (burgers.Accompagnement | burgers.GlaceType)[]] = getMenuEnfant();

export const prixMenu = [[9, 16], [6, 13], [4, 5]]