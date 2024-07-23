import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  // Rechercher par nom des produits en utilisant un pipe

  transform(list: any[], filterText: string): any {
    return list ? list.filter(item =>
      item.nomProduit.toLowerCase().includes(filterText)) : [];
  }

}
