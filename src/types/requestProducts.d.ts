export interface MessageRequestProducts {
  _id: string;
  state: string;
  dateTime: string;
  route: string;
  products: Product[];
  __v: number;
  assignedQuantity?: number;
}

export interface Product {
  assignedQuantity: number;
  product: string;
  amount: number;
  amountCurrent: number;
  _id: string;
}

