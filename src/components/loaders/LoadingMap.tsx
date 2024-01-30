import { LoaderSpin } from './LoaderSpin'

/**
 * Renders a loading map component.
 *
 * @return {JSX.Element} The loading map component
 */
export function LoadingMap(): JSX.Element {
  return (
    <div className='flex-1 rounded-lg overflow-hidden max-h-[90%] text-white bg-zinc-900 flex justify-center items-center flex-col gap-4'>
      <h1 className='text-3xl font-bold'>Cargando mapa</h1>
      <h3 className='text-xl'>Por favor espere...</h3>
      <LoaderSpin />
    </div>
  )
}
