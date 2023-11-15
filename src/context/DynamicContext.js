import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const DynamicContext = createContext();

export const DynamicContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const [pop, setPop] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <DynamicContext.Provider
      value={{ navigation, pop, setPop, idUser, setIdUser, user, setUser }}
    >
      {children}
    </DynamicContext.Provider>
  );
};

export const Dynamic = () => {
  return useContext(DynamicContext);
};
