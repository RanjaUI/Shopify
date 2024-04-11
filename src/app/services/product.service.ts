import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  getnotification = new Subject();
  getExistingProduct = new Subject();
  onModalClose = new Subject();

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      'https://json-server-nodejs.onrender.com/inventory?_sort=id&_order=desc'
    );
  }
  addProduct(sampleProduct: Product): Observable<any> {
    return this.httpClient.post<Product>(
      'https://json-server-nodejs.onrender.com/inventory',
      sampleProduct
    );
  }
  updateProduct(updatedProduct: Product, id: number): Observable<any> {
    return this.httpClient.patch<Product>(
      `https://json-server-nodejs.onrender.com/inventory/${id}`,
      updatedProduct
    );
  }
  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<Product>(
      `https://json-server-nodejs.onrender.com/inventory/${id}`
    );
  }
}
