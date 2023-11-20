import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dynamic } from "../../context/DynamicContext";

const ListImages = () => {
  const [imagesLists, setImagesLists] = useState([]);
  const { setNotif, token, callImgs, setCallImgs } = Dynamic();

  const deleteImg = async (name) => {
    if (!name) return setNotif("Erreur : Aucune image sélectionnée");
    if (window.confirm(`Voulez-vous vraiment supprimer ${name} ?`)) {
      try {
        await axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URL}aws/admin/delete/image`,
          withCredentials: true,
          data: { token, name },
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

  useEffect(() => {
    const getAll = async () => {
      try {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}aws/admin/all/images`,
          withCredentials: true,
        }).then((res) => {
          //   console.log(res);
          setImagesLists(res.data.images);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAll();
  }, [callImgs]);

  return (
    <StyledListImages>
      <h2>Les images, clique pour supprimé</h2>
      <ul>
        {imagesLists &&
          imagesLists.map((img, index) => (
            <li key={index} onClick={() => deleteImg(img.key)}>
              <img src={img.imageUrl} alt={img.key} />
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
  margin-top: 15px;
  /* background: pink; */
  padding: 5px;
  h2 {
    text-align: center;
    padding: 10px;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  ul > li {
    width: 20%;
    background: white;
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
