import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styles: ``
})
export class UpdateCategorieComponent implements OnInit {

  @Input()
  categorie!: Categorie;
  @Output()
  categorieUpdated = new EventEmitter<Categorie>();

  // pour faire farier le bouton ajouter dans le cas d'un ajout et modifier dans le cas d'une modification
  @Input()
  ajout!: boolean;



  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ", this.categorie);
  }

  saveCategorie() {
    this.categorieUpdated.emit(this.categorie);
  }


}
