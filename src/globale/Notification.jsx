import React from "react";
import styled from "styled-components";

const Notification = () => {
  return (
    <StyledNotification>
      <h4>Notre notification</h4>
    </StyledNotification>
  );
};

export default Notification;
const StyledNotification = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: #7e7a7a;
  padding: 5px;
  border-radius: 5px;
  h4 {
    color: greenyellow;
  }
`;
