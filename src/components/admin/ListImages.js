import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ListImages = () => {
  const [imagesLists, setImagesLists] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}aws/all/images`,
          withCredentials: true,
        }).then((res) => {
          console.log(res);
          setImagesLists(res.data.images);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAll();
  }, []);

  return (
    <StyledListImages>
      <h2>Les images, clique pour supprimé</h2>
      <ul>
        {imagesLists &&
          imagesLists.map((img, index) => (
            <li key={index} onClick={() => alert(img.key)}>
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
`;
