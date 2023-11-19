import React from "react";
import styled from "styled-components";

const Spin = () => {
  return (
    <StyledSpin>
      <span className="loader"></span>
    </StyledSpin>
  );
};

export default Spin;

const StyledSpin = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  z-index: 80;
  height: 100vh;
  width: 100%;
  background: #7d7c7cba;
  backdrop-filter: blur(10px);
  justify-content: center;
  align-items: center;
  .loader {
    border: 24px solid #fff;
    border-color: #ff3d00 #ff3d00 #fff #fff;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
  }

  .loader:before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translate(-50%, -125%);
    left: 50%;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
