import React, { useState } from "react";
import styled from "styled-components";
import ButtonForm from "../../globale/ButtonForm";
import { Dynamic } from "../../context/DynamicContext";

const Connexion = () => {
  const [mdpForget, setMdpForget] = useState(false);
  const { navigation, setIdUser } = Dynamic();
  const handleConnexion = async (e) => {
    e.preventDefault();
    setIdUser("dbbbj");
    navigation("/dashboard");
  };

  const handlePasswordForget = async (e) => {
    e.preventDefault();
    alert("mot de passe oublié");
  };
  return (
    <StyledConnexion
      onSubmit={(e) => {
        mdpForget ? handlePasswordForget(e) : handleConnexion(e);
      }}
    >
      <input type="email" placeholder="Email" />
      {mdpForget ? undefined : (
        <input type="password" placeholder="Mot de passe" />
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
`;
