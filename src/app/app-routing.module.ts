import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { produitGuard } from './produit.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  { path: 'produits', component: ProduitsComponent },
  { path: 'add-produit', component: AddProduitComponent, canActivate: [produitGuard] },
  { path: "updateProduit/:id", component: UpdateProduitComponent },
  { path: '', redirectTo: 'produits', pathMatch: 'full' },
  { path: "rechercheParCategorie", component: RechercheParCategorieComponent }, // recherche des produits par catégorie
  { path: "rechercheParNom", component: RechercheParNomComponent }, // recherche des produits par nom
  { path: "listeCategories", component: ListeCategoriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifEmail', component: VerifEmailComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
