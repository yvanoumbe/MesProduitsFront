import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/categorie.model';
import { log } from 'console';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: ``
})
export class ListeCategoriesComponent implements OnInit {

  categories!: Categorie[];

  // pour faire farier le bouton ajouter dans le cas d'un ajout et modifier dans le cas d'une modification
  ajout: boolean = true;
  updatedCat: Categorie = { "idCat": 0, "nomCat": "" };

  constructor(private produitService: ProduitService) { }
  ngOnInit(): void {
    this.chargerCategories();
  }

  chargerCategories() {
    this.produitService.listeCategories().
      subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      });
  }

  categorieUpdated(cat: Categorie) {
    console.log("catégorie recue du composant updateCategorie", cat);
    this.produitService.ajouterCategorie(cat).subscribe(() => this.chargerCategories());
  }

  updateCat(cat: Categorie) {
    this.updatedCat = cat;
    this.ajout = false;
  }

}
