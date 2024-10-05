import { useState } from "react";
import React from "react";
import Service from "../Service/Service";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const {logged, setLogged} = useAuthContext();

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const response = await Service.login(userDetails);

    if (response.data.message === "Login failed") {
      alert("No se pudo iniciar sesión");
    } else if (response.data.message === "Login successful") {
      alert("Inicio de sesión exitoso");
      localStorage.setItem("data_user", JSON.stringify(response.data));
      setLogged(true);
      navigate("/admin/home");
    } else {
      alert("Error con el servidor");
    }
  };

  return (
    <>
      <div className="h-full bg-gradient-to-t from-[#ebb434] to-[#db721d]">
        <div className="min-h-screen max-h-screen text-black loginbg flex items-center justify-center p-12">
          <div className="flex w-full max-h-screen max-w-5xl">
            <div
              className="hidden lg:flex lg:w-full bg-contain bg-center bg-no-repeat rounded-l-lg h-screen"
              style={{
                backgroundImage:
                  "url('https://www.protocoloimep.com/app/uploads/2018/08/organizacion-eventos3.jpg')",
                backgroundPosition: "center center",
                borderRadius: "50px 50px 50px 50px",
              }}
            ></div>
          </div>

          <div className="max-w-screen bg-[#E9ECEE] shadow-2xl rounded-r-lg flex flex-1">
            <div className="flex-1 bg-[#E9ECEE] shadow-2xl rounded-r-lg p-6 sm:p-12">
              <form>
                <div className="flex items-center justify-center">
                  <div style={{ width: "200px", height: "200px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-full h-full text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-12 flex flex-col items-center">
                  <h1 className="text-2xl xl:text-3xl font-bold">
                    IPC1 - Gestion de Eventos
                  </h1>
                  <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-xs">
                      <input
                        data-test-id="cypress-email-login"
                        className="w-full px-8 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Usuario"
                        onChange={handleInputChange}
                      />
                      <input
                        className="w-full px-8 mt-5 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        placeholder="Contraseña"
                        id="password"
                        name="password"
                        onChange={handleInputChange}
                      />
                      <button
                        className="mt-5 tracking-wide font-semibold bg-green-400 text-black w-full py-4 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="button"
                        onClick={handleLogin}
                      >
                        <span className="ml-3">Iniciar Sesión</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
