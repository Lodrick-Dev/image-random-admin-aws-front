import React from "react";
import styled from "styled-components";
import { Dynamic } from "../context/DynamicContext";
import ImageSelect from "../components/admin/ImageSelect/Index";

const Pop = () => {
  const { imgSelect, setImgSelect } = Dynamic();
  return (
    <StyledPop onClick={() => setImgSelect([])}>
      {imgSelect.map((item) => (
        <ImageSelect key={item._id} item={item} />
      ))}
    </StyledPop>
  );
};

export default Pop;

const StyledPop = styled.div`
  background: #4c4b4b75;
  backdrop-filter: blur(3px);
  position: fixed;
  z-index: 50;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
