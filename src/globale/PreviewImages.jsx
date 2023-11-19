import React, { useState } from "react";
import styled from "styled-components";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
const PreviewImages = ({ imgsToPreview }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === imgsToPreview.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? imgsToPreview.length - 1 : prev - 1
    );
  };
  return (
    <StyledPreviewImages>
      <h2>Prévisualisation</h2>
      <ul>
        <MdNavigateBefore className="btn-back" onClick={prevImage} />
        <img src={imgsToPreview[currentImage]} alt={currentImage} />
        {/* {imgsToPreview.map((img, index) => (
          <li key={index}>
            <img src={img} alt={index} />
          </li>
        ))} */}
        <MdNavigateNext className="btn-next" onClick={nextImage} />
        <span>Nombre image : {imgsToPreview.length}</span>
      </ul>
    </StyledPreviewImages>
  );
};

export default PreviewImages;

const StyledPreviewImages = styled.div`
  /* background: yellow; */
  width: 40%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ul {
    width: 80%;
    /* background: blue; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    /* overflow-x: scroll; */
    position: relative;
  }
  ul > li {
    /* width: 50%; */
    text-decoration: none;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul > li > img,
  img {
    display: block;
    margin: 15px;
    width: 55%;
    user-select: none;
  }
  .btn-next,
  .btn-back {
    position: absolute;
    font-size: 2em;
    top: 50%;
    cursor: pointer;
    color: yellow;
  }
  .btn-next {
    transform: translate(50%, -50%);
    right: 5px;
  }
  .btn-back {
    left: 5px;
    transform: translate(-50%, -50%);
  }
  span {
    color: white;
  }

  //responsive
  //884px = 768px
  @media screen and (max-width: 884px) {
    width: 90%;
  }

  //responsive
  //428px iphone 13 pro max
  @media screen and (max-width: 428px) {
    width: 100%;
    margin: 70px 0px;
    ul {
      width: 95%;
    }
    ul > li > img,
    img {
      width: 80%;
    }
  }
`;
