import { styled } from "styled-components";

export const PostBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  row-gap: 30px;
`;

export const PostContainer = styled.div`
  padding: 20px 20px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  justify-content: space-between;
`;

export const PostContents = styled.div`
  min-height: 120px;
`;

export const PostBottom = styled.div`
  height: 30px;
`;

export const Title = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 130%;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 6px;
`;

export const Content = styled.div`
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: gray;
`;
