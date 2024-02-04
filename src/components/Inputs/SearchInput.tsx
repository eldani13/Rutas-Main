interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  setValue: (value: string) => void
}

export function SearchInput({ label, ...props }: Props): JSX.Element {
  return (
    <form className='p-4 md:py-8 md:px-64' onSubmit={e => e.preventDefault()}>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium sr-only'>
        {label}
      </label>
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
