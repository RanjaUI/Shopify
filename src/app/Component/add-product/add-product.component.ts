import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  category: string[] | undefined;
  productId: any;
  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    availableQuantity: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productService.getExistingProduct.subscribe((res: Product) => {
      this.productId = res.id;
      this.productForm.patchValue(res as any);
    });
    this.productService.onModalClose.subscribe(() => {
      this.productForm.reset();
    });
  }

  ngOnInit() {
    this.category = [
      "Men's Clothing",
      "Women's Clothing",
      'Sports',
      'Gym',
      'Shoes',
      'Electronics',
      'Jewellery',
    ];
  }

  addOrEditProduct() {
    if (this.productId) {
      this.productService
        .updateProduct(this.productForm.value as any, this.productId)
        .subscribe(
          (res) => {
            if (res) {
              this.productService.getNotification.next({
                type: 'edit',
                product: res,
              });
              this.productForm.reset();
            }
          },
          (err) => {
            console.log(err);
            this.productService.getNotification.next({ error: true, ...err });
          }
        );
    } else {
      this.productService.addProduct(this.productForm.value as any).subscribe(
        (res) => {
          if (res) {
            this.productService.getNotification.next({
              type: 'add',
              product: res,
            });
            this.productForm.reset();
          }
        },
        (err) => {
          this.productService.getNotification.next({ error: true, ...err });
        }
      );
    }
  }
}
