export interface MessageRequestProducts {
  _id: string;
  state: string;
  dateTime: string;
  route: string;
  products: Product[];
  __v: number;
}

interface Product {
  product: string;
  amount: number;
  _id: string;
}
