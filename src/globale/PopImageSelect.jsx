import React from "react";
import styled from "styled-components";
import { Dynamic } from "../context/DynamicContext";
import ImageSelect from "../components/admin/ImageSelect/Index";

const PopImageSelect = () => {
  const { imgSelect, setImgSelect } = Dynamic();
  return (
    <StyledPopImageSelect onClick={() => setImgSelect([])}>
      {imgSelect.map((item) => (
        <ImageSelect key={item._id} item={item} />
      ))}
    </StyledPopImageSelect>
  );
};

export default PopImageSelect;

const StyledPopImageSelect = styled.div`
  background: #4c4b4b75;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  position: fixed;
  z-index: 50;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
