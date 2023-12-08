import React from "react";
import { auth } from "../firebase";
import PostTweetForm from "../components/PostTweetForm";

const Home = () => {
  const logOut = () => {
    auth.signOut();
  };
  return <PostTweetForm />;
};

export default Home;
