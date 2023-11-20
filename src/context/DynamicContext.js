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
  const [spin, setSpin] = useState(false);
  const [callImgs, setCallImgs] = useState(false);
  useEffect(() => {
    const spyActivities = async () => {
      setSpin(true);
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
              setSpin(false);
            });
          }
          navigation("/dashboard");
          return;
        } else {
          setSpin(false);
          signOut(auth);
          setIdUser(null);
          setUser(null);
          setToken("");
          return;
        }
      });
    };
    spyActivities();
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
        spin,
        setSpin,
        callImgs,
        setCallImgs,
      }}
    >
      {children}
    </DynamicContext.Provider>
  );
};

export const Dynamic = () => {
  return useContext(DynamicContext);
};
