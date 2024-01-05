import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dynamic } from "../../context/DynamicContext";

const ListImages = () => {
  const [imagesLists, setImagesLists] = useState([]);
  const [imageWithAllData, setImageWithAllData] = useState([]);
  const { setNotif, token, callImgs, setCallImgs, setImgSelect } = Dynamic();

  //all image from mongo
  const getAllImageFromMongo = async () => {
    // pour envoyé token/data avec la méthode get :
    // headers: {Authorization: `${token}`,}
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}aws/admin/all/images/mongo`,
        withCredentials: true,
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res) {
        // console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].nameimage);
          if (res.data[i].nameimage) {
            setImagesLists((prev) => [
              { imageUrl: res.data[i].nameimage, id: res.data[i]._id },
              ...prev,
            ]);
          }
        }
        setImageWithAllData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //select image to show in pop
  const selectImg = (id) => {
    for (let i = 0; i < imageWithAllData.length; i++) {
      if (imageWithAllData[i]._id === id) {
        // console.log(imageWithAllData[i]);
        return setImgSelect([imageWithAllData[i]]);
      }
    }
  };

  useEffect(() => {
    getAllImageFromMongo();
  }, [callImgs]);

  return (
    <StyledListImages>
      <h2>Total image : {imageWithAllData && imageWithAllData.length}</h2>
      <ul>
        {imagesLists &&
          imagesLists.map((img, index) => (
            <li key={index} onClick={() => selectImg(img.id)}>
              <img src={img.imageUrl} alt={img.id} />
            </li>
          ))}
      </ul>
    </StyledListImages>
  );
};

export default ListImages;
const StyledListImages = styled.div`
  border-top: solid 2px white;
  width: 80%;
  height: 80vh;
  margin-top: 15px;
  /* background: pink; */
  padding: 5px;
  h2 {
    text-align: center;
    padding: 10px;
  }
  ul {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow-y: scroll;
  }
  ul > li {
    width: 15%;
    background: white;
    margin: 5px;
    cursor: pointer;
  }
  ul > li > img {
    display: block;
    width: 100%;
  }

  //responsive
  //428px iphone 13 pro max
  @media screen and (max-width: 428px) {
    width: 100%;
  }
`;
