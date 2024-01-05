import axios from "axios";
import React from "react";
import { Dynamic } from "../context/DynamicContext";
import styled from "styled-components";

const PopUserSelect = () => {
  const { setNotif, token, userSelect, setUserSelect } = Dynamic();
  const deleteUsers = async (id, name, email) => {
    if (!id) return setNotif("Erreur bro : On a besoin d'un Id");
    if (
      window.confirm(
        `Bro tu es sur le point de supprimé cet utilisateur ${name}, "Ok" si tu sais ce que tu fais `
      )
    ) {
      try {
        await axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URL}user/delete`,
          withCredentials: true,
          data: {
            token,
            id,
            email,
          },
        }).then((res) => {
          console.log(res);
          //   setCallUsersAgain(!callUsersAgain);
          return setNotif(res.data.message);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <StyledPopUserSelect onClick={() => setUserSelect([])}>
      <div onClick={(e) => e.stopPropagation()}>
        {userSelect.length &&
          userSelect.map((user) => (
            <div key={user._id}>
              <span>Pseudo : {user.pseudo}</span>
              <span>Email : {user.email}</span>
              {user.link && <span>Lien : {user.link}</span>}
              {user.biographie && <span>Lien : {user.biographie}</span>}
            </div>
          ))}
      </div>
    </StyledPopUserSelect>
  );
};

export default PopUserSelect;
const StyledPopUserSelect = styled.div`
  background: #4c4b4b75;
  backdrop-filter: blur(3px);
  position: fixed;
  z-index: 50;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    border-radius: 10px;
    background: pink;
    padding: 10px;
  }
  div > div {
    display: flex;
    flex-direction: column;
  }
  div > div > span {
    margin: 10px;
  }
`;
