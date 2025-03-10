import { Categorie } from "./categorie.model";
import { Image } from "./Image.model";

export class Produit {
  idProduit!: number;
  nomProduit!: string;
  prixProduit!: number;
  dateCreation!: Date;
  categorie!: Categorie;
  image!: Image;
  imageStr!: string

  images!: Image[];

}
