import React from "react";
import styled from "styled-components";

const ButtonForm = ({ text }) => {
  return <StyledButtonForm type="submit" value={text} />;
};

export default ButtonForm;
const StyledButtonForm = styled.input`
  /* width: 50% !important; */
  transition: 0.3s;
  background: green;
  padding: 5px 15px;
  border: none;
  margin: 10px 0px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  font-size: 1em;
  &:hover {
    transition: 0.3s;
    background: #0000ff9c;
  }
`;
