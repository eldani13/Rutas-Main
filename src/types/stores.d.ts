export interface RootStores {
  message: MessageStores[];
  details: boolean;
}

export interface MessageStores {
  _id: string;
  nombre: string;
  direccion: string;
  productos: {
    product: string;
  }[];
  __v: number;
}
