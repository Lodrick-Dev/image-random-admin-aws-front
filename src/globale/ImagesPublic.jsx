import React, { useState } from "react";
import styled from "styled-components";
import Bouton from "./Bouton";
import axios from "axios";
import { Dynamic } from "../context/DynamicContext";

const ImagesPublic = () => {
  const [imgSrc, setImgSrc] = useState("");
  const { token } = Dynamic();
  const callNewImage = async () => {
    // alert("new image call");
    console.log(token);
    try {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}aws/random/image`,
        withCredentials: true,
      }).then((res) => {
        console.log(res);

        setImgSrc(res.data.image);
      });
    } catch (error) {
      console.log(error);
    }
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
  border-top: solid 2px orange;
  margin-top: 20px;
  /* background: white; */
  width: 35%;
  /* height: 30vh; */
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  img {
    width: 50%;
    background: #767676;
    box-shadow: 0px 3px 5px 1px #767676;
    border-radius: 10px;
  }
  //responsive
  //884px = 768px
  @media screen and (max-width: 884px) {
    width: 70%;
  }
  //responsive
  //428px iphone 13 pro max
  @media screen and (max-width: 428px) {
    width: 100%;
  }
`;
