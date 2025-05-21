import * as burgers from "./burgers";
import { taille } from "./stocks";

export interface Menu {
  sandwich: burgers.Salade | burgers.Nugget | burgers.Burger;
  accompagnement: burgers.Accompagnement;
  boisson: burgers.Boisson;
  taille: number;
}

function getElementByTab(
  refTab: (
    | (burgers.Salade | burgers.Nugget | burgers.Burger)
    | burgers.Accompagnement
    | burgers.Boisson
  )[],
  currentTab: (
    | (burgers.Salade | burgers.Nugget | burgers.Burger)
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
  sandwich: burgers.Salade | burgers.Nugget | burgers.Burger;
  accompagnement: burgers.Accompagnement;
  boisson: burgers.Boisson;
  dessert: burgers.GlaceType | burgers.Accompagnement;
  taille: number;
}

export function getMenuEnfant() {
  const sandwich: (burgers.Nugget | burgers.Burger)[] = [];
  const accompagnement: burgers.Accompagnement[] = [];
  const boisson: burgers.Boisson[] = [];
  const allTabMenu: (
    | ( burgers.Nugget | burgers.Burger)[]
    | burgers.Accompagnement[]
    | burgers.Boisson[] | (burgers.Accompagnement | burgers.GlaceType)[]
  )[] = [];

  getElementByTab(burgers.sandwichs, sandwich, taille[2]);
  getElementByTab(burgers.accompagnements, accompagnement, taille[2]);
  getElementByTab(burgers.boissons, boisson, taille[2]);

  allTabMenu.push(sandwich, accompagnement, boisson, burgers.enfantDessert);
  return allTabMenu;
}

export const menuEnfant: ( ( burgers.Nugget | burgers.Burger)[] | burgers.Accompagnement[] | burgers.Boisson[] | (burgers.Accompagnement | burgers.GlaceType)[]
)[] = getMenuEnfant();
