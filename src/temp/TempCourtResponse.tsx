import { Corte } from '@/types/corteResponse'

export const courtResponse: Corte = {
  ruta: 'Ruta 123',
  empleado: 'Juan Perez',
  vehiculo: 'Vehiculo 456',
  estadoRuta: 'Lista para realizar corte.',
  productosVendidos: [
    {
      nombre: 'Producto 1',
      cantidad: 5,
      precio: 10,
    },
    {
      nombre: 'Producto 2',
      cantidad: 3,
      precio: 8,
    },
    {
      nombre: 'Producto 1',
      cantidad: 5,
      precio: 10,
    },
    {
      nombre: 'Producto 2',
      cantidad: 3,
      precio: 8,
    },
    {
      nombre: 'Producto 1',
      cantidad: 5,
      precio: 10,
    },
    {
      nombre: 'Producto 2',
      cantidad: 3,
      precio: 8,
    },
  ],
  productosNoVendidos: [
    {
      nombre: 'Producto 11',
      cantidad: 2,
      precio: 15,
    },
    {
      nombre: 'Producto 12',
      cantidad: 1,
      precio: 20,
    },
    {
      nombre: 'Producto 11',
      cantidad: 2,
      precio: 15,
    },
    {
      nombre: 'Producto 12',
      cantidad: 1,
      precio: 20,
    },
    {
      nombre: 'Producto 11',
      cantidad: 2,
      precio: 15,
    },
    {
      nombre: 'Producto 12',
      cantidad: 1,
      precio: 20,
    },
  ],
  estimados: {
    salio: 100,
    vendio: 80,
    efectivo: 50,
    mercancia: 30,
    diferencia: 20,
  },
}
