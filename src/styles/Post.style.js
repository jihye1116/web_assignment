import { styled } from "styled-components";

export const Container = styled.div`
  margin: auto 20%;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const Author = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

export const Content = styled.div`
  width: 100%;
  /* max-width: 500px; */
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

export const RatingBox = styled.div`
  background-color: aliceblue;
`;
