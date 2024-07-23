import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorie } from '../model/categorie.model';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/Image.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  apiURL: string = 'http://localhost:8080/produits/api';
  apiURLCat: string = 'http://localhost:8080/produits/cat';

  produits!: Produit[]; // un tableau de produits
  /*  categories: Categorie[]; */

  constructor(private http: HttpClient,
    private authService: AuthService
  ) {

  }
  // ici on fait appel a nos api du backend 
  listeProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiURL + "/all");
  }


  ajouterProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Produit>(this.apiURL + "/addprod", prod, { headers: httpHeaders });
  }


  supprimerProduit(id: number) {
    const url = `${this.apiURL}/delprod/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }


  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Produit>(url, { headers: httpHeaders });
  }


  updateProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Produit>(this.apiURL + "/updateprod", prod, { headers: httpHeaders });
  }

  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      if (n1.idProduit! > n2.idProduit!) {
        return 1;
      }
      if (n1.idProduit! < n2.idProduit!) {
        return -1;
      }
      return 0;
    });
  }

  listeCategories(): Observable<CategorieWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<CategorieWrapper>(this.apiURLCat, { headers: httpHeaders }
    );
  }

  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${this.apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageProd(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageProd'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }



}
