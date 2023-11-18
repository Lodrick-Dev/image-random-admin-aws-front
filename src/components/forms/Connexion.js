import React, { useState } from "react";
import styled from "styled-components";
import ButtonForm from "../../globale/ButtonForm";
import { Dynamic } from "../../context/DynamicContext";

const Connexion = () => {
  const { navigation, setIdUser, setNotif } = Dynamic();
  const [mdpForget, setMdpForget] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleConnexion = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return setNotif("Erreur : Bro les champs sont obligatoire");
    alert(`Ton email ${email} et ton password ${password}`);

    //firebase
    return;
    // return setNotif(" Lol tu dois te connecté bro");
    // setIdUser("dbbbj");
    navigation("/dashboard");
  };

  const handlePasswordForget = async (e) => {
    e.preventDefault();
    alert("mot de passe oublié");
  };

  //rendu
  return (
    <StyledConnexion
      onSubmit={(e) => {
        mdpForget ? handlePasswordForget(e) : handleConnexion(e);
      }}
      $css={showPass}
    >
      <strong onClick={() => setShowPass(!showPass)}>Voir le mdp</strong>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {mdpForget ? undefined : (
        <input
          type={showPass ? "text" : "password"}
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      <ButtonForm
        text={mdpForget ? "Initialisation du mot de passe" : "Connexion"}
      />
      <span onClick={() => setMdpForget(!mdpForget)}>
        Mot de passe oublié ?
      </span>
    </StyledConnexion>
  );
};

export default Connexion;

const StyledConnexion = styled.form`
  width: 35%;
  padding: 10px;
  height: 25vh;
  /* background: pink; */
  display: flex;
  flex-direction: column;
  input {
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: none;
    font-size: 1em;
    margin-top: 15px;
  }
  span {
    margin: 5px 25px;
    cursor: pointer;
    color: red;
  }
  strong {
    color: ${({ $css }) => ($css ? "red" : "white")};
    cursor: pointer;
  }
`;
