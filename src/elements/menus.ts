import * as burgers from "./burgers";
import { taille, sac } from "./stocks";

function menu():(object[] | object)[] {
  const grandSandwichs: object[] = [];
  const moyenSandwichs: object[] = [];
  const petitSandwichs: object[] = [];
  const grandAccompagnement: object[] = [];
  const moyenAccompagnement: object[] = [];
  const petitAccompagnement: object[] = [];
  const grandeBoisson: object[] = [];
  const moyenneBoisson: object[] = [];
  const petiteBoisson: object[] = [];
  const allMenu: (object[] | object)[] = [];

  function tableauTaille(
    tabGrand: object[],
    tabMoyen: object[],
    tabPetit: object[],
    tabReference: (
      | burgers.Salade
      | burgers.Nugget
      | burgers.Burger
      | burgers.Accompagnement
      | burgers.Boisson
    )[]
  ) {
    for (let a = 0; a < tabReference.length; a++) {
      switch (tabReference[a].tailleProduit) {
        case taille[0]:
          tabGrand.push(tabReference[a]);
          break;
        case taille[1]:
          tabMoyen.push(tabReference[a]);
          break;
        case taille[2]:
          tabPetit.push(tabReference[a]);
          break;
      }
    }
  }

  tableauTaille(
    grandSandwichs,
    moyenSandwichs,
    petitSandwichs,
    burgers.sandwichs
  );
  tableauTaille(
    grandAccompagnement,
    moyenAccompagnement,
    petitAccompagnement,
    burgers.accompagnements
  );
  tableauTaille(grandeBoisson, moyenneBoisson, petiteBoisson, burgers.boissons);

  function composeMenu(
    tabSandwich: object[],
    tabAccompagnement: object[],
    tabBoisson: object[],
    taille: number
  ) {
    const tailleMenu = {taille: taille}
    allMenu.push(tabSandwich, tabAccompagnement, tabBoisson, tailleMenu)
  }

  composeMenu(grandSandwichs, grandAccompagnement, grandeBoisson, 9);
  composeMenu(moyenSandwichs, moyenAccompagnement, moyenneBoisson, 6);
  composeMenu(petitSandwichs, petitAccompagnement, petiteBoisson, 3);

  return allMenu;
}

export const menus: (object[] | object)[] = menu();

export interface MenuEnfant {
  emballage: string;
  taille: number;
}

function menuEnfant(): (MenuEnfant | burgers.Accompagnement[] | (burgers.Salade | burgers.Nugget | burgers.Burger)[])[]  {
  const petitSandwichs: (burgers.Salade | burgers.Nugget | burgers.Burger)[] = [];
  const petitAccompagnement: (burgers.Accompagnement)[] = [burgers.legume];
  const petiteBoisson: burgers.Boisson[] = [burgers.jusDefruit];
  const dessert: (burgers.Accompagnement | burgers.Glace)[] = [burgers.boissonYaourt, burgers.fruits];
  const allMenuEnfant = [];
  const constanteObjMenuEnfant: MenuEnfant= {
    emballage: sac[3],
    taille: 4,
  };

  for (let a = 0; a < burgers.sandwichs.length; a++) {
    if (burgers.sandwichs[a].tailleProduit === taille[2]) {
      petitSandwichs.push(burgers.sandwichs[a]);
    }
  }

  for (let b = 0; b < burgers.accompagnements.length; b++) {
    if (burgers.accompagnements[b].tailleProduit === taille[2]) {
      petitAccompagnement.push(burgers.accompagnements[b]);
    }
  }

  for (let c = 0; c < burgers.boissons.length; c++) {
    if (burgers.boissons[c].tailleProduit === taille[2]) {
      petiteBoisson.push(burgers.boissons[c]);
    }
  }

  for (let d = 0; d < burgers.glaces.length; d++) {
    if (burgers.glaces[d].tailleProduit === taille[2]) {
      dessert.push(burgers.glaces[d]);
    }
  }
  allMenuEnfant.push(petitSandwichs, petitAccompagnement, petiteBoisson, dessert, constanteObjMenuEnfant)


  return allMenuEnfant;
}

export const menusEnfant: (MenuEnfant | burgers.Accompagnement[] | (burgers.Salade | burgers.Nugget | burgers.Burger)[])[] = menuEnfant();
