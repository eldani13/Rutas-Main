export interface RootStores {
  message: MessageStores[];
  details: boolean;
}

export interface MessageStores {
  _id: string;
  nombre: string;
  direccion: string;
  coordinador: string;
  coordenadas: {
    x: number;
    y: number;
  };
  productos: ProductsInStores[];
  __v: number;
}

export interface ProductsInStores{
  _id: string;
  product: string;
  price: number
  __v: number;
}