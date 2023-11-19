import React, { useEffect } from "react";
import styled from "styled-components";
import { Dynamic } from "../context/DynamicContext";

const Notification = () => {
  const { notif, setNotif } = Dynamic();
  useEffect(() => {
    const timerFunction = () => {
      setTimeout(() => {
        setNotif("");
      }, 5000);
    };
    timerFunction();
  }, []);

  return (
    <StyledNotification $css={notif}>
      <h4>{notif}</h4>
    </StyledNotification>
  );
};

export default Notification;
const StyledNotification = styled.div`
  position: fixed;
  z-index: 50;
  bottom: 10px;
  right: 10px;
  /* background: #7e7a7a; */
  background: ${({ $css }) => ($css.includes("Erreur") ? "#404040" : "white")};
  padding: 5px 15px;
  border-radius: 5px;
  h4 {
    /* color: greenyellow; */
    color: ${({ $css }) => ($css.includes("Erreur") ? "#f84d4d" : "green")};
  }
`;
