import React, { useRef } from "react";
import styled from "styled-components";
import ButtonForm from "../../globale/ButtonForm";
import { FaDownload } from "react-icons/fa";
import Resizer from "react-image-file-resizer";

const AddImage = ({ imageUploading, setImageUploading, setImgsToPreview }) => {
  const uploadingimgs = useRef();
  const handleAddImage = async (e) => {
    e.preventDefault();
    alert("ZAdd img");
  };
  const uploading = () => {
    uploadingimgs.current.click();
  };
  const chargingImg = (files) => {
    setImageUploading(files);
    console.log(files);
    //👇converti en array pour la boucle
    const lesFilesInArray = Array.from(files);
    console.log(lesFilesInArray);

    for (let i = 0; i < lesFilesInArray.length; i++) {
      console.log(lesFilesInArray[i]);
      Resizer.imageFileResizer(
        lesFilesInArray[i],
        1080,
        1080,
        "PNG",
        100,
        0,
        (url) => {
          setImgsToPreview((prev) => [...prev, url]);
        },
        "base64"
      );
    }
  };

  const cancelCharging = () => {
    setImageUploading([]);
    setImgsToPreview([]);
  };
  return (
    <StyledAddImage onSubmit={(e) => handleAddImage(e)}>
      <h2>Téléchargez vos images pour votre API</h2>
      <div className="special-div-to-box-add" onClick={() => uploading()}>
        <FaDownload className="to-download" />
        <input
          type="file"
          ref={uploadingimgs}
          multiple
          className="input-file"
          onChange={(e) => chargingImg(e.target.files)}
        />
      </div>
      <ButtonForm text={"Envoyer"} />
      {imageUploading.length > 0 ? (
        <span onClick={() => cancelCharging()}>Annuler</span>
      ) : undefined}
    </StyledAddImage>
  );
};

export default AddImage;

const StyledAddImage = styled.form`
  background: orange;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  .special-div-to-box-add {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .to-download {
    margin: 20px 5px;
    font-size: 2em;
    cursor: pointer;
  }
  .input-file {
    display: none;
  }
  span {
    cursor: pointer;
    color: red;
  }
`;
