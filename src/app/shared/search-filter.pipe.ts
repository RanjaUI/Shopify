import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../services/product';

@Pipe({
  name: 'searchfilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: Product[], searchfilter: string): any {
    if (!value || searchfilter.trim() === '') {
      return value;
    }
    return value.filter((item: Product) =>
      item.title.toLowerCase().includes(searchfilter.toLowerCase())
    );
  }
}
