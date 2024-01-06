import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dynamic } from "../../../context/DynamicContext";
import styled from "styled-components";
import { COLORS } from "../../../utils/Colors/Index";
import { MdDelete } from "react-icons/md";

const User = ({ user, callUsersAgain, setCallUsersAgain }) => {
  const [lastConnect, setLastConnect] = useState("");
  const { token, setNotif, setUserSelect, setSpin } = Dynamic();

  const toDateLastConnect = () => {
    // Analyser la chaîne de date
    const dateObject = new Date(user.metadata.lastSignInTime);

    // Fonction pour ajouter un zéro devant les chiffres < 10
    const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

    // Récupérer les composants de la date
    const day = addLeadingZero(dateObject.getDate());
    const month = addLeadingZero(dateObject.getMonth() + 1); // Les mois commencent à 0
    const year = dateObject.getFullYear();
    const hours = addLeadingZero(dateObject.getHours());
    const minutes = addLeadingZero(dateObject.getMinutes());
    setLastConnect(` ${day}/${month}/${year} à ${hours}h${minutes}`);
  };

  const selectUser = async (email, id) => {
    if (!email) return setNotif("Erreur: Un email est obligatoire");
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}user/email/mongo`,
        withCredentials: true,
        headers: {
          Authorization: `${token}`,
        },
        params: {
          email: email,
        },
      });
      // console.log(res.data);
      if (res.data.message) return setNotif(res.data.message);
      let data = res.data;
      data.idfirebase = id;
      // console.log(data);
      setUserSelect(data);
    } catch (error) {
      console.log(error);
      setNotif(
        "Erreur : lors de la tentative de récupération de l'utilisateur"
      );
    }
  };

  const deleteUser = async (e, id, email) => {
    e.stopPropagation();
    // console.log(id);
    if (!id) return setNotif("Erreur, id introuvable");

    if (window.confirm("Voulez-vous vraiment supprimer ce membre ? ")) {
      setSpin(true);
      try {
        const res = await axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URL}user/delete`,
          withCredentials: true,
          data: {
            token,
            id,
            email,
          },
        });
        // console.log(res);
        if (res.data.message) setSpin(false);
        setCallUsersAgain(!callUsersAgain);
        return setNotif(res.data.message);
      } catch (error) {
        console.log(error);
        setNotif("Erreur, lors de la requête");
        setSpin(false);
      }
    }
  };
  useEffect(() => {
    toDateLastConnect();
  }, []);

  return (
    <StyledUser
      onClick={() => selectUser(user.email, user.uid)}
      $css={user.emailVerified}
    >
      <span>Pseudo : {user.displayName}</span>
      <span className="email-checked">
        Email vérifié : {user.emailVerified ? "Oui" : "Non"}
      </span>
      <span> Dernière connexion : {lastConnect}</span>
      <MdDelete
        className="icon-delete-user"
        onClick={(e) => deleteUser(e, user.uid, user.email)}
      />
    </StyledUser>
  );
};

export default User;

const StyledUser = styled.li`
  /* background: greenyellow; */
  position: relative;
  cursor: pointer;
  width: 20%;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  border: solid 2px orange;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    text-align: center;
    margin-top: 10px;
  }
  .email-checked {
    background: ${({ $css }) => ($css ? COLORS.safe : "orange")};
    border-radius: 5px;
    padding: 10px;
  }
  .icon-delete-user {
    position: absolute;
    top: 5px;
    left: 5px;
    color: white;
    background: ${COLORS.danger};
    padding: 3px;
    font-size: 1.5em;
    cursor: pointer;
    border-radius: 50px;
  }

  //responsive
  //428px iphone 13 pro max
  @media screen and (max-width: 428px) {
    width: 40%;
    span {
      font-size: 0.8em;
    }
    .icon-delete-user {
      font-size: 1.2em;
    }
  }

  //responsive
  //884px = 768px
  @media screen and (max-width: 884px) {
    width: 40%;
    span {
      font-size: 0.8em;
    }
    .icon-delete-user {
      font-size: 1.2em;
    }
  }
`;
