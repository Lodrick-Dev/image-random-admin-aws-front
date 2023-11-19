import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";

const DynamicContext = createContext();

export const DynamicContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const [pop, setPop] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const spyActivities = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //connected
          setIdUser(user.uid);
          setUser(user);

          //pour envoyé préparé le token pour le server
          if (user) {
            user.getIdToken().then((res) => {
              // console.log(res);
              setToken(res);
            });
          }
          navigation("/dashboard");
          return;
        } else {
          signOut(auth);
          setIdUser(null);
          setUser(null);
          setToken("");
          return;
        }
      });
    };
    return () => spyActivities(); //nettoyer l'effet quand le composant est démonté
  }, []);

  return (
    <DynamicContext.Provider
      value={{
        navigation,
        pop,
        setPop,
        idUser,
        setIdUser,
        user,
        setUser,
        notif,
        setNotif,
        token,
        setToken,
      }}
    >
      {children}
    </DynamicContext.Provider>
  );
};

export const Dynamic = () => {
  return useContext(DynamicContext);
};
