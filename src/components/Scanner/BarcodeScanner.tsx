import React, { useRef } from 'react';

interface BarcodeScannerProps {
    startCamera: (videoRef: React.RefObject<HTMLVideoElement>) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ startCamera }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        startCamera(videoRef);
    }, [startCamera]);

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%', maxWidth: '600px' }} autoPlay></video>
        </div>
    );
};

//@ts-ignore
export function SearchInput({ label, startCamera, }: Props): JSX.Element {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleBarcodeIconClick = () => {
        startCamera(videoRef);
    };

    return (
        <div>
            <button type='button' onClick={handleBarcodeIconClick}>
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

            <video ref={videoRef} style={{ width: '100%', maxWidth: '600px' }} autoPlay></video>
        </div>
    );
}
