import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

function PostDetail({ match }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const postId = id;
    const postRef = doc(db, "posts", postId);

    const unsubscribePost = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        setPost({ id: doc.id, ...doc.data() });
      } else {
        setPost(null);
      }
    });

    const commentsRef = collection(db, "comments");
    const postCommentsQuery = query(commentsRef, where("postId", "==", postId));

    const unsubscribeComments = onSnapshot(postCommentsQuery, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => doc.data());
      setComments(commentsData);
    });

    return () => {
      unsubscribePost();
      unsubscribeComments();
    };
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        throw new Error("로그인되어 있지 않습니다.");
      }

      const commentData = {
        postId: id,
        content: commentText,
        author: currentUser.displayName,
      };

      await addDoc(collection(db, "comments"), commentData);

      setCommentText("");
    } catch (error) {
      console.error("댓글 등록 중 오류가 발생했습니다.", error);
    }
  };

  if (!post) {
    return <div>글을 불러오는 중입니다...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>별점: {post.rating}</p>
      <p>{post.content}</p>

      <h3>댓글</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <div>{comment.author}</div>
            {comment.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="댓글을 작성하세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button type="submit">댓글 등록</button>
      </form>
    </div>
  );
}

export default PostDetail;
