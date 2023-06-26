import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";

import * as S from "../styles/Main.style.js";

const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
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
  }, []);

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div style={{ margin: "auto 20%", fontFamily: "GmarketSansTTFMedium" }}>
      <div>
        <h1>글 목록</h1>
        <S.PostBox>
          {posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <S.PostContainer>
                <S.PostContents>
                  <S.Title>{post.title}</S.Title>
                  <S.Content>{stripHtmlTags(post.content)}</S.Content>
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
