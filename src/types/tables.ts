interface Product {
  name: string;
  description: string;
  price: number;
  sku: string;
  width: number;
  length: number;
  height: number;
  weight: number;
  categoryId: number;
  image?: string;
  category?: Category;
}

interface Category {
  id: number;
  name: string;
}
