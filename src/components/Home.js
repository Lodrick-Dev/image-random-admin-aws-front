import React, { useState } from "react";
import styled from "styled-components";
import Bouton from "../globale/Bouton";
import Connexion from "./forms/Connexion";
import Register from "./forms/Register";

const Home = () => {
  const [chooseForm, setChooseForm] = useState(true);

  return (
    <StyleHome>
      <div>
        <div className="box-choose-u-form">
          <Bouton
            actionClick={() => setChooseForm(true)}
            classCss={chooseForm ? "select" : undefined}
            text={"Connexion"}
          />{" "}
          <Bouton
            actionClick={() => setChooseForm(false)}
            classCss={chooseForm ? undefined : "select"}
            text={"Register"}
          />
        </div>
        {chooseForm ? (
          <Connexion />
        ) : (
          <Register chooseForm={chooseForm} setChooseForm={setChooseForm} />
        )}
      </div>
    </StyleHome>
  );
};

export default Home;
const StyleHome = styled.div`
  /* background: white; */
  /* width: 50%; */
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .select {
    background: blue !important;
    transition: 0.3s;
    transform: scale(1.1);
  }
  div {
    width: 50%;
    /* background: green; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .box-choose-u-form {
    /* background: orange; */
    display: flex;
    flex-direction: row;
  }
`;
