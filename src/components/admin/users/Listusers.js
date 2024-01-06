import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dynamic } from "../../../context/DynamicContext";
import styled from "styled-components";
import User from "./User";

const Listusers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [callUsersAgain, setCallUsersAgain] = useState(false);
  const { token, setNotif, notif } = Dynamic();

  useEffect(() => {
    const getAllusers = async () => {
      try {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}user/all/?token=${token}`,
          withCredentials: true,
        }).then((res) => {
          // console.log(res);
          setListUsers(res.data.users);
        });
      } catch (error) {
        console.log("ici " + error);
      }
    };
    getAllusers();
  }, [callUsersAgain]);

  return (
    <StyledListusers>
      <h3>Membres total inscrit : {listUsers && listUsers.length}</h3>
      <ul>
        {listUsers &&
          listUsers.map((user) => (
            <User
              key={user.uid}
              user={user}
              callUsersAgain={callUsersAgain}
              setCallUsersAgain={setCallUsersAgain}
            />
          ))}
      </ul>
    </StyledListusers>
  );
};

export default Listusers;

const StyledListusers = styled.div`
  height: 100%;
  /* background: pink; */
  width: 70%;
  border-bottom: solid 1px pink;
  &::-webkit-scrollbar {
    width: 0px;
  }

  h3 {
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    /* background: pink; */
    height: 80%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    background: grey;
    padding: 5px;
    border-radius: 10px;
  }
  ul::-webkit-scrollbar {
    width: 0px;
  }

  //responsive
  //428px iphone 13 pro max
  @media screen and (max-width: 428px) {
    width: 100%;
    ul {
      justify-content: center;
      align-items: center;
    }
  }

  //responsive
  //884px = 768px
  @media screen and (max-width: 884px) {
    width: 100%;
    ul {
      justify-content: center;
      align-items: center;
    }
  }
`;
