import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const data_user = JSON.parse(localStorage.getItem("data_user"));
  console.log(data_user);
  let exist = false;
  if (data_user) {
    exist = true;
  }

  const [logged, setLogged] = useState(exist);

  return (
    <AuthContext.Provider value={{ logged, setLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);
