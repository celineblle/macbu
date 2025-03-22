import * as burgers from "./burgers";
import { taille, sac } from "./stocks";

export interface Menu {
  sandwich: object;
  accompagnement: object;
  boisson: object;
  taille: number;
}

function menu(): Menu[] {
  const grandSandwichs: object[] = [];
  const moyenSandwichs: object[] = [];
  const petitSandwichs: object[] = [];
  const grandAccompagnement: object[] = [];
  const moyenAccompagnement: object[] = [];
  const petitAccompagnement: object[] = [];
  const grandeBoisson: object[] = [];
  const moyenneBoisson: object[] = [];
  const petiteBoisson: object[] = [];
  const allMenu: Menu[] = [];

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
    for (let i = 0; i < tabSandwich.length; i++) {
      for (let j = 0; j < tabAccompagnement.length; j++) {
        for (let k = 0; k < tabBoisson.length; k++) {
          const unMenu: Menu = {
            sandwich: tabSandwich[i],
            accompagnement: tabAccompagnement[j],
            boisson: tabBoisson[k],
            taille: taille,
          };
          allMenu.push(unMenu);
        }
      }
    }
  }

  composeMenu(grandSandwichs, grandAccompagnement, grandeBoisson, 9);
  composeMenu(moyenSandwichs, moyenAccompagnement, moyenneBoisson, 6);
  composeMenu(petitSandwichs, petitAccompagnement, petiteBoisson, 3);

  return allMenu;
}

export const menus: Menu[] = menu();

export interface MenuEnfant {
  sandwich: object;
  accompagnement: object;
  boisson: object;
  dessert: object;
  emballage: string;
  taille: number;
}

function menuEnfant(): MenuEnfant[] {
  const petitSandwichs = [];
  const petitAccompagnement = [burgers.legume];
  const petiteBoisson = [burgers.jusDefruit];
  const dessert = [burgers.boissonYaourt, burgers.fruits];
  const allMenuEnfant = [];

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

  for (let i = 0; i < petitSandwichs.length; i++) {
    for (let j = 0; j < petitAccompagnement.length; j++) {
      for (let k = 0; k < petiteBoisson.length; k++) {
        for (let l = 0; l < dessert.length; l++) {
          const unMenuEnfant: MenuEnfant = {
            sandwich: petitSandwichs[i],
            accompagnement: petitAccompagnement[j],
            boisson: petiteBoisson[k],
            dessert: dessert[l],
            emballage: sac[3],
            taille: 4,
          };
          allMenuEnfant.push(unMenuEnfant);
        }
      }
    }
  }
  return allMenuEnfant;
}

export const menusEnfant: MenuEnfant[] = menuEnfant();
