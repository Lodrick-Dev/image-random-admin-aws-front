import React from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { COLORS } from "../../../utils/Colors/Index";
import { Dynamic } from "../../../context/DynamicContext";
import axios from "axios";

const ImageSelect = ({ item }) => {
  const { setImgSelect, token, setNotif, setSpin, callImgs, setCallImgs } =
    Dynamic();
  const deleteImgCurrent = async () => {
    if (!item._id) return setNotif("Erreur: id introuvable");
    if (window.confirm(`'OK' pour supprimer l'image ? `)) {
      try {
        setSpin(true);
        const res = await axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URL}aws/admin/delete/image`,
          withCredentials: true,
          data: {
            token,
            id: item._id,
          },
        });
        // console.log(res);
        if (res.data.message) {
          setNotif(res.data.message);
          setCallImgs(!callImgs);
        }
        setSpin(false);
      } catch (error) {
        console.log(error);
        setSpin(false);
      }
      setImgSelect([]);
    }
  };
  return (
    <StyledImageSelect onClick={(e) => e.stopPropagation()}>
      <div>
        <span>Id mongo : {item._id}</span>
        <span>Id aws : {item.nameimage}</span>
        <span>
          Reactions : {item.reactionsusers && item.reactionsusers.length}
        </span>
        <span>
          Commentaires : {item.commentaires && item.commentaires.length}
        </span>
      </div>
      <img src={item.nameimage} alt={item.id} />
      <MdDelete className="icon-delete-img" onClick={deleteImgCurrent} />
    </StyledImageSelect>
  );
};

export default ImageSelect;

const StyledImageSelect = styled.div`
  background: grey;
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  div > span {
    margin: 10px 0px;
  }
  img {
    width: 50%;
    /* display: block; */
  }
  .icon-delete-img {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;
    font-size: 2em;
    color: ${COLORS.danger};
    background: white;
    border-radius: 50px;
    cursor: pointer;
  }

  //responsive
  //884px = 768px
  @media screen and (max-width: 884px) {
    width: 70%;
    img {
      width: 65%;
    }
  }
  //responsive
  //428px iphone 13 pro max
  @media screen and (max-width: 428px) {
    width: 100%;
    img {
      width: 65%;
    }
  }
`;
