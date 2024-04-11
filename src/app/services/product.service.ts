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

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      'http://localhost:8000/inventory?_sort=id&_order=desc'
    );
  }
  addProduct(sampleProduct: Product): Observable<any> {
    return this.httpClient.post<Product>(
      'http://localhost:8000/inventory',
      sampleProduct
    );
  }
  updateProduct(updatedProduct: Product, id: number): Observable<any> {
    return this.httpClient.patch<Product>(
      `http://localhost:8000/inventory/${id}`,
      updatedProduct
    );
  }
  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<Product>(
      `http://localhost:8000/inventory/${id}`
    );
  }
}
