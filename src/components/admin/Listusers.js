import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dynamic } from "../../context/DynamicContext";
import styled from "styled-components";

const Listusers = () => {
  const [listUsers, setListUsers] = useState([]);
  const { token, setNotif, notif } = Dynamic();

  const deleteUsers = async (id, name) => {
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
          },
        }).then((res) => {
          console.log(res);
          setNotif(res.data.message);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getAllusers = async () => {
      try {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}user/all/?token=${token}`,
          withCredentials: true,
        }).then((res) => {
          //   console.log(res);
          setListUsers(res.data.users);
        });
      } catch (error) {
        console.log("ici " + error);
      }
    };
    getAllusers();
  }, []);

  return (
    <StyledListusers>
      <h3>Listes des utilisateurs inscrit</h3>
      <ul>
        {listUsers &&
          listUsers.map((user) => (
            <li
              key={user.uid}
              onClick={() => deleteUsers(user.uid, user.displayName)}
            >
              {user.email}
            </li>
          ))}
      </ul>
    </StyledListusers>
  );
};

export default Listusers;

const StyledListusers = styled.div`
  height: 20vh;
  border-bottom: solid 1px pink;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
  ul > li {
    cursor: pointer;
    margin: 10px;
    padding: 5px;
    border-radius: 5px;
    background: white;
    border-bottom: solid 2px orange;
  }
`;
