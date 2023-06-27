import { styled } from "styled-components";

export const Container = styled.div`
  margin: auto 20%;
`;

export const TopBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 10px;
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: 600;
`;

export const Title = styled.span``;

export const Author = styled.p`
  margin-left: 5px;
  font-size: 16px;
  font-weight: 600;
`;

export const Content = styled.div`
  width: 100%;
  margin: 10px auto;
  padding: 16px;
  border: 1px solid gray;
  border-radius: 8px;
`;

export const Comments = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Comment = styled.li`
  margin-bottom: 16px;
`;

export const CommentAuthor = styled.div`
  font-weight: bold;
`;

export const CommentContent = styled.div`
  font-size: 16px;
`;

export const StarRatingBox = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CommentBox = styled.form`
  width: 100%;
  margin: 10px auto;

  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const CommentArea = styled.textarea`
  width: 100%;
  overflow-y: scroll;
  height: 60px;

  font-size: 18px;
  border: none;
  outline: none;
`;

export const CommentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 10px;
`;

export const CommentButton = styled.button`
  align-items: center;

  background-color: black;
  color: white;
  padding: 5px 5px;
  height: 40px;
  border: none;
  border-radius: 5px;
`;

// 별점 표시 박스
export const Scope = styled.div`
  border: 1px solid black;
`;
