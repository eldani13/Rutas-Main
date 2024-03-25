interface ProductosCortes {
  amount: number
  amountCurrent: number
  product: string
  stateProduct: string
  _id: string
} 


type Estimados = {
  salio: number
  vendio: number
  efectivo: number
  mercancia: number
  diferencia: number
}

export type Corte = {
  ruta: string
  empleado: string
  vehiculo: string
  estadoRuta: string
  productosVendidos: Producto[]
  productosNoVendidos: Producto[]
  estimados: Estimados
}

interface Products {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  estado: 'vendido' | 'no vendido' | 'devolucion';
}

interface ResponseServer {
  id_Ruta: string;
  Usuario: string;
  Marca: string;
  Modelo: string;
  ProductosVendidos: Products[];
  ProductosNoVendidos: Products[];
  ProductosDevueltos: Products[];
}
