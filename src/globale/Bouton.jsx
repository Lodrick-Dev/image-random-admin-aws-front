import React from "react";
import styled from "styled-components";

const Bouton = ({ text, actionClick, classCss }) => {
  return (
    <StyledBouton onClick={actionClick} className={classCss}>
      {text}
    </StyledBouton>
  );
};

export default Bouton;

const StyledBouton = styled.button`
  transition: 0.3s;
  background: black;
  padding: 5px 15px;
  margin: 5px 15px;
  display: block;
  color: white;
  font-size: 1.1em;
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 3px 5px 1px #767676;
  &:hover {
    transition: 0.3s;
    background: #767676;
  }
`;
