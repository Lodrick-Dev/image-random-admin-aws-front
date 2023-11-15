import React, { useState } from "react";
import styled from "styled-components";
import PreviewImages from "../globale/PreviewImages";
import AddImage from "./forms/AddImage";
import ImagesPublic from "../globale/ImagesPublic";
import { FaHome } from "react-icons/fa";
import { Dynamic } from "../context/DynamicContext";

const Dashboard = () => {
  const [imageUploading, setImageUploading] = useState([]);
  const [imgsToPreview, setImgsToPreview] = useState([]);
  const { setIdUser } = Dynamic();

  const deconnexion = () => {
    if (window.confirm("Cette action vous déconnecte")) {
      setIdUser(null);
    }
  };
  return (
    <StyledDashboard>
      <FaHome className="go-home-deconnect" onClick={deconnexion} />
      <h1>Dashboard</h1>
      {imageUploading.length > 0 ? (
        <PreviewImages imgsToPreview={imgsToPreview} />
      ) : undefined}
      <AddImage
        imageUploading={imageUploading}
        setImageUploading={setImageUploading}
        setImgsToPreview={setImgsToPreview}
      />
      <ImagesPublic />
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  background: #404040;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 150vh;
  h1 {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .go-home-deconnect {
    position: fixed;
    top: 20px;
    right: 20px;
    font-size: 2.3em;
    color: yellow;
    cursor: pointer;
  }
`;
