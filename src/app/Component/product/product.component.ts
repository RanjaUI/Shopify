import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, ResponseApi } from '../../services/product';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  first: number = 0;
  rows: number = 5;
  products: Product[] | undefined;
  filter: string | undefined;
  title: string = '';
  messages: Message[] = [];
  isAddProduct: boolean = false;
  isDeleteProduct: boolean = false;
  productId: number | undefined;
  constructor(private productService: ProductService) {
    this.productService.getNotification.subscribe((res: ResponseApi) => {
      this.isAddProduct = false;
      if (!res.error && res.product) {
        if (res.type === 'add') {
          this.products = [res.product, ...(this.products as any)];
        } else if (res.type === 'edit') {
          this.products = this.products?.map((prd: Product) =>
            prd.id === res?.product?.id ? { ...prd, ...res?.product } : prd
          );
        }
      }
      this.messages = [
        {
          severity: res.error ? 'error' : 'success',
          summary: res.error ? 'Error: ' : 'Success: ',
          detail: res.error
            ? res.statusText
            : res.type === 'add'
            ? 'Product Added'
            : 'Product Updated',
        },
      ];
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (items) => {
        this.products = items;
      },
      (error) => {
        this.messages = [
          {
            severity: 'error',
            summary: 'Error: ',
            detail: error.statusText,
          },
        ];
      }
    );
  }

  addProduct() {
    this.isAddProduct = true;
  }

  openPopup(event: any) {
    this.isDeleteProduct = true;
    this.productId = event.id;
  }

  closePopup() {
    this.isDeleteProduct = false;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId as any).subscribe(
      (res) => {
        if (res) {
          this.messages = [
            {
              severity: 'success',
              summary: 'Success: ',
              detail: 'Product Deleted',
            },
          ];
          this.products = this.products?.filter(
            (prd) => prd.id !== this.productId
          );
        }
      },
      (error) => {
        this.messages = [
          {
            severity: 'error',
            summary: 'Error: ',
            detail: error.statusText || 'Unknown Error',
          },
        ];
      }
    );
    this.isDeleteProduct = false;
  }

  editProduct(element: Product) {
    this.isAddProduct = true;
    this.productService.getExistingProduct.next(element);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  onDialogClose() {
    this.productService.onModalClose.next(true);
  }
}
