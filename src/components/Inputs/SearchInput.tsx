import React, { useRef, useEffect } from "react";

interface Props {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleClickOnOffScanner: (value: boolean) => void;
}

export function SearchInput({ label, setValue, handleClickOnOffScanner }: Props): JSX.Element {
  return (
    <form className="p-4 md:py-8 md:px-64" onSubmit={(e) => e.preventDefault()}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only"
      >
        {label}
      </label>

      {/* onClick={handleBarcodeIconClick}  */}

      {/* Codebar */}

      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-black dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-black border border-gray-500 rounded-lg"
          placeholder={label}
          required
          onChange={(e) => setValue(e.target.value)}
          // {...props}
        />

        <button
          type="submit"
          className="bg-blue-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1] absolute end-2.5 bottom-2 hidden md:block"
        >
          Buscar
        </button>

        <button
          type="button"
          className="absolute end-2.5 bottom-1/4 md:-right-10"
          onClick={() => handleClickOnOffScanner(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="25"
            fill="currentColor"
            className="bi bi-upc-scan dark:text-gray-400  block"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
