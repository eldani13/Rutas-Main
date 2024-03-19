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
  productos: {
    product: string;
  }[];
  __v: number;
}
