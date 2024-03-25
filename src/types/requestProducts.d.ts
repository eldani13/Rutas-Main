export interface MessageRequestProducts {
  _id: string;
  state: string;
  dateTime: string;
  route: string;
  products: Product[];
  __v: number;
  assignedQuantity?: number;
}

interface Product {
  assignedQuantity: number;
  product: string;
  amount: number;
  amountCurrent: number;
  _id: string;
}


interface ProductosNoVendidos {
  _id: string;
  nombre: string;
  cantidad: number;
  precio: number;
}