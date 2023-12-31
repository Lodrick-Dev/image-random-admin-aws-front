import React, { useState } from "react";
import styled from "styled-components";
import ButtonForm from "../../globale/ButtonForm";
import { Dynamic } from "../../context/DynamicContext";
import axios from "axios";

const Register = ({ setChooseForm, chooseForm }) => {
  const [showPass, setShowPass] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [code, setCode] = useState("");
  const { setNotif } = Dynamic();
  const handleRegsiter = async (e) => {
    e.preventDefault();
    if (!pseudo || !email || !password || !confirmation || !code)
      return setNotif("Erreur bro : Les champs aussi sont obligatoire");
    if (password !== confirmation)
      return setNotif("Erreur bro : Mot de passes correspondent pas");
    //call api
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}user/auth/register`,
        withCredentials: true,
        data: {
          pseudo,
          email,
          password,
          code,
        },
      }).then((res) => {
        // console.log(res);
        setNotif(res.data.message);
        if (!res.data.message.includes("Erreur"))
          return setChooseForm(!chooseForm);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //rendu
  return (
    <StyledRegister onSubmit={(e) => handleRegsiter(e)} $css={showPass}>
      <strong onClick={() => setShowPass(!showPass)}>Voir le mdp</strong>
      <input
        type="text"
        placeholder="Pseudo"
        onChange={(e) => setPseudo(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={showPass ? "text" : "password"}
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type={showPass ? "text" : "password"}
        placeholder="Confirmation mot de passe"
        onChange={(e) => setConfirmation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Code de conf'"
        onChange={(e) => setCode(e.target.value)}
      />
      <ButtonForm text={"Register"} />
    </StyledRegister>
  );
};

export default Register;

const StyledRegister = styled.form`
  /* background: pink; */
  display: flex;
  width: 40%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 80%;
    margin-top: 10px;
    padding: 5px;
    font-size: 1em;
    outline: none;
    border: none;
    border-radius: 5px;
  }
  strong {
    color: ${({ $css }) => ($css ? "red" : "white")};
    cursor: pointer;
  }

  //responsive
  //884px = 768px
  @media screen and (max-width: 884px) {
    width: 75%;
  }

  //iphone 13 por max 428px
  @media screen and (max-width: 428px) {
    width: 100%;
  }
`;
