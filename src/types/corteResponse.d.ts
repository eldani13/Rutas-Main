type Producto = {
  nombre: string
  cantidad: number
  precio: number
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
