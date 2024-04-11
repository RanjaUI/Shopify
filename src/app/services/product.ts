export interface Product {
  id?: string;
  title: string;
  description: string;
  image: string;
  price: Number;
  category: string;
  availableQuantity: number;
}

export interface ResponseApi {
  type: 'add' | 'edit';
  error?: boolean;
  product?: Product;
  statusText?: string;
}
