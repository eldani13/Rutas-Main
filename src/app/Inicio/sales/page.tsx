'use client'

import React, { useState, useEffect } from 'react'
import { getAllFetchDataValues } from '@/utils/api'
import { MessageProduct, RootProduct } from '@/types/product'
import { Table, SearchInput } from '@/components'
import Swal from 'sweetalert2'

export default function Sales() {
  const [products, setProducts] = useState<RootProduct>()
  const [clickInProduct, setClickInProduct] = useState<null | MessageProduct>()
  const [search, setSearch] = useState('')

  const getProducts = async () => {
    const products = await getAllFetchDataValues(
      `${process.env.NEXT_PUBLIC_BACK_URL}products`
    )
    setProducts(products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const filteredProducts = products?.message.filter(product =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  )

  function saleProduct() {
    if (!clickInProduct) {
      Swal.fire({
        icon: 'error',
        title: 'Error al intentar hacer la compra',
        text: 'Por favor seleccione un producto',
        toast: true,
        timer: 2500,
        position: 'bottom-right',
        background: '#a00',
        color: '#fff',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    }

    console.log(clickInProduct)
  }

  return (
    <>
      <div className=' h-[100vh] hidden md:block'>
        <div className='flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%] justify-between  overflow-hidden max-h-[100vh]'>
          <div className='flex flex-col items-start justify-center'>
            <h1 className='text-[#000] text-2xl font-bold mb-1'>Ventas</h1>
            <span>Selecione los productos</span>
          </div>

          <div className='flex flex-col items-start justify-center pb-10'>
            <button
              className='bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold'
              onClick={saleProduct}>
              <svg
                className='h-[50px] w-[50px] text-blue-500 pr-2'
                fill='currentColor'
                viewBox='0 0 20 20'>
                <circle cx='10' cy='10' r='8' />
              </svg>
              <span className='mr-10 text-[14px]'>Vender Producto</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className='flex flex-col pl-3  max-h-[100vh] h-full '
        style={{ alignSelf: 'flex-start' }}>
        <SearchInput
          label='Buscar Producto'
          value={search}
          setValue={setSearch}
        />

        {filteredProducts && (
          <Table
            products={filteredProducts}
            clickInProduct={clickInProduct}
            setClickInProduct={setClickInProduct}
          />
        )}
      </div>
    </>
  )
}
