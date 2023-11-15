import React, { useState } from "react";
import styled from "styled-components";
import Bouton from "./Bouton";

const ImagesPublic = () => {
  const [imgSrc, setImgSrc] = useState("");
  const callNewImage = async () => {
    alert("new image call");
  };
  return (
    <StyledImagesPublic>
      <img src={imgSrc} alt={imgSrc} />
      <Bouton text={"Nouvelle Image"} actionClick={() => callNewImage()} />
    </StyledImagesPublic>
  );
};

export default ImagesPublic;

const StyledImagesPublic = styled.div`
  background: white;
  width: 50%;
  height: 30vh;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  img {
    width: 50%;
    padding: 10px;
    background: #767676;
    box-shadow: 0px 3px 5px 1px #767676;
  }
`;
