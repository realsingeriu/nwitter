import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";

const Wrapper = styled.div`
  margin-top: 20px;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState([]);

  useEffect(() => {
    let unsub = null;
    const fetchTweets = async () => {
      // tweets 컬렉션에서 최신트윗순으로 가져오기
      const q = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      unsub = onSnapshot(q, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweets(); //모든 트윗들을 가져와 tweets에 저장
    return () => unsub();
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
