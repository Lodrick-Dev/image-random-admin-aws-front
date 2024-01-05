import React from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { COLORS } from "../../../utils/Colors/Index";
import { Dynamic } from "../../../context/DynamicContext";

const ImageSelect = ({ item }) => {
  const { setImgSelect, setNotif } = Dynamic();
  const deleteImgCurrent = () => {
    if (item._id) return setNotif("Erreur: id introuvable");
    if (window.confirm(`'OK' pour supprimer l'image ? `)) {
      setImgSelect([]);
    }
  };
  return (
    <StyledImageSelect onClick={(e) => e.stopPropagation()}>
      <div>
        <span>Id mongo : {item._id}</span>
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
`;
