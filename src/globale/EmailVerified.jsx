import React from "react";
import Bouton from "./Bouton";
import styled from "styled-components";
import axios from "axios";
import { Dynamic } from "../context/DynamicContext";
import { auth } from "../auth/firebase";
import { signOut } from "firebase/auth";

const EmailVerified = () => {
  const { user, setNotif, setSpin } = Dynamic();
  const checkEmail = async () => {
    setSpin(true);
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}user/auth/verification/email`,
        withCredentials: true,
        data: {
          email: user.email,
          displayName: user.displayName,
        },
      }).then((res) => {
        // console.log(res);
        setSpin(false);
        if (res.data.message) {
          try {
            signOut(auth);
          } catch (error) {
            console.log(error);
            setNotif("Une erreur inatendu");
          }
          return setNotif(res.data.message);
        }
        setNotif("Une erreur inatendu");
      });
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  };
  return (
    <StyledEmailVerified>
      <h3>Email non vérifié</h3>
      <Bouton actionClick={checkEmail} text={"Je vérifie mon email"} />
    </StyledEmailVerified>
  );
};

export default EmailVerified;

const StyledEmailVerified = styled.div`
  position: fixed;
  z-index: 18;
  width: 50%;
  height: 30vh;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background: #db4747;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
