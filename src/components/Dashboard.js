import React, { useState } from "react";
import styled from "styled-components";
import PreviewImages from "../globale/PreviewImages";
import AddImage from "./admin/forms/AddImage";
import ImagesPublic from "../globale/ImagesPublic";
import { FaHome } from "react-icons/fa";
import ListImages from "./admin/ListImages";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import Listusers from "./admin/Listusers";
import { Dynamic } from "../context/DynamicContext";
import EmailVerified from "../globale/EmailVerified";
import Bouton from "../globale/Bouton";

const Dashboard = () => {
  const [imageUploading, setImageUploading] = useState([]);
  const [imgsToPreview, setImgsToPreview] = useState([]);
  const [componentImagesList, setComponentImageList] = useState(false);
  const { user } = Dynamic();

  const deconnexion = () => {
    if (window.confirm("Cette action vous déconnecte")) {
      try {
        signOut(auth);
      } catch (error) {
        console.log(error);
      }
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
        imgsToPreview={imgsToPreview}
      />
      <ImagesPublic />
      <Bouton
        text={componentImagesList ? "Voir les images" : "Voir les utilisateur"}
        actionClick={() => setComponentImageList(!componentImagesList)}
      />
      {componentImagesList ? <Listusers /> : <ListImages />}
      {!user.emailVerified && <EmailVerified />}
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
  /* height: 100%; */
  padding: 10px;
  h1 {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    background: #404040;
    color: white;
    padding: 5px;
    font-size: 1.1em;
  }
  .go-home-deconnect {
    position: fixed;
    bottom: 5px;
    right: 5px;
    font-size: 2.3em;
    color: yellow;
    cursor: pointer;
    z-index: 20;
  }
`;
