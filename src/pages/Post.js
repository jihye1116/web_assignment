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
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import styled from "styled-components";
import * as S from "../styles/Post.style";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import StarRating from "../components/Post/StarRating";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  const [ratingCount, setRatingCount] = useState();

  useEffect(() => {
    const postId = id;
    const postRef = doc(db, "posts", postId);

    const unsubscribePost = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        setPost({ id: doc.id, ...doc.data() });
        setRating(doc.data().rating);
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

  useEffect(() => {
    if (post && post.ratings) {
      const ratings = Object.values(post.ratings);
      const sum = ratings.reduce((acc, curr) => acc + curr, 0);
      const average = sum / ratings.length;
      setAverageRating(average);
      setRatingCount(ratings.length);
    }
  }, [post]);

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

  const handleStarClick = async (rating) => {
    try {
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        throw new Error("로그인되어 있지 않습니다.");
      }

      if (post && post.ratings && post.ratings[currentUser.uid]) {
        throw new Error("이미 별점을 등록했습니다.");
      }

      await updateDoc(doc(db, "posts", id), {
        ratings: {
          ...post.ratings,
          [currentUser.uid]: rating,
        },
      });

      setRating(rating);
    } catch (error) {
      console.error("별점 등록 중 오류가 발생했습니다.", error);
    }
  };

  if (!post) {
    return <div>글을 불러오는 중입니다...</div>;
  }

  const roundedRatings = Array(Math.round(averageRating)).fill();

  return (
    <S.Container>
      <S.TopBox>
        <S.Title>{post.title}</S.Title>
        <S.Author>{post.author}</S.Author>
      </S.TopBox>

      <S.Content dangerouslySetInnerHTML={{ __html: post.content }}></S.Content>

      <S.Scope>
        {/* 아.. 진짜 싫다 ㅎ */}
        <FaStar size={32} />
        <span>{averageRating}</span>
        <span>({ratingCount})</span>
      </S.Scope>

      <S.StarRatingBox>
        <div
          style={{ fontSize: "20px", fontWeight: "600", marginRight: "5px" }}
        >
          어떠셨나요?
        </div>
        <StarRating rating={rating} onStarClick={handleStarClick} />
      </S.StarRatingBox>

      <S.CommentBox onSubmit={handleCommentSubmit}>
        <S.CommentArea
          placeholder="댓글을 작성하세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></S.CommentArea>

        <S.CommentBottom>
          <S.CommentButton type="submit">댓글 등록</S.CommentButton>
        </S.CommentBottom>
      </S.CommentBox>

      <h3>댓글</h3>
      <S.Comments>
        {comments.map((comment, index) => (
          <S.Comment key={index}>
            <S.CommentAuthor>{comment.author}</S.CommentAuthor>
            <S.CommentContent>{comment.content}</S.CommentContent>
          </S.Comment>
        ))}
      </S.Comments>
    </S.Container>
  );
};

export default PostDetail;
