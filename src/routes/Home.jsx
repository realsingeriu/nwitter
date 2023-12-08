import React from "react";
import { auth } from "../firebase";

const Home = () => {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <h1>
      <button onClick={logOut}>로그아웃</button>
    </h1>
  );
};

export default Home;
