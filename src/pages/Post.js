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

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

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

  return (
    <S.Container>
      <S.Title>{post.title}</S.Title>
      <S.Author>{post.author}</S.Author>

      <S.Content dangerouslySetInnerHTML={{ __html: post.content }}></S.Content>

      <S.RatingBox>
        <h3>{averageRating}</h3>
        <StarRating rating={rating} onStarClick={handleStarClick} />
      </S.RatingBox>

      <h3>댓글</h3>
      <S.Comments>
        {comments.map((comment, index) => (
          <S.Comment key={index}>
            <S.CommentAuthor>{comment.author}</S.CommentAuthor>
            <S.CommentContent>{comment.content}</S.CommentContent>
          </S.Comment>
        ))}
      </S.Comments>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="댓글을 작성하세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button type="submit">댓글 등록</button>
      </form>
    </S.Container>
  );
};

const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StarRow = styled.div`
  display: flex;
  align-items: center;
`;

const StarDiv = styled.div`
  position: relative;
  cursor: pointer;
`;

const Left = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
`;

const Right = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
`;

function StarRating({ rating, onStarClick }) {
  const [hoveredRating, setHoveredRating] = useState(null);
  const handleLeftHalfEnter = (idx) => setHoveredRating(idx + 0.5);
  const handleRightHalfEnter = (idx) => setHoveredRating(idx + 1);

  return (
    <StarContainer>
      <StarRow>
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <StarDiv key={idx} onClick={() => onStarClick(idx + 1)}>
              {hoveredRating !== null ? (
                <>
                  {hoveredRating - Math.floor(hoveredRating) === 0.5 &&
                  Math.floor(hoveredRating) === idx ? (
                    <FaStarHalfAlt key={idx} size={32} color="gold" />
                  ) : idx + 1 > hoveredRating ? (
                    <FaStar key={idx} size={32} color="lightGray" />
                  ) : (
                    <FaStar key={idx} size={32} color="gold" />
                  )}
                </>
              ) : (
                <>
                  {rating - Math.floor(rating) === 0.5 &&
                  Math.floor(rating) === idx ? (
                    <FaStarHalfAlt key={idx} size={32} color="gold" />
                  ) : idx + 1 > rating ? (
                    <FaStar key={idx} size={32} color="lightGray" />
                  ) : (
                    <FaStar key={idx} size={32} color="gold" />
                  )}
                </>
              )}
              <Left
                key={idx + "left"}
                onMouseEnter={() => handleLeftHalfEnter(idx)}
              />
              <Right
                key={idx + "right"}
                onMouseEnter={() => handleRightHalfEnter(idx)}
              />
            </StarDiv>
          ))}
      </StarRow>
    </StarContainer>
  );
}

export default PostDetail;
