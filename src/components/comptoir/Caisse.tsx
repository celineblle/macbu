import { useContext } from "react";
import "./Caisse.css";
import { TailleEtPrixCommandeContext } from "../../CommandeContext";

function Caisse({ fondDeCaisse }: { fondDeCaisse: number }) {
  const tailleEtPrixCommande = useContext(TailleEtPrixCommandeContext);

  return (
    <div id="caisseComponent" className="component">
      <div id="headerFrontPageCaisse">
        <button className="buttonModal" disabled={false}>
          Caisse
        </button>
        <p>Budget : {fondDeCaisse} €</p>
      </div>
      <ul id="listeCommandePage">
        {tailleEtPrixCommande.map((tab: [number, number], index: number) => (
          <li key={index} className="commandeUniquePage">
            <p className="texteCommandeCaisse">
              Commande {index + 1} : {tab[1]} €
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Caisse;
