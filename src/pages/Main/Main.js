import React, { useEffect, useState } from "react";
import { db, authService } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

import * as S from "./style";

const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();

    console.log(posts);
  }, []);

  return (
    <div style={{ margin: "auto 20%", fontFamily: "GmarketSansTTFMedium" }}>
      <div>
        <h1>글 목록</h1>
        <S.PostBox
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          {posts.map((post) => (
            <Link to={`/post/${post.id}`}>
              <S.PostContainer>
                <S.PostContents>
                  <p style={{ fontSize: "20px" }}>{post.title}</p>
                </S.PostContents>
                <S.PostBottom>{post.author}</S.PostBottom>
              </S.PostContainer>
            </Link>
          ))}
        </S.PostBox>
      </div>
    </div>
  );
};

export default Main;
