// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";

// const Post = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       const docRef = doc(db, "posts", id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setPost({ id: docSnap.id, ...docSnap.data() });
//       } else {
//         console.log("No such document!");
//       }
//     };

//     fetchPost();
//   }, [id]);

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//     </div>
//   );
// };

// export default Post;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "posts", id);
        const docSnapshot = await getDoc(postRef);
        if (docSnapshot.exists()) {
          setPost({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          console.log("해당하는 글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>글 작성자: {post.author}</p>
      <p>별점: {post.rating}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
