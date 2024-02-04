'use client'

import React, { useState } from 'react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import CourtPDF from '@/pdf/CourtPDF'
import { courtResponse } from '@/temp/TempCourtResponse'

export default function Court() {
  const [currentCourt, setCurrentCourt] = useState(courtResponse)
  const [showPDF, setShowPDF] = useState(false)

  return (
    <>
      <div className=' h-[100vh]'>
        <div className='flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%] justify-between  overflow-hidden max-h-[100vh]'>
          <div className='flex flex-col items-start justify-center'>
            <h1 className='text-[#000] text-2xl font-bold mb-1'>
              Sistema de Corte
            </h1>
            <div className='grid grid-cols-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='30'
                width='30'
                viewBox='0 0 384 512'
                transform='rotate(90)'>
                <path d='M32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96-43 96-96l0-306.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 416c0 17.7-14.3 32-32 32l-96 0z' />
              </svg>
              <span className='mr-[-40px]'>Ruta Jímenez</span>
            </div>

            <div className='flex items-center justify-center bg-[#ccc] h-40 w-40 rounded-full m-auto mt-6'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='75'
                width='75'
                viewBox='0 0 448 512'>
                <path d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z' />
              </svg>
            </div>

            <div className='grid grid-rows-3 gap-5 m-auto mt-6'>
              <div>
                <span style={{ color: '#5e5e5e', fontWeight: '900' }}>
                  Empleado:
                </span>
                <p style={{ color: '#828282' }}>{currentCourt.empleado}</p>
              </div>
              <div>
                <span style={{ color: '#5e5e5e', fontWeight: '900' }}>
                  Vehículo asignado:
                </span>
                <p style={{ color: '#828282' }}>{currentCourt.vehiculo}</p>
              </div>
              <div>
                <span style={{ color: '#5e5e5e', fontWeight: '900' }}>
                  Estado de ruta:
                </span>
                <p style={{ color: '#ecab0f', fontWeight: '600' }}>
                  {currentCourt.estadoRuta}
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className='pb-10 flex flex-col space-y-10 items-center'>
            <button className='bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold'>
              <svg
                className='h-[50px] w-[50px] text-green-500 pr-2'
                fill='currentColor'
                viewBox='0 0 20 20'>
                <circle cx='10' cy='10' r='8' />
              </svg>
              <span className='mr-10'>Ver Historial</span>
            </button>

            <button className='bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold'>
              <svg
                className='h-[50px] w-[50px] text-blue-500 pr-2'
                fill='currentColor'
                viewBox='0 0 20 20'>
                <circle cx='10' cy='10' r='8' />
              </svg>
              <span className='mr-10 text-[14px]'>Finalizar Corte</span>
            </button>

            <div className='flex bg-[#ececec] justify-center items-center gap-4 rounded-full h-14 w-52 px-2 py-2 mb-2'>
              <button
                onClick={() => setShowPDF(!showPDF)}
                className='flex w-5/6 justify-center items-center text-black font-bold'>
                <svg
                  className='h-[50px] w-[50px] text-blue-500 pr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <circle cx='10' cy='10' r='8' />
                </svg>
                <span className='ml-2 text-[14px]'>Mostrar PDF</span>
              </button>
              <PDFDownloadLink
                className='w-1/6 flex justify-center items-center border-l-2 border-[#bbbcbc]'
                document={<CourtPDF corte={currentCourt} />}
                fileName='sistemaCorte.pdf'
                title='Descargar PDF'>
                <svg
                  className='h-[50px] w-[50px] '
                  data-slot='icon'
                  fill='none'
                  stroke-width='1.5'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'>
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'></path>
                </svg>
              </PDFDownloadLink>
            </div>

          </div>
        </div>
      </div>
      <div
        className='flex flex-col justify-between px-3  max-h-[100vh] h-full overflow-y-auto'
        style={{ alignSelf: 'flex-start' }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='my-3'
          fill='#ccc'
          height='20'
          width='18'
          viewBox='0 0 448 512'>
          <path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
        </svg>
        <hr className='mb-10 border-[1px]' />
        // Show PDF viewer
        {showPDF ? (
          <PDFViewer className='w-full h-[100vh]' showToolbar>
            <CourtPDF corte={currentCourt} />
          </PDFViewer>
        ) : (
          <div className='grid w-full flex-1 xl:grid-cols-3 xl:grid-rows-2 grid-rows-3 '>
            {/*gridTemplateAreas: " 'productSold productSold summary' 'productNotSold productNotSold summary'*/}
            */
            {/* Primer div */}
            <div className='flex text-black px-3 xl:col-span-2 md:col-span-3 col-start-1 row-start-1'>
              <table className='h-full w-full border-collapse'>
                <thead>
                  <tr className='bg-[#ccc] rounded-full grid grid-cols-3 py-2.5'>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourt.productosVendidos.map((product, index) => (
                    <tr
                      key={index}
                      className='grid grid-cols-3 py-2.5 text-center'>
                      <td>{product.nombre}</td>
                      <td>{product.cantidad}</td>
                      <td>{product.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
            {/* Tercer div */}
            <div className='flex text-black px-3 xl:col-span-2 md:col-span-3 row-start-2'>
              <table className='h-full w-full border-collapse'>
                <thead>
                  <tr className='bg-[#ccc] rounded-full grid grid-cols-3 py-2'>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourt.productosNoVendidos.map((product, index) => (
                    <tr
                      key={index}
                      className='grid grid-cols-3 py-2.5 text-center'>
                      <td>{product.nombre}</td>
                      <td>{product.cantidad}</td>
                      <td>{product.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Segundo div */}
            <div className='flex relative flex-col justify-items-center  text-black px-3  pb-5 row-span-2 h-[100%] xl:col-span-2 md:col-span-3 xl:col-start-3 xl:row-start-1 md:col-start-1 md:row-start-3 '>
              {/* Primer elemento */}
              <div className='text-[#000]  flex flex-col items-center w-full h-fit bg-[#ccc] py-2 rounded-full mb-8'>
                <p className='font-bold text-[20px] text-center'>ESTIMADOS</p>
              </div>
              <div className='grid gap-3 md:mb-10 '>
                <div className='flex justify-between  '>
                  <p className='justify-self-start'>Salio con</p>
                  <p className='relative'>
                    {currentCourt.estimados.salio}
                    <span className=' ps-3 text-sm font-bold top-0'>MXN</span>
                  </p>
                </div>
                <div className='flex justify-between  '>
                  <p>Vendio</p>
                  <p className='relative'>
                    {currentCourt.estimados.vendio}
                    <span className=' ps-3 text-sm font-bold top-0'>MXN</span>
                  </p>
                </div>
                <div className='flex justify-between '>
                  <p>Entrego en Efectivo</p>
                  <p className='relative'>
                    {currentCourt.estimados.efectivo}
                    <span className=' ps-3 text-sm font-bold top-0'>MXN</span>
                  </p>
                </div>
                <div className='flex justify-between  '>
                  <p>Entrego en mercancia</p>
                  <p className='relative'>
                    {currentCourt.estimados.mercancia}
                    <span className=' ps-3 text-sm font-bold   top-[-3]'>
                      MXN
                    </span>
                  </p>
                </div>
              </div>

              <div
                className='w-full flex flex-col absolute xl:bottom-0 xl:right-1 md:bottom-10 gap-5 rounded-xl text-center py-5'
                style={{ boxShadow: '0px 6px 13.7px 0px rgba(0, 0, 0, 0.10)' }}>
                <p className='font-bold text-lg'>LA DIFERENCIA ES DE:</p>
                <p className='font-normal text-xl text-red-500 relative'>
                  {currentCourt.estimados.diferencia}
                  <span className=' ps-3 text-sm font-bold absolute top-[-3px]'>
                    MXN
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
