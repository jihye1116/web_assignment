import React, { useState } from "react";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        throw new Error("로그인되어 있지 않습니다.");
      }

      const postRef = doc(collection(db, "posts"));
      const postData = {
        title,
        content,
        author: currentUser.displayName,
      };

      await setDoc(postRef, postData);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("글 등록 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button type="submit">글 등록</button>
    </form>
  );
}

export default PostForm;
