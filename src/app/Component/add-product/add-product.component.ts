import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

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
    this.productService.getExistingProduct.subscribe((res: any) => {
      this.productId = res.id;
      this.productForm.patchValue(res);
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
              this.productService.getnotification.next({
                type: 'edit',
                product: res,
              });
              this.productForm.reset();
            }
          },
          (err) => {
            console.log(err);
            this.productService.getnotification.next({ error: true, ...err });
          }
        );
    } else {
      this.productService.addProduct(this.productForm.value as any).subscribe(
        (res) => {
          if (res) {
            this.productService.getnotification.next({
              type: 'add',
              product: res,
            });
            this.productForm.reset();
          }
        },
        (err) => {
          console.log('Check', err);
          this.productService.getnotification.next({ error: true, ...err });
        }
      );
    }
  }

  onUpload(event: any) {
    console.log(event);
  }
}
