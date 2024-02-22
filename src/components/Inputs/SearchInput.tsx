import React, { useRef, useEffect } from 'react';
import Instascan from 'instascan';
import JsBarcode from 'jsbarcode';


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  setValue: (value: string) => void
  // startCamera: (videoRef: React.RefObject<HTMLVideoElement>) => void;
}


const BarcodeScanner: React.FC = () => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const scanner = new Instascan.Scanner({ video: videoRef.current });

  scanner.addListener('scan', (content: any) => {
    console.log('Código de barras escaneado:', content);
  });

  useEffect(() => {
    const startCamera = async () => {
      try {
        const cameras = await Instascan.Camera.getCameras();
        if (cameras.length > 0) {
          const selectedCamera = cameras[0]; 
          scanner.start(selectedCamera);
        } else {
          console.error('No se encontraron cámaras disponibles.');
        }
      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
      }
    };
    startCamera();

    const scanBarcode = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (videoRef.current && context) {
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const decoded = JsBarcode(imageData);

          if (decoded) {
            console.log('Código de barras escaneado:', decoded);
          }
        } catch (error) {
          console.error('Error al decodificar el código de barras:', error);
        }
      }

      requestAnimationFrame(scanBarcode);
    };
    scanBarcode();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '600px' }} autoPlay></video>
    </div>
  );
};

export function SearchInput({ label, ...props }: Props): JSX.Element {

  // const videoRef = useRef<HTMLVideoElement>(null);
  // const handleBarcodeIconClick = () => {
  //   startCamera(videoRef); 
  // };

  return (
    <form className='p-4 md:py-8 md:px-64' onSubmit={e => e.preventDefault()}>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium sr-only'>
        {label}
      </label>

      {/* onClick={handleBarcodeIconClick}  */}

      {/* Codebar */}
      <button type='button'  >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="25"
          fill="currentColor"
          className="bi bi-upc-scan dark:text-gray-400 absolute right-48 top-[4.3rem] bottom-2 hidden md:block"
          viewBox="0 0 16 16">
          <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0z" />
        </svg>
      </button>

      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-black dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>

        <input
          type='search'
          id='default-search'
          className='block w-full p-4 ps-10 text-sm text-black border border-gray-500 rounded-lg'
          placeholder={label}
          required
          onChange={e => props.setValue(e.target.value)}
          {...props}
        />

        <button
          type='submit'
          className='bg-blue-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1] absolute end-2.5 bottom-2 hidden md:block'>
          Buscar
        </button>
      </div>
    </form>
  )
}
export default BarcodeScanner;
