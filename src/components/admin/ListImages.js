import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dynamic } from "../../context/DynamicContext";

const ListImages = () => {
  const [imagesLists, setImagesLists] = useState([]);
  const [imageWithAllData, setImageWithAllData] = useState([]);
  const { setNotif, token, callImgs, setCallImgs, setImgSelect } = Dynamic();

  const deleteImg = async (namemongo, nameaws) => {
    if (!namemongo || !nameaws)
      return setNotif("Erreur : Aucune image sélectionnée");
    if (window.confirm(`Voulez-vous vraiment supprimer ${nameaws} ?`)) {
      try {
        await axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URL}aws/admin/delete/image`,
          withCredentials: true,
          data: { token, namemongo, nameaws },
        }).then((res) => {
          //   console.log(res);
          setNotif(res.data.message);
          setCallImgs(!callImgs);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    console.log(id);
    for (let i = 0; i < imageWithAllData.length; i++) {
      if (imageWithAllData[i]._id === id) {
        console.log(imageWithAllData[i]);
        return setImgSelect([imageWithAllData[i]]);
      }
    }
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}aws/admin/all/images`,
          withCredentials: true,
        }).then((res) => {
          // console.log(res);
          setImagesLists(res.data.images);
        });
      } catch (error) {
        console.log(error);
      }
    };

    // getAll();
    getAllImageFromMongo();
  }, [callImgs]);

  return (
    <StyledListImages>
      <h2>Tape une image pour une action</h2>
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
