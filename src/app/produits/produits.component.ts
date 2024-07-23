import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css',
})
export class ProduitsComponent implements OnInit {

  produits?: Produit[]; //un tableau de Produit

  constructor(private produitService: ProduitService,
    public authService: AuthService) {
    // this.produits = this.produitService.listeProduit();
  }
  ngOnInit(): void {

    this.chargerProduits();
  }

  // pour charger produit par produit 
  /* 
    chargerProduits() {
      this.produitService.listeProduit().subscribe(prods => {
        this.produits = prods;
        this.produits.forEach((prod) => {
          this.produitService
            .loadImage(prod.image.idImage)
            .subscribe((img: Image) => {
              prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
            });
        });
      });
    } */

  chargerProduits() {
    this.produitService.listeProduit().subscribe(prods => {
      this.produits = prods;
      this.produits.forEach((prod) => {
        if (prod.images && prod.images.length > 0) {
          prod.imageStr = 'data:' + prod.images[0].type + ';base64,' + prod.images[0].image;
        } else {
          prod.imageStr = ''; // ou une valeur par défaut si nécessaire
        }
      });
    });
  }


  supprimerProduit(p: Produit) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
      });
  }
}
