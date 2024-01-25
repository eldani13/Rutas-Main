"use client"

import { getCookie, processEnv, setCookie } from '@/utils/cookies';
import { FormEvent, useEffect, useRef, useState } from 'react'


export default function HomePage() {
  const [errorMessage, setErrorMessage] = useState('');
  const inputUsername = useRef<null | HTMLInputElement>(null);
  const inputPassword = useRef<null | HTMLInputElement>(null);
  const inputSelectRol = useRef<null | HTMLSelectElement>(null);



  useEffect(() => {
    getCookie(processEnv.name)
      .then((str) => {
        console.log(str)
        window.location.href = '/Inicio';
      })
  }, [])

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}validate-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: inputUsername.current?.value || "",
          role: inputSelectRol.current?.value || "",
          password: inputPassword.current?.value || ""
        }),
      });

      console.log(response.statusText);

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.data) && data.data.length > 0) {
          // Inicio de sesión exitoso

          setCookie(processEnv.name, inputUsername.current?.value || "");
          setCookie(processEnv.rol, inputPassword.current?.value || "");
          window.location.href = '/Inicio';
        } else {
          // Inicio de sesión no exitoso
          setErrorMessage('Credenciales incorrectas');
        }
      } else {
        const errorData = await response.json();
        setErrorMessage('Credenciales incorrectas');

        // setErrorMessage('Error de servidor');
      }
    } catch (error) {
      setErrorMessage('Upss, error inesperado, por favor contacte con el desarrollador');
    }
  };
  return (
    <main>
      <div className="bg-[#ccc] h-screen overflow-hidden flex items-center justify-center">
        <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl rounded-xl max-h-[80vh]">
          <div className="bg-gray-800 flex items-center justify-center absolute shadow-lg shadow-gray-800 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 576 512">
              <path d="M288 0C422.4 0 512 35.2 512 80V96l0 32c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32V448H192v32c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h0V96h0V80C64 35.2 153.6 0 288 0zM128 160v96c0 17.7 14.3 32 32 32H272V128H160c-17.7 0-32 14.3-32 32zM304 288H416c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H304V288zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16s7.2 16 16 16H368c8.8 0 16-7.2 16-16z" fill='white' />
            </svg>
          </div>
          <form onSubmit={handleLogin} className="p-12 md:p-24" method="post">
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
              <select ref={inputSelectRol} name="" id="" className='bg-gray-200 rounded-full text-black pl-12 py-2 md:py-4 focus:outline-none w-full'>
                <option value="empleado">Empleado</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
              <input type="text" ref={inputUsername} name='username' className="bg-gray-200 rounded-full text-black pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Username" />
            </div>

            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
              </svg>
              <input type="password" ref={inputPassword} name='role' className="bg-gray-200 rounded-full text-black pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
            </div>

            <div className='flex items-center justify-center'>
              {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            </div>

            <div className='flex justify-center p-4'>
              <span className='text-black'>Si olvido su contraseña, comuniquese con el administrador.</span>
            </div>

            <button type='submit' className="bg-gradient-to-b rounded-full from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full">Login</button>
          </form>
        </div>
      </div>
    </main>
  );
}
