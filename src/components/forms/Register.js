import React from "react";
import styled from "styled-components";
import ButtonForm from "../../globale/ButtonForm";

const Register = () => {
  const handleRegsiter = async (e) => {
    e.preventDefault();
  };
  return (
    <StyledRegister onSubmit={(e) => handleRegsiter(e)}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mot de passe" />
      <input type="password" placeholder="Confirmation mot de passe" />
      <input type="text" placeholder="Code de conf'" />
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
`;
